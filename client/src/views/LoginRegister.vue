<template>
    <article>
        <LoginForm v-if="showLoginForm"/>
        <RegisterForm v-else/>
        <p v-if="showLoginForm">
            Don't have an account yet? Please
            <a href="#" class="link" @click.prevent="toggleForms">Register</a>.
        </p>
        <p v-else>
            Already have an account? Please
            <a href="#" class="link" @click.prevent="toggleForms">Login</a>.
        </p>
    </article>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
    name: 'LoginRegister',
    components: {
        LoginForm,
        RegisterForm
    },
    data: () => {
        return {
            showLoginForm: true,
        };
    },
    computed: {
        ...mapGetters({isLoggedIn: "getUserLoginStatus"}),
    },
    methods: {
        toggleForms() {
            this.showLoginForm = !this.showLoginForm;
        }
    },
    mounted() {

        const { form } = this.$route.query;

        if (form === 'register') {
            this.showLoginForm = false;
        }

        if (this.isLoggedIn) {
            this.$router.push('/');
        }
    },
});
</script>

<style scoped>
p {
    margin-top: 50px;
}
</style>