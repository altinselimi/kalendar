import Vue from 'vue';
import Dev from '@/serve-dev.vue';
import Demo from '@/demo';
import PortalVue from 'portal-vue';
import Vuebar from 'vuebar'
import vClickOutside from 'v-click-outside'

Vue.use(Vuebar)
Vue.use(PortalVue);
Vue.use(vClickOutside)
Vue.config.productionTip = false;

const isDev = process.env.NODE_ENV === 'development';

new Vue({
	render: h => h(isDev ? Dev : Demo),
}).$mount('#app');
