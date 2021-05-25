<template>
    <article>
        <div class="row">
            <div class="col-75">
                <h3>Your Links</h3>
                <p v-if="userLinks.length === 0 && !fetchErrors">You don't have any saved links, yet :)</p>
                <div v-if="fetchErrors" class="row">
                    <div  v-for="error in fetchErrors" :key="error.message" class="basic-error">
                        {{ error.message }}
                    </div>
                </div>
            </div>
            <div class="col-25"/>
        </div>
        <div v-for="link in userLinks" :key="link.shortId" class="row ">
            <transition name="slide-fade" :appear="displayTransitions">
                <div class="col-75">
                    <LinkItem :linkItem="link"/>
                </div>
            </transition>
        </div>
    </article>
</template>

<script lang="ts">

import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

import { LinkItemType } from "@/types/Link";

import LinkItem from "@/components/LinkItem.vue";

export default Vue.extend({
    name: "LinkCreator",
    components: { LinkItem },
    data: () => {
        return {
            displayCopied: false as boolean,
            shortLinks: [] as  LinkItemType[],
            displayTransitions: false as boolean
        };
    },
    computed: {
        ...mapGetters({ userLinks: "getUserLinks", fetchErrors: "getFetchLinksError" }),
    },
    methods: {
        ...mapActions({ fetchShortLinks: "fetchShortLinks" }),
        ...mapMutations({ setFetchLinksError: "setFetchLinksError" }),
        async getUserLinks() {
            await this.fetchShortLinks();
        },
        goToForm(form?: string) {
            this.$router.push({ path: '/login', query: { form } });
        }
    },
    mounted() {
        setTimeout(() => this.displayTransitions = true, 500); //disable transition on initial render
        this.setFetchLinksError(null);
        this.getUserLinks();
    }
});
</script>

<style scoped>

.row {
    max-width: 850px;
    margin: auto;
    width: 75%;
    align-content: center;
}

.row:after {
    content: "";
    display: table;
    clear: both;
}

input[type=url], input[type=text], select, textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: vertical;
    margin: 5px;
}

label {
    padding: 12px 12px 12px 0;
    display: inline-block;
}

input[type=submit], button {
    min-width: 100px;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: left;
    margin: 5px;
}

.col-25 {
    float: left;
    width: 25%;
    margin-top: 6px;
}

.col-75 {
    float: left;
    width: 75%;
    margin-top: 6px;
}

@media screen and (max-width: 678px) {
    .col-25, .col-75, .row, input[type=submit], button {
        width: 100%;
        margin-left: 0;
        margin-top: 5px;
    }
}

.slide-fade-enter-active {
    transition: all 1s ease;
}
.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
    border: 2px solid rgba(31, 189, 94, 0.27);
    background: rgba(31, 189, 94, 0.27);
    transform: translateX(10px);
    opacity: 0;
}
</style>