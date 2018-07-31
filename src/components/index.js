import Kalendar from './kalendar-components/kalendar-container.vue';

// Install the components
export function install (Vue) {
  Vue.component('kalendar', Kalendar)
}

// Expose the components
export {
  Kalendar,
}