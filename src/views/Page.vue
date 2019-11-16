<template>
  <div class="Page">
    <AppNavigation v-model="navigation" />
    <AppHeader v-model="navigation" /> 
    <AppContent />
    <AppThemes />
  </div>
</template>

<script>
import AppHeader from '~~/layout/AppHeader'
import AppContent from '~~/layout/AppContent'
import AppNavigation from '~~/layout/AppNavigation'
import AppThemes from '~~/layout/AppThemes'

export default {
  namd: 'Page',
  components: {
    AppHeader,
    AppContent,
    AppNavigation,
    AppThemes,
  },
  data: (vm) => ({
    navigation: vm.$vuetify.breakpoint.lgAndUp,
  }),
}
</script>

<style lang="scss">
.Page {
  width: 100%;
  height: 100%;
}
</style>
