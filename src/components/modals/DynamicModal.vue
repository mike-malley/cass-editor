<!--
Dynamic component used to display various modal content such as
search, edit multiple competencies, view single competency, export,
share framework settings, and more.

To add content to this modal, imort the relevant compontnt and trigger it
by this.$store.commit('app/showmodal', payload); Where payload at minimum
returns an object with component: 'View' so the dynamic :is=dynamicModal
returns content.
-->
<template>
    <div
        class="modal competency-search"
        :class="{'is-active': showModal}">
        <div class="modal-background" />
        <Component
            view="dynamic-modal"
            :content="dynamicModalContent"
            :is="dynamicModal" />
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Share from '@/components/framework/Share.vue';
import MultiEdit from '@/components/competency/MultiEdit.vue';
import Search from '@/components/competency/Search.vue';
import Single from '@/components/competency/Single.vue';
import AddComment from '@/components/framework/AddComment.vue';
import DeleteCommentConfirm from '@/components/framework/DeleteCommentConfirm.vue';
import SupportedImportDetails from '@/components/import/SupportedImportDetails.vue';
import Configuration from '@/views/configuration/ConfigurationEditor.vue';

export default {
    name: 'DynamicModal',
    components: {
        Share,
        MultiEdit,
        Search,
        AddComment,
        DeleteCommentConfirm,
        SupportedImportDetails,
        Single,
        Configuration
    },
    data() {
        return {
        };
    },
    computed: {
        showModal: function() {
            return this.$store.getters['app/showModal'];
        },
        dynamicModalContent: function() {
            if (this.showModal) {
                return this.$store.getters['app/dynamicModalContent'];
            } else {
                return {};
            }
        },
        dynamicModal: function() {
            if (this.dynamicModalContent) {
                return this.dynamicModalContent.component;
            } else {
                return '';
            }
        }

    },
    watch: {

    }
};
</script>


<style lang="scss">
    @import '@/scss/frameworks.scss';


</style>