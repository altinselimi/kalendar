import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

new Vue({
  render: h => h(App)
}).$mount('#app')
