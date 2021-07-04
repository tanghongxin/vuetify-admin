<template>
  <v-app
    id="app"
    class="fill-width fill-height"
  >
    <v-fade-transition leave-absolute mode="out-in">
      <router-view />
    </v-fade-transition>
    <vue-snotify />
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import '~@/assets/styles/index';
</style>
