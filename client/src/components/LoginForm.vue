<template>
    <article>
        <h3>Login Form</h3>
        <div v-if="loginError" class="row">
            <div v-for="error in loginError" :key="error.message" class="basic-error">
                {{ error.message }}
            </div>
        </div>
        <form @submit.prevent="loginUser">
            <div class="row">
                <div class="col-25">
                    <label for="email">Email</label>
                </div>
                <div class="col-75">
                    <input v-model="email"
                           type="email"
                           id="email"
                           name="email"
                           :class="getInputClass(this.emailError)"
                           placeholder="Your email address - email@example.com"
                           title="Must be email format e.g. email@example.com and no less than 5 characters"
                    >
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="email">Password</label>
                </div>
                <div class="col-75">
                    <input v-model="password"
                           type="password"
                           id="password"
                           name="password"
                           :class="getInputClass(this.passwordError)"
                           minlength="8"
                           placeholder="Your Password - Min 8 Characters"
                           title="Must be at least 8 characters"
                    >
                </div>
            </div>
            <div class="row">
                <input type="submit" class="primary" value="Submit" :disabled="submitDisabled">
            </div>
        </form>
    </article>
</template>

<script lang="ts">

import Vue from "vue";

import { mapActions, mapGetters, mapMutations } from "vuex";
import { LoginFormType } from "@/types/Forms";

export default Vue.extend({
    name: "LoginForm",

    data: () => {
        return {
            password: "",
            email: "",
            showLoginErrors: false
        };
    },
    computed: {
        ...mapGetters({ isUserLoggedIn: "getUserLoginStatus", loginError: "getLoginError" }),
        passwordError(): boolean {
            return this.password.length < 8;
        },
        emailError(): boolean {
            return this.email.length < 5 || !this.email.match(/\S+@\S+\.\S+/);
        },
        submitDisabled(): boolean {
            return this.passwordError || this.emailError;
        }
    },
    watch: {
        async isUserLoggedIn(newValue) {
            if (newValue) {
                await this.$router.push('/');
            }
        },
    },
    methods: {
        ...mapMutations({ setLoginError: "setLoginError" }),
        ...mapActions({ submitLoginForm: "submitLoginForm" }),
        async loginUser() {

            const data: LoginFormType = {
                email: this.email,
                password: this.password
            };

            await this.submitLoginForm(data);
        },
        getInputClass(prop: boolean): string {
            return prop ? '' : 'input-green';
        }
    },
    mounted() {
        this.setLoginError(null);
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

input[type=url], input[type=text], input[type=email], input[type=password], select, textarea {
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
    margin-top: 5px;
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

.row:after {
    content: "";
    display: table;
    clear: both;
}

.primary {
    background-color: #464c49;
    color: white;
}

.primary:disabled, .primary:hover:disabled {
    background-color: #a0a1a0;
    color: white;
}

@media screen and (max-width: 678px) {
    .col-25, .col-75, .row, input[type=submit], button {
        width: 100%;
        margin-left: 0;
        margin-top: 5px;
    }
}
</style>