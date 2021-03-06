<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-primary">
            <h3 class="modal-card-title has-text-white is-size-3">
                Edit Multiple Competencies
            </h3>
            <button
                class="delete"
                aria-label="close"
                @click="$store.commit('app/closeModal')" />
        </header>
        <section
            v-if="isProcessing"
            class="modal-card-body">
            <div class="section has-text-centered">
                <span class="icon is-large">
                    <i class="fa fa-spinner fa-2x fa-pulse" />
                </span>
            </div>
        </section>
        <section
            class="modal-card-body"
            v-else-if="!isSearching">
            <div
                v-for="(item,idx) in addedPropertiesAndValues"
                :key="item">
                <AddProperty
                    :profile="profile"
                    :editingMultipleCompetencies="true"
                    @propertyStringUpdated="propertyStringUpdated"
                    :idx="idx"
                    @isSearching="isSearching=true"
                    :addedPropertiesAndValuesFromSearching="item" />
                <span v-if="item['error']">
                    {{ item['error'] }}
                </span>
            </div>
            <!-- after adding one property, show button to add another -->
            <div class="buttons is-right">
                <div class="button is-small is-outlined is-primary">
                    <span class="icon">
                        <i class="fa fa-plus" />
                    </span>
                    <span @click="addAnotherProperty">Add another property</span>
                </div>
            </div>
            <p
                class="help is-danger"
                v-if="errorMessage !== []">
                {{ this.errorMessage[0] }}
            </p>
        </section>
        <section
            v-if="isSearching"
            class="modal-card-body">
            <Search view="multi-edit" />
        </section>
        <footer class="modal-card-foot">
            <div class="buttons is-spaced">
                <button
                    @click="onCancel"
                    class="button is-outlined is-dark">
                    <span class="icon">
                        <i class="fa fa-times" />
                    </span>
                    <span>cancel</span>
                </button>
                <button
                    v-if="!isSearching"
                    class="button is-outlined is-success"
                    @click="applyToMultiple"
                    :disabled="disableApplyButton">
                    <span class="icon">
                        <i class="fa fa-save" />
                    </span>
                    <span>Apply to multiple</span>
                </button>
            </div>
            <template v-if="isSearching">
                <div
                    @click="addSelected"
                    title="Add Competency as Property"
                    class="button is-outlined is-primary is-small">
                    <span class="is-small export icon">
                        <i class="fa fa-check" />
                    </span>
                    <span>Add Selected</span>
                </div>
            </template>
        </footer>
    </div>
