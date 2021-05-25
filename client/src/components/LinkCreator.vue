<template>
    <article>
        <div class="row">
            <div class="col-75">
                <h3>Paste your link :)</h3>
                <div v-if="generateLinkErrors" class="row">
                    <div  v-for="error in generateLinkErrors" :key="error.message" class="basic-error">
                        {{ error.message }}
                    </div>
                </div>
            </div>
        </div>
        <form @submit.prevent="shorten">
            <div class="row">
                <div class="col-75">
                    <input
                            v-model="currentLink"
                            type="url"
                            id="url"
                            :placeholder="placeholderLink"
                            :class="shortenedUrlInputClass"
                            name="url"
                            minlength="15"
                            maxlength="2000"
                            title="Must be a valid http/https link e.g. https://goole.com/. Between 15 and 2000 characters"
                    >
                </div>
                <div v-if="generatingLink" class="col-25">
                    <button type="button"
                            class="primary"
                            disabled>
                        Generating...
                    </button>
                </div>
                <div v-else class="col-25">
                    <button v-if="!isShortLink"
                            type="submit"
                            class="primary"
                            :disabled="submitDisabled">
                        Shorten
                    </button>
                    <button v-if="isShortLink && !displayCopied"
                            type="button"
                            class="primary"
                            @click="copyLinkToClipboard">
                        Copy
                    </button>
                    <button v-if="displayCopied"
                            type="button"
                            class="primary copied"
                            disabled>
                        Copied
                    </button>
                </div>
            </div>
        </form>
        <div v-if="!isLoggedIn" class="row">
            <p class="col-75-margin-25 ">
                If you would like to save and manage your short urls please
                <a href="#" @click="goToForm('register')" class="link">Register</a> or
                <a href="#" @click="goToForm('login')" class="link">Login</a> into your account.
            </p>
        </div>
    </article>
</template>

<script lang="ts">

import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

const SHORT_LINK_BASE_URL = process.env.VUE_APP_SHORT_LINK_BASE_URL;

interface LinkCreatorData {
    currentLink: string,
    placeholderLink: string,
    displayCopied: boolean,
    generatingLink: boolean
}

const checkIsShortLink = (currentLink: string) =>
        !!currentLink && currentLink.substr(0, SHORT_LINK_BASE_URL.length) === SHORT_LINK_BASE_URL &&
        currentLink.length === SHORT_LINK_BASE_URL.length + 8;

export default Vue.extend({
    name: "LinkCreator",
    data: (): LinkCreatorData => {
        return {
            currentLink: "",
            placeholderLink: "Shorten your link",
            displayCopied: false,
            generatingLink: false
        };
    },
    computed: {
        ...mapGetters({ isLoggedIn: "getUserLoginStatus", generateLinkErrors: 'getGenerateLinkError' }),
        submitDisabled(): boolean {
            return this.currentLink?.length < 15;
        },
        isShortLink(): boolean {
            return checkIsShortLink(this.currentLink);
        },
        shortenedUrlInputClass(): string {
            return checkIsShortLink(this.currentLink) ? 'shortenedUrlInput input-green' : '';
        }
    },
    methods: {
        ...mapActions({ createShortLink: "createShortLink" }),
        ...mapMutations({ setGenerateLinkError: "setGenerateLinkError" }),
        async shorten() {

            this.generatingLink = true;

            const data = { url: this.currentLink };

            this.currentLink = await this.createShortLink(data);

            this.generatingLink = false;
        },
        copyLinkToClipboard() {

            (this as any).$clipboard(this.currentLink);

            this.displayCopied = true;

            setTimeout(() =>
                    this.displayCopied = false, 500);
        },
        async goToForm(form?: string) {
            await this.$router.push({ path: 'login', query: { form }});
        }
    },
    mounted() {
        this.setGenerateLinkError(null);
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

input[type=url], input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: vertical;
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
    margin-left: 5px;
    margin-top: 1px;
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

.col-75-margin-25 {
    float: none;
    width: 75%;
    margin-top: 25px;
}

.row:after {
    content: "";
    display: table;
    clear: both;
}

@media screen and (max-width: 678px) {
    .col-25, .col-75, .row, input[type=submit], button {
        width: 100%;
        margin-left: 0;
        margin-top: 5px;
    }
    .col-75-margin-25 {
        width: 100%;
        margin-left: 0;
    }
}
</style>