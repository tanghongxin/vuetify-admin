<template>
  <v-app class="fill-width fill-height" id="v-application">
    <router-view v-slot="{ Component }">
      <v-fade-transition leave-absolute mode="out-in">
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
    <Toast :dark="$store.state.setting.appThemeDark" />
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import "@/assets/styles/index";
</style>
