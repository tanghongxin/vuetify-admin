<template>
  <v-app id="app">
    <router-view />
    <vue-snotify />
  </v-app>
</template>

<script>

export default {
  namd: 'App',
  components: {
  },
  props: {
    source: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
    drawer: null,
  }),
}
</script>

<style lang="scss">
@import '~@/assets/styles/index';

#app {
  width: 100%;
  height: 100%;
}
</style>
