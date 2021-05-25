<template>
    <div class="card">
        <div class="container">
            <p class="text-center">
                <a :href="linkItem.originalLink"
                   :title="hrefTitle"
                   target="_blank"
                   class="link blue"
                >
                    <b>
                        <i class="fas fa-external-link-alt"/> {{ linkTitle }}
                    </b>
                </a>
            </p>
            <hr>
            <div class="text-center">
                <p class="small-margin pointer" @click="copyLinkToClipboard(linkItem.shortLink)">
                    <b class="blue">
                        <i class="fas fa-link"/>
                        {{ linkItem.shortLink }}
                    </b>
                </p>
                <p class="small-margin">
                    <i class="far fa-clock"/> {{ createdAt }}
                </p>
                <p v-if="showFullOriginalLink" class="small-margin pointer" @click="toggleShowFullOriginalLink">
                    <i :title="linkItem.originalLink">{{ linkItem.originalLink }}</i>
                </p>
                <p v-else class="small-margin pointer" @click="toggleShowFullOriginalLink">
                    <i :title="linkItem.originalLink">{{ originalLink }}</i>
                </p>
            </div>
            <br>
            <hr>
            <div class="text-center">
                <button v-if="displayCopied"
                        type="button"
                        class="primary copied"
                        disabled>
                    Copied
                </button>
                <button v-else
                        type="button"
                        class="primary"
                        @click="copyLinkToClipboard(linkItem.shortLink)">
                    Copy
                </button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import { LinkItemType } from "@/types/Link";

const cutLength = (string: string = '', maxLength: number = 65) => {

    const stringLength = string?.length || 0;
    const stringToDisplay = string?.substr(0, maxLength);

    return stringLength > maxLength ? stringToDisplay + '...' : string;
};

export default Vue.extend({
    name: "LinkItem",
    props: {
        linkItem: {
            type: Object as () => LinkItemType
        }
    },
    data: () => {
        return {
            showFullOriginalLink: false,
            displayCopied: false
        };
    },
    computed: {
        linkTitle(): string {
            return cutLength(this.linkItem.title!, 65);
        },
        originalLink(): string {
            return cutLength(this.linkItem.originalLink, 65);
        },
        hrefTitle(): string | undefined | null {
            return this.linkItem.title;
        },
        createdAt(): string {
            const date = new Date(this.linkItem.createdAt!).toLocaleDateString();
            const time = new Date(this.linkItem.createdAt!).toLocaleTimeString();
            return date + ' ' + time;
        }
    },
    methods: {
        toggleShowFullOriginalLink() {
          this.showFullOriginalLink = !this.showFullOriginalLink;
        },
        copyLinkToClipboard(shortLink: string) {

            (this as any).$clipboard(shortLink);

            this.displayCopied = true;

            setTimeout(() => {
                this.displayCopied = false;
            }, 500);
        },
    }
});
</script>

<style scoped>

.link {
    text-decoration: none;
}

hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
.small-margin {
    margin-bottom: 1px;
}

.pointer {
    cursor: pointer;
}

.blue {
    color: #033365;
}

.card {
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: 0.3s;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
    overflow-wrap: break-word;
    word-wrap: break-word;
    padding: 2px 16px;
    text-align: left;
}

button {
    min-width: 100px;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
}
</style>