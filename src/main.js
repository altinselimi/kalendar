import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$kalendar = {};

import Filters from '@/components/kalendar/filters.js';

for(let key in Filters) {
    Vue.filter(key, Filters[key]);
}

new Vue({
  render: h => h(App)
}).$mount('#app')
