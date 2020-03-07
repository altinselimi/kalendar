import Vue from "vue";
import Dev from "@/serve-dev.vue";
import PortalVue from "portal-vue";
Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
	render: h => h(Dev)
}).$mount("#app");
