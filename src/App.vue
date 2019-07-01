<template>
  <div id="app">
    <Demo v-if="!isDev" />
    <DevDemo v-else />
  </div>
</template>
<script>
import Demo from './demo/index.vue'
import DevDemo from './demo/dev-demo.vue';

export default {
  name: 'app',
  computed: {
    isDev() {
      return false;//process.env.NODE_ENV === 'development';
    }
  },
  components: {
    Demo,
    DevDemo
  }
}
</script>
<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}
body {
  margin: 0px;
}
</style>