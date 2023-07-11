<template>
  <v-layout>
    <AppSetting />
    <AppHeader />
    <AppNavigation />
    <AppContent />
  </v-layout>
</template>

<script>
import AppHeader from '@/layout/AppHeader.vue'
import AppContent from '@/layout/AppContent.vue'
import AppNavigation from '@/layout/AppNavigation.vue'
import AppSetting from '@/layout/AppSetting.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppPage',
  components: {
    AppHeader,
    AppContent,
    AppNavigation,
    AppSetting,
  },
})
</script>

<style lang="scss">
</style>
