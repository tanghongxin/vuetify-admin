<template>
  <v-app
    id="app"
    class="fill-width fill-height"
  >
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
@import '~@/assets/styles/index.scss';
</style>
