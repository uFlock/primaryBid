<template>
    <div>
        <LinkCreator/>
        <LinkList v-if="isLoggedIn"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LinkCreator from "@/components/LinkCreator.vue";
import LinkList from "@/components/LinkList.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
    name: 'Home',
    components: {
        LinkCreator,
        LinkList
    },
    computed: {
        ...mapGetters({ isLoggedIn: "getUserLoginStatus" }),
    }
});
</script>
