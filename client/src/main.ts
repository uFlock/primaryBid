import Vue from 'vue';
import Clipboard from 'v-clipboard';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Clipboard);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
