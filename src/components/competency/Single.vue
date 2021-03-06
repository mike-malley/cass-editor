<template>
    <div class="single modal-card">
        <header class="modal-card-head has-background-primary">
            <p class="modal-card-title has-text-white is-size-2">
                <template v-if="dynamicModalContent.parentName && dynamicModalContent.parentName['@value']">
                    <span>{{ dynamicModalContent.parentName['@value'] }}</span>
                    <br><br>
                </template>
                <b>{{ dynamicModalContent.type }}</b>
            </p>
            <button
                @click="$store.commit('app/closeModal')"
                class="delete"
                aria-label="close" />
        </header>
        <section class="modal-card-body">
            <Component
                :is="dynamicThing"
                :uri="dynamicModalContent.uri"
                :expandInModal="true"
                @doneEditingNodeEvent="doneEditing"
                :profile="profile" />
            <div class="section">
                <h4 class="header">
                    This item is listed in <b>{{ numberOfParentFrameworks }}</b> {{ dynamicModalContent.objectType === "Concept" ? "concept scheme" : "framework" }}<span v-if="numberOfParentFrameworks > 1">s</span>
                </h4>
                <ul class="single__list">
                    <li
                        class="single__list-element"
                        v-for="(parentFramework, index) in parentFrameworks"
                        :key="index">
                        <a
                            :title="parentFramework.name"
                            class="single__li-a"
                            @click="goToFramework(parentFramework)">
                            <span>{{ parentFramework.name }}</span>
                            <div
                                :title="parentFramework.name"
                                class="button is-outlined is-small is-primary">
                                <span class="icon">
                                    <i class="fa fa-external-link-alt" />
                                </span>
                                <span>
                                    open
                                </span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="buttons is-right is-fullwidth">
                <!--to do, make sure level is updated in framework after
                    edit is made -->
                <button
                    @click="edit=true"
                    class="button is-outlined is-primary"
                    v-if="dynamicModalContent.objectType==='Level'">
                    Edit {{ dynamicModalContent.type }}
                </button>
                <button
                    @click="$store.commit('app/closeModal')"
                    class="button is-outlined is-large is-primary">
                    return to framework editor
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import Thing from '@/lode/components/lode/Thing.vue';
import ThingEditing from '@/lode/components/lode/ThingEditing.vue';

export default {
    name: 'Single',
    components: {Thing, ThingEditing},
    data() {
        return {
            edit: false,
            parentFrameworks: [],
            repo: window.repo
        };
    },
    computed: {
        ...mapState({
            framework: state => state.editor.framework,
            dynamicModalContent: state => state.app.modal.dynamicModalContent
        }),
        dynamicThing: function() {
            if (this.edit) {
                return 'ThingEditing';
            } else {
                return 'Thing';
            }
        },
        numberOfParentFrameworks: function() {
            return this.parentFrameworks.length;
        },
        // Basic profile to be able to edit level names
        profile: function() {
            return {
                "http://schema.org/name": {
                    "@id": "http://schema.org/name",
                    "@type": ["http://www.w3.org/2000/01/rdf-schema#Property"],
                    "http://schema.org/domainIncludes":
                        [{"@id": "https://schema.cassproject.org/0.4/Level"}],
                    "http://schema.org/rangeIncludes": [{"@id": "http://schema.org/Text"}],
                    "http://www.w3.org/2000/01/rdf-schema#comment":
                        [{"@language": "en", "@value": "The name of the Level"}],
                    "http://www.w3.org/2000/01/rdf-schema#label": [{"@language": "en", "@value": "Name"}],
                    "isRequired": "true"
                },
                "alwaysProperties": ["http://schema.org/name"]
            };
        }
    },
    methods: {
        goToFramework: function(framework) {
            if (this.framework.shortId() === framework.url && this.dynamicModalContent.objectType !== "Level") {
                return this.goToCompetencyWithinThisFramework();
            }
            this.$store.commit('editor/framework', EcRepository.getBlocking(framework.url));
            if (this.dynamicModalContent.objectType === "Concept") {
                this.$store.commit('editor/conceptMode', true);
                this.$router.push({name: "conceptScheme", params: {frameworkId: framework.url}});
            }
            this.$store.commit('app/closeModal');
        },
        goToCompetencyWithinThisFramework: function() {
            // Scroll to competency
            this.$scrollTo("#scroll-" + this.dynamicModalContent.uri.split('/').pop());
            this.$store.commit('app/closeModal');
        },
        findConceptTrail: function(conceptId) {
            var concept = EcRepository.getBlocking(conceptId);
            if (concept["skos:topConceptOf"]) {
                var scheme = EcConceptScheme.getBlocking(concept["skos:topConceptOf"]);
                this.parentFrameworks.push({name: this.getDisplayStringFrom(scheme["dcterms:title"]), url: scheme.shortId()});
            } else if (concept["skos:broader"]) {
                this.findConceptTrail(concept["skos:broader"]);
            }
        },
        getDisplayStringFrom: function(n) {
            if (n != null && EcArray.isArray(n)) {
                if ((n).length > 0) {
                    n = (n)[0];
                }
            }
            if (n != null && EcObject.isObject(n) && (n)["@value"]) {
                return (n)["@value"];
            }
            return n;
        },
        doneEditing: function() {
            this.edit = false;
        }
    },
    mounted() {
        var me = this;
        if (this.dynamicModalContent.objectType === "Level") {
            EcFramework.search(this.repo, "level:\"" + this.dynamicModalContent.uri + "\"", function(success) {
                for (var i = 0; i < success.length; i++) {
                    me.parentFrameworks.push({name: success[i].getName(), url: success[i].shortId()});
                }
            }, function(failure) {
                appError(failure);
                me.parentFrameworks = [];
            }, null);
        } else if (this.dynamicModalContent.objectType === "Competency") {
            EcFramework.search(this.repo, "competency:\"" + this.dynamicModalContent.uri + "\"", function(success) {
                for (var i = 0; i < success.length; i++) {
                    me.parentFrameworks.push({name: success[i].getName(), url: success[i].shortId()});
                }
            }, function(failure) {
                appError(failure);
                me.parentFrameworks = [];
            }, null);
        } else {
            this.findConceptTrail(this.dynamicModalContent.uri);
        }
    }
};
</script>


<style lang="scss">
    @import '@/scss/variables.scss';

.single {
    .lode__thing {
        padding-left: 0rem;
        .field {
            padding-left: .25rem;
        }
    }
    .comment-button {
        display: none;
    }
    .lode__thing:hover {
        padding-lefT: 0rem;
        color: $dark;
    }
    .lode__thing-editing {
        padding: 0;
        box-shadow: none;
        .field {
            padding-left: 0rem;
        }
    }
    .single__list {
        width: 100%;
        .single__list-element {
            padding: .25rem 0rem;
            .single__li-a {
                display: flex;
                flex-wrap: no-wrap;
                justify-content: space-between;
            }
        }
    }
}
</style>