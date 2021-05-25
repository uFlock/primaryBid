<template>
    <header>
        <h1 class="logo">SHORTY</h1>
        <ul class="nav" :class="burgerNavClass">
            <li class="navLink" @click="toggleNav">
                <router-link to="/">Home</router-link>
            </li>
            <li class="navLink" @click="toggleNav">
                <router-link to="/about">About</router-link>
            </li>
            <li v-if="!isLoggedIn" class="navLink" @click="toggleNav">
                <router-link to="/login">Login/Register</router-link>
            </li>
            <li v-else class="navLink">
                <router-link to="/#" @click.native="logout">Logout</router-link>
            </li>
        </ul>
        <div class="burger" @click="toggleNav">
            <i :class="burgerIconClass"></i>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
    name: "NavBar",
    data: () => {
        return {
            burgerClosed: true
        };
    },
    computed: {
        ...mapGetters({isLoggedIn: "getUserLoginStatus"}),
        burgerIconClass(): string {
            return this.burgerClosed ? 'fas fa-bars' : 'fas fa-times';
        },
        burgerNavClass(): string {
            return this.burgerClosed ? '' : 'nav-active';
        }
    },
    watch: {
      burgerClosed(newValue) {
          document.body.style.overflowY = newValue ? '' : 'hidden';
      }
    },
    methods: {
        ...mapActions({ logoutUser: "logout"}),
        toggleNav() {
            if (outerWidth <= 678) {
                this.burgerClosed = !this.burgerClosed;
            }
        },
        async logout() {
            console.log('hello bitch');
            await this.logoutUser();
            await this.$router.push('/');
        },
    }
});
</script>

<style scoped>

header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #232323;
    color: #ccc;
}

.logo {
    letter-spacing: 3px;
}

.nav {
    display: flex;
    justify-content: space-around;
    width: 30%;
}

.navLink {
    list-style: none;
    margin: 0;
}

.navLink a {
    color: #ccc;
    text-decoration: none;
    font-size: 1.2em;
}

.navLink a.router-link-exact-active {
    color: #8bf4cc;
}

.navLink a.router-link-exact-active {
    color: #8bf4cc;
}

.burger {
    font-size: 1.2em;
    display: none;
}

@media screen and (max-width: 678px) {
    .burger {
        display: block;
        font-size: 2em;
    }

    .nav {
        display: none;
        margin: 0;
        background: #343434;
        position: absolute;
        right: -100%;
        top: 70px;
        width: 100%;
        height: calc(100% - 70px);
        flex-direction: column;
        justify-content: space-around;
        padding: 0;
        transition: all 400ms;
    }

    .navLink {
        text-align: center;
    }

    .nav-active {
        display: flex;
        right: 0;
    }
}

</style>