</template>
<script>
import AddProperty from '@/lode/components/lode/AddProperty.vue';
import Search from './Search.vue';
export default {
    name: 'MultiEdit',
    components: {
        AddProperty,
        Search
    },
    props: {
        content: Object
    },
    data() {
        return {
            showErrorMessages: false,
            isProcessing: false,
            addedPropertiesAndValues: [{"property": "", "value": "", "range": []}],
            repo: window.repo,
            saveCount: 0,
            errorMessage: [],
            checkedOptions: [],
            changedItemsForUndo: [],
            isSearching: false
        };
    },
    computed: {
        profile: function() {
            return this.content.profile;
        },
        selectedCompetencies: function() {
            return this.content.selectedCompetencies;
        },
        disableApplyButton: function() {
            for (var i = 0; i < this.addedPropertiesAndValues.length; i++) {
                if (this.addedPropertiesAndValues[i].error) {
                    return true;
                }
            }
            return false;
        },
        removeAddingValueAtIndex: function() {
            return this.$store.getters['lode/removeAddingValueAtIndex'];
        },
        addingChecked: function() {
            return this.$store.getters['lode/addingChecked'];
        }
    },
    methods: {
        onCancel: function() {
            if (this.isSearching) {
                this.isSearching = false;
            } else {
                this.$store.commit('app/closeModal');
            }
        },
        addErrorMessage: function(msg) {
            this.errorMessage.push(msg);
        },
        propertyStringUpdated: function(property, value, range, index) {
            this.addedPropertiesAndValues[index].property = property;
            this.addedPropertiesAndValues[index].value = value;
            this.addedPropertiesAndValues[index].range = range;
            this.$set(this.addedPropertiesAndValues[index], "error", null);
            // Validate input
            if (range.length === 1 && (range[0] === "http://schema.org/URL" ||
            range[0].toLowerCase().indexOf("concept") !== -1 || range[0].toLowerCase().indexOf("competency") !== -1 ||
            range[0].toLowerCase().indexOf("level") !== -1)) {
                if (value.indexOf("http") === -1) {
                    this.addedPropertiesAndValues[index].error = "This property must be a URL. For example: https://credentialengineregistry.org/, https://eduworks.com, https://case.georgiastandards.org/.";
                    return;
                }
            }
            if (range[0].toLowerCase().indexOf("level") !== -1) {
                var level = EcLevel.getBlocking(value);
                if (!level) {
                    this.addedPropertiesAndValues[index].error = "This URL must be a Level that is already in the system.";
                    return;
                }
            }
            if (range.length === 1 && range[0].toLowerCase().indexOf("langstring") !== -1) {
                if (value["@language"] == null || value["@language"] === undefined || value["@language"].trim().length === 0) {
                    this.addedPropertiesAndValues[index].error = "This property must have a language.";
                }
            }
        },
        validateOnePerLanguage: function(expandedCompetency, property, competency, value) {
            if (!expandedCompetency[property]) {
                return true;
            }
            var languagesUsed = [];
            for (var k = 0; k < expandedCompetency[property].length; k++) {
                if (languagesUsed.includes(expandedCompetency[property][k]["@language"].toLowerCase())) {
                    this.addErrorMessage(property + " can only have one entry per language. Competency " + competency.getName() + " was not saved.");
                    return false;
                }
                languagesUsed.push(expandedCompetency[property][k]["@language"].toLowerCase());
            }
            // Check new value being added
            if (languagesUsed.includes(value["@language"].toLowerCase())) {
                this.addErrorMessage(property + " can only have one entry per language. Competency " + competency.getName() + " was not saved.");
                return false;
            }
            return true;
        },
        validateMax: function(expandedCompetency, property, competencyId, competency) {
            if (this.profile[property]["valuesIndexed"]) {
                var f = this.profile[property]["valuesIndexed"];
                f = f();
                if (f && f[EcRemoteLinkedData.trimVersionFromUrl(competencyId)]) {
                    this.addErrorMessage(property + " can only have one value. Competency " + competency.getName() + " was not saved.");
                    return false;
                }
            } else {
                if (expandedCompetency[property] != null && expandedCompetency[property].length > 0) {
                    this.addErrorMessage(property + " can only have one value. Competency " + competency.getName() + " was not saved.");
                    return false;
                }
            }
            return true;
        },
        applyToMultiple: function() {
            var me = this;
            this.errorMessage = [];
            if (me.addedPropertiesAndValues.length === 0 || (me.addedPropertiesAndValues[0].property === "")) {
                return me.addErrorMessage("Saving to multiple required a property and value.");
            }
            this.isProcessing = true;
            for (var i = 0; i < this.selectedCompetencies.length; i++) {
                var competencyId = this.selectedCompetencies[i];
                EcRepository.get(competencyId, function(competency) {
                    me.expand(competency, function(expandedCompetency) {
                        var initialValues = [];
                        var changedValues = [];
                        var properties = [];
                        for (var j = 0; j < me.addedPropertiesAndValues.length; j++) {
                            var property = me.addedPropertiesAndValues[j].property.value;
                            var value = me.addedPropertiesAndValues[j].value;
                            var range = me.addedPropertiesAndValues[j].range;
                            appLog("adding " + property + " " + JSON.stringify(expandedCompetency));

                            properties.push(property);
                            if (expandedCompetency[property]) {
                                initialValues.push(JSON.parse(JSON.stringify(expandedCompetency[property])));
                            } else {
                                initialValues.push([]);
                            }

                            if (range.length === 1 && range[0].toLowerCase().indexOf("langstring") !== -1) {
                                if (me.profile && me.profile[property] && (me.profile[property]["onePerLanguage"] === 'true' || me.profile[property]["onePerLanguage"] === true)) {
                                    var okayToSave = me.validateOnePerLanguage(expandedCompetency, property, competency, value);
                                    if (!okayToSave) {
                                        continue;
                                    }
                                }
                            }

                            // If one value is allowed for a property and it already exists, the user cannot add another
                            if (me.profile[property]["max"] === 1) {
                                var okayToSave = me.validateMax(expandedCompetency, property, competencyId, competency);
                                if (!okayToSave) {
                                    continue;
                                }
                            }

                            if (me.profile && me.profile[property]["add"]) {
                                var f = me.profile[property]["add"];
                                if (f !== "checkedOptions") {
                                    var shortId = EcRemoteLinkedData.trimVersionFromUrl(expandedCompetency["@id"]);
                                    f(shortId, [value]);
                                }
                            } else {
                                if (!value["@value"]) {
                                    value = {"@value": value};
                                }
                                expandedCompetency = me.add(property, value, expandedCompetency);
                            }
                            if (me.profile && me.profile[property]["save"]) {
                                var f = me.profile[property]["save"];
                                if (me.checkedOptions) {
                                    f(expandedCompetency, me.checkedOptions, me.profile[property]["options"]);
                                } else {
                                    f();
                                }
                            }
                            changedValues.push(expandedCompetency[property]);
                        }
                        if (me.errorMessage && me.errorMessage.length > 0) {
                            return;
                        }
                        me.changedItemsForUndo.push({operation: "update", id: EcRemoteLinkedData.trimVersionFromUrl(expandedCompetency["@id"]), fieldChanged: properties, initialValue: initialValues, changedValue: changedValues, expandedProperty: true});
                        me.save(expandedCompetency);
                        me.saveCount++;
                    });
                }, function() {});
            }
        },
        removeValueAtIndex: function(index) {
            if (this.addedPropertiesAndValues.length > 1) {
                this.addedPropertiesAndValues.splice(index, 1);
            } else {
                this.addedPropertiesAndValues = [{"property": "", "value": "", "range": []}];
            }
        },
        addAnotherProperty: function() {
            this.addedPropertiesAndValues.push({"property": "", "value": "", "range": []});
        },
        expand: function(o, after) {
            var toExpand = JSON.parse(o.toJson());
            if (toExpand["@context"] != null && toExpand["@context"].startsWith("http://")) {
                toExpand["@context"] = toExpand["@context"].replace("http://", "https://");
            }
            if (toExpand["@context"] != null && toExpand["@context"].indexOf("skos") !== -1) {
                toExpand["@context"] = "https://schema.cassproject.org/0.4/skos/";
            }
            jsonld.expand(toExpand, function(err, expanded) {
                if (err == null) {
                    after(expanded[0]);
                } else {
                    after(null);
                }
            });
        },
        add: function(property, value, expandedCompetency) {
            if (expandedCompetency[property] === undefined || expandedCompetency[property] == null) {
                expandedCompetency[property] = [];
            }
            if (!EcArray.isArray(expandedCompetency[property])) {
                expandedCompetency[property] = [expandedCompetency[property]];
            }
            expandedCompetency[property].push(value);
            return expandedCompetency;
        },
        save: function(expandedCompetency) {
            var me = this;
            var context = "https://schema.cassproject.org/0.4";
            if (this.$store.getters['editor/queryParams'].concepts === "true") {
                context += "/skos";
            }
            jsonld.compact(expandedCompetency, this.$store.state.lode.rawSchemata[context], function(err, compacted) {
                if (err != null) {
                    appError(err);
                }
                if (compacted) {
                    var rld = new EcRemoteLinkedData();
                    rld.copyFrom(compacted);
                    rld.context = context;
                    delete rld["@context"];
                    rld = me.turnFieldsBackIntoArrays(rld);
                    rld["schema:dateModified"] = new Date().toISOString();
                    if (me.$store.state.editor && me.$store.state.editor.private === true && EcEncryptedValue.encryptOnSaveMap[rld.id] !== true) {
                        rld = EcEncryptedValue.toEncryptedValue(rld);
                    }
                    me.repo.saveTo(rld, appLog, appError);
                }
            });
        },
        // Compact operation removes arrays when length is 1, but some fields need to be arrays in the data that's saved
        turnFieldsBackIntoArrays: function(rld) {
            var fields = [
                "owner", "reader", "signature", "competency", "level", "relation", "skos:hasTopConcept", "skos:narrower", "skos:broader", "skos:broadMatch", "skos:closeMatch",
                "skos:exactMatch", "skos:narrowMatch", "skos:related"
            ];
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (rld[field] && !EcArray.isArray(rld[field])) {
                    rld[field] = [rld[field]];
                }
            }
            return rld;
        },
        addSelected: function() {
            var ids = this.$store.getters['editor/selectedCompetenciesAsProperties'];
            for (var i = 0; i < ids.length; i++) {
                if (this.addedPropertiesAndValues[this.addedPropertiesAndValues.length - 1].property.length !== 0) {
                    this.addAnotherProperty();
                }
                var property = this.$store.getters['editor/selectCompetencyRelation'];
                this.addedPropertiesAndValues[this.addedPropertiesAndValues.length - 1].value = ids[i];
                this.addedPropertiesAndValues[this.addedPropertiesAndValues.length - 1].property = {value: property, label: this.profile[property]["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"]};
                this.addedPropertiesAndValues[this.addedPropertiesAndValues.length - 1].range = this.$store.getters['lode/addingRange'];
            }
            this.isSearching = false;
        }
    },
    watch: {
        saveCount: function() {
            if (this.saveCount === this.selectedCompetencies.length) {
                // Done saving, close modal
                this.isProcessing = false;
                this.$store.commit('editor/addEditsToUndo', this.changedItemsForUndo);
                this.$store.commit('app/closeModal');
            }
        },
        removeAddingValueAtIndex: function() {
            if (this.removeAddingValueAtIndex) {
                this.removeValueAtIndex(this.removeAddingValueAtIndex);
                this.$store.commit('lode/removeAddingValueAtIndex', null);
            }
        },
        addingChecked: function() {
            if (this.addingChecked && this.addingChecked.length > 0) {
                this.checkedOptions = this.addingChecked;
            }
        }
    }
};
</script>
<style>
</style>