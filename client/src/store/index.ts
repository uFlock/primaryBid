import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";
import axios, { AxiosError } from "axios";

import { CurrentUser } from "@/types/User";
import { LoginFormType, RegisterFormType } from "@/types/Forms";
import { LinkItemType } from "@/types/Link";

Vue.use(Vuex);

const API_BASE_URL = 'http://localhost:3000';

const API_USER_LOGIN_URL = `${API_BASE_URL}/api/users/login`;
const API_USER_REGISTER_URL = `${API_BASE_URL}/api/users/register`;
const API_USER_WHO_AM_I_URL = `${API_BASE_URL}/api/users/whoami`;
const API_USER_LOGOUT_URL = `${API_BASE_URL}/api/users/logout`;
const API_LINK_GENERATE_URL = `${API_BASE_URL}/api/links/generate`;
const API_LINK_GET_URL = `${API_BASE_URL}/api/links/get`;

const SERVICE_ERROR = 'SERVICE_ERROR';
const UNAUTHORISED = 'Unauthorised';

const currentUserString = window.localStorage.getItem('currentUser');
const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

const defaultState = {
	loginError: null,
	registerError: null,
	generateLinkError: null,
	fetchLinksError: null,
	user: {
		loggedIn: false,
		data: {
			id: '',
			name: '',
			email: '',
		}
	},
	userLinks: [] as LinkItemType[]
};

const store = new Vuex.Store({
	state: { ...defaultState },
	getters: {
		getUserLoginStatus: state => state.user.loggedIn,
		getUserData: state => state.user.data,
		getName: state => state.user.data.name,
		getEmail: state => state.user.data.email,
		getLoginError: (state) => state.loginError,
		getRegisterError: (state) => state.registerError,
		getGenerateLinkError: (state) => state.generateLinkError,
		getFetchLinksError: (state) => state.fetchLinksError,
		getUserLinks: (state) => state.userLinks,
	},
	mutations: {
		setName: (state, payload) => state.user.data.name = payload,
		setUserData: (state, payload) => state.user.data = payload,
		setEmail: (state, payload) => state.user.data.email = payload,
		setUserLoginState: (state, payload) => state.user.loggedIn = payload,
		setLoginError: (state, payload) => state.loginError = payload,
		setRegisterError: (state, payload) => state.registerError = payload,
		setGenerateLinkError: (state, payload) => state.generateLinkError = payload,
		setFetchLinksError: (state, payload) => state.fetchLinksError = payload,
		addLinkToUserLinks: (state, payload: LinkItemType) => state.userLinks.unshift(payload),
		setUserLinks: (state, payload: LinkItemType[]) => state.userLinks = payload,
		resetState: (state) => Object.assign(state, defaultState)
	},
	actions: {
		submitRegisterForm: async (state, payload: RegisterFormType): Promise<CurrentUser | undefined> => {

			try {

				state.commit('setRegisterError', null);

				const result = await axios.post(API_USER_REGISTER_URL, payload, {
					withCredentials: true
				});

				const registeredUser = result.data as CurrentUser;

				state.commit('setUserLoginState', true);
				state.commit('setUserData', registeredUser);

				window.localStorage.setItem('currentUser', JSON.stringify(registeredUser));

				return registeredUser;

			} catch (err) {

				const backEndError = getErrorsFromBackEnd(err);

				state.commit('setUserLoginState', false);
				state.commit('setRegisterError', backEndError.errors);
			}
		},
		submitLoginForm: async (state, payload: LoginFormType): Promise<CurrentUser | undefined> => {

			try {

				state.commit('setLoginError', null);

				const result = await axios.post(API_USER_LOGIN_URL, payload, {
					withCredentials: true
				});

				const loggedInUser = result.data as CurrentUser;

				state.commit('setUserLoginState', true);
				state.commit('setUserData', loggedInUser);

				window.localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

				return loggedInUser;

			} catch (err) {

				const backEndError = getErrorsFromBackEnd(err);

				state.commit('setUserLoginState', false);
				state.commit('setLoginError', backEndError.errors);
			}
		},
		logout: async (state): Promise<void> => {

			try {

				await axios.post(API_USER_LOGOUT_URL, {}, {
					withCredentials: true
				});

				state.dispatch('resetStore');

			} catch (err) {

				const backEndError = getErrorsFromBackEnd(err);

				console.log(backEndError);
			}
		},
		getUserDetails: async (state) => {

			try {

				const result = await axios.get(API_USER_WHO_AM_I_URL, {
					withCredentials: true
				});

				const currentUser = result.data.currentUser as CurrentUser | null;

				if (currentUser) {

					state.commit('setUserLoginState', true);
					state.commit('setUserData', currentUser);

					window.localStorage.setItem('currentUser', JSON.stringify(currentUser));

				} else {
					state.dispatch('resetStore');
				}

			} catch (err) {

				const backEndError = getErrorsFromBackEnd(err);

				state.dispatch('handleUnauthorisedError', backEndError);
			}
		},
		createShortLink: async (state, payload): Promise<string | undefined> => {

			try {

				state.commit('setGenerateLinkError', null);

				const response = await axios.post(API_LINK_GENERATE_URL, payload, {
					withCredentials: true
				});

				const currentLink = response.data as LinkItemType;

				if (state.state.user.loggedIn) {
					state.commit('addLinkToUserLinks', currentLink);
				}

				return currentLink.shortLink;

			} catch (err) {

				const backEndError = getErrorsFromBackEnd(err);

				state.dispatch('handleUnauthorisedError', backEndError);
				state.commit('setGenerateLinkError', backEndError.errors);
			}
		},
		fetchShortLinks: async (state) => {

			try {

				state.commit('setFetchLinksError', null);

				const response = await axios.get(API_LINK_GET_URL, {
					withCredentials: true
				});

				const userLinks = response.data as LinkItemType[];

				state.commit('setUserLinks', userLinks);

			} catch (err) {

				const backEndError = getErrorsFromBackEnd(err);

				state.dispatch('handleUnauthorisedError', backEndError);
				state.commit('setFetchLinksError', backEndError.errors);
			}
		},
		handleUnauthorisedError: (state, backEndError) => {
			if (backEndError === UNAUTHORISED || backEndError.unauthorised) {
				state.dispatch('logout');
			}
		},
		resetStore:  (state) => {
			window.localStorage.removeItem('currentUser');
			state.commit('setUserLoginState', false);
			state.commit('resetState');
		}
	},
	modules: {},
	plugins: [createPersistedState({
		storage: window.localStorage,
	})],
});

export default store;

//refresh user details on load
if (currentUser && navigator.onLine) {
	refreshUserDetails()
		.catch(error => console.log(error));
}

async function refreshUserDetails() {
	await store.dispatch('getUserDetails');
}

function getErrorsFromBackEnd(axiosError: AxiosError) {

	const response = axiosError.response;
	const errors = response?.data.errors;
	const responseCode = response?.status;

	const unauthorised = responseCode === 401;
	const serviceError = responseCode === 500;

	return { errors, unauthorised, serviceError };
}
