<template>
    <article>
        <h3>Register Form</h3>
        <div v-if="registerError" class="row">
            <div v-for="error in registerError" :key="error.message" class="basic-error">
                {{ error.message }}
            </div>
        </div>
        <form v-if="showLogin" @submit.prevent="registerUser">
            <div class="row">
                <div class="col-25">
                    <label for="name">Name</label>
                </div>
                <div class="col-75">
                    <input v-model="name"
                           type="text"
                           id="name"
                           name="name"
                           :class="getInputClass(this.nameError)"
                           placeholder="Your name - Min 5 Characters"
                           title="Minimum 5 Characters e.g. Jhon Connor, Sarah Connor"
                    >
                </div>
            </div>
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
import { RegisterFormType } from "@/types/Forms";

export default Vue.extend({
    name: "RegisterForm",
    data: () => {
        return {
            showLogin: true,
            name: "" as string,
            password: "" as string,
            email: "" as string,
        };
    },
    computed: {
        ...mapGetters({ isUserLoggedIn: "getUserLoginStatus", registerError: "getRegisterError" }),
        passwordError(): boolean {
            return this.password.length < 8;
        },
        emailError(): boolean {
            return this.email.length < 5 || !this.email.match(/\S+@\S+\.\S+/);
        },
        nameError(): boolean {
            return this.name.length < 5;
        },
        submitDisabled(): boolean {
            return this.passwordError || this.emailError || this.nameError;
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
        ...mapMutations({ setRegisterError: "setRegisterError", setUserData: "setUserData" }),
        ...mapActions({ submitRegisterForm: "submitRegisterForm" }),
        async registerUser() {

            const data: RegisterFormType = {
                name: this.name,
                email: this.email,
                password: this.password,
            };

            await this.submitRegisterForm(data);
        },
        getInputClass(prop: boolean): string {
            return prop ? '' : 'input-green';
        }
    },
    mounted() {
        this.setRegisterError(null);
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


@media screen and (max-width: 678px) {
    .col-25, .col-75, .row, input[type=submit], button {
        width: 100%;
        margin-left: 0;
        margin-top: 5px;
    }
}
</style>