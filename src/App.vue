<template>
  <v-app id="app">
    <router-view />
    <vue-snotify />
  </v-app>
</template>

<script>

export default {
  namd: 'App',
}
</script>

<style lang="scss">
@import '~@/assets/styles/index';

#app {
  width: 100%;
  height: 100%;
}
</style>
