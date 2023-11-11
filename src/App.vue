<template>
  <v-app class="fill-width fill-height" id="v-application">
    <router-view v-slot="{ Component }">
      <v-fade-transition leave-absolute mode="out-in">
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
    <Toast :dark="settingStore.appThemeDark" />
  </v-app>
</template>

<script>
import { useSettingStore } from '@/stores'
export default {
  name: 'App',
  setup () {
    return {
      settingStore: useSettingStore(),
    }
  },
}
</script>

<style lang="scss">
@import "@/assets/styles/index";
</style>
