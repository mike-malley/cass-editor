<!--
    SearchBar.vue is a component which can be added anywhere a List.vue
    is displaying a list of objects from a cass repository.

    Props:
        searchType:
            allFilters: Includes button to open the right side panel for managing filtered
            search options
            lightSearch: Includes a light version of filters
                            Owned by me
                            Owned by someone
                            Sort by last date modified
-->
<template>
    <div class="">
        <div
            class="field">
            <p
                class="control"
                :class="{'has-icons-right': searchTerm === ''}">
                <input
                    class="input is-small"
                    ref="text"
                    type="search"
                    v-model="searchTerm"
                    :placeholder="'Search for ' + (searchType === 'Competency' ? 'competencie' : searchType)+ 's...'"
                    @keyup.enter="updateSearchTerm(searchTerm)">
                <span
                    v-if="searchTerm === ''"
                    class="icon is-small is-right">
                    <i class="fas fa-search" />
                </span>
            </p>
        </div>
        <!-- filter option button opens side bar -->
        <div
            v-if="filterSet === 'all'"
            class="buttons is-right">
            <div
                @click="clearAllFilters()"
                class="button is-dark is-outlined">
                clear filters
            </div>
            <div
                class="button is-primary is-outlined"
                @click="$store.commit('app/showRightAside', 'FilterAndSort')">
                filter options
            </div>
        </div>
        <!-- info tags to remove filters -->
        <div
            v-if="filterSet === 'all' &&
                (filteredQuickFilters.length > 0 || filteredSearchTo.length>0 || sortResults.label)"
            class="section">
            <span
                v-for="filter in filteredQuickFilters"
                :key="filter"
                class="tag is-dark">
                {{ filter.label }}
                <button
                    @click="removeFilter('quickFilters', filter)"
                    class="delete is-small" />
            </span>
            <span
                v-if="sortResults.label"
                class="tag is-dark">
                {{ sortResults.label }}
                <button
                    @click="clearSortBy"
                    class="delete is-small" />
            </span>
            <span
                v-for="filter in filteredSearchTo"
                :key="filter"
                class="tag is-dark">
                {{ filter.label }}
                <button
                    @click="removeFilter('applySearchTo', filter)"
                    class="delete is-small" />
            </span>
        </div>
        <!-- to do connect basic filters to list results -->
        <div v-if="filterSet === 'basic'">
            <div class="field is-grouped">
                <div
                    class="field"
                    v-if="loggedIn">
                    <input
                        :disabled="ownedByMe"
                        v-model="basicFilter"
                        class="is-checkradio"
                        value="ownedByMe"
                        id="ownedByMe"
                        type="checkbox"
                        name="filterOwnedByMe">
                    <label for="ownedByMe">
                        Owned by me
                    </label>
                </div>
                <div class="field">
                    <input
                        v-model="basicSort"
                        class="is-checkradio"
                        value=""
                        id="alphabeticalSort"
                        type="radio"
                        name="alphabeticalSort"
                        checked="checked">
                    <label for="alphabeticalSort">
                        Alphabetical
                    </label>
                    <input
                        v-model="basicSort"
                        class="is-checkradio"
                        value="lastEdited"
                        id="lastDateModifiedSort"
                        type="radio"
                        name="lastDateModifiedSort">
                    <label for="lastDateModifiedSort">
                        Date modified
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        ownedByMe: {
            type: Boolean,
            default: false
        },
        view: {
            type: String,
            default: ''
        },
        searchType: {
            type: String,
            default: ''
        },
        filterSet: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            searchTerm: '',
            basicSort: '',
            basicFilter: ''
        };
    },
    watch: {
        searchTerm: function(val) {
            if (val.length === 0) {
                this.updateSearchTerm(val);
            }
        },
        basicSort: function(val) {
            appLog(val);
            this.$store.commit("app/sortResults", {id: val});
        },
        basicFilter: function(val) {
            appLog(val);
            var filter;
            if (val === true) {
                filter = {
                    id: 'ownedByMe',
                    checked: true
                };
            } else {
                filter = {
                    id: 'ownedByMe',
                    checked: false
                };
            }
            this.$store.commit("app/quickFilters", [filter]);
        }
    },
    mounted: function() {
        if (this.ownedByMe) {
            this.basicFilter = true;
        }
    },
    methods: {
        clearAllFilters: function() {
            this.$store.commit('app/clearSearchFilters');
            this.clearSortBy();
            this.showMine = false;
            this.showNotMine = false;
        },
        clearSortBy: function() {
            this.$store.commit('app/sortResults', []);
            this.sortBy = this.$store.getters['editor/conceptMode'] === true ? "dcterms:title.keyword" : "name.keyword";
        },
        removeFilter: function(filterType, val) {
            let storeCaller = 'app/' + filterType;
            let filterArray = this.$store.getters[storeCaller];
            let objIndex = filterArray.findIndex(obj => obj.id === val.id);
            filterArray[objIndex].checked = false;
            this.$store.commit(storeCaller, filterArray);
        },
        updateSearchTerm: function(e) {
            this.$store.commit('app/searchTerm', e);
        }
    },
    computed: {
        queryParams: function() {
            return this.$store.getters['editor/queryParams'];
        },
        type: function() {
            return this.$store.getters['editor/conceptMode'] === true ? "ConceptScheme" : "Framework";
        },
        applySearchTo: function() {
            return this.$store.getters['app/applySearchTo'];
        },
        filteredSearchTo: function() {
            let filterValues = this.applySearchTo.filter(item => item.checked === true);
            appLog('filtered value', filterValues);
            return filterValues;
        },
        quickFilters: function() {
            return this.$store.getters['app/quickFilters'];
        },
        filteredQuickFilters: function() {
            let filterValues = this.quickFilters.filter(item => item.checked === true);
            appLog('filtered value', filterValues);
            return filterValues;
        },
        sortResults: function() {
            return this.$store.getters['app/sortResults'];
        },
        loggedIn: function() {
            if (EcIdentityManager.ids && EcIdentityManager.ids.length > 0) {
                return true;
            }
            return false;
        }
    }
};
</script>

