<template>
  <div id="app">
    <Demo />
  </div>
</template>
<script>
import Demo from './demo/index.vue'

export default {
  name: 'app',
  components: {
    Demo
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