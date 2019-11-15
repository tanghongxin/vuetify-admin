<template>
  <div>
    <AppNavigation v-model="drawer" />
    <AppHeader v-model="drawer" /> 
    <AppContent />
  </div>
</template>

<script>
import AppHeader from '~~/layout/AppHeader'
import AppContent from '~~/layout/AppContent'
import AppNavigation from '~~/layout/AppNavigation'

export default {
  namd: 'Page',
  components: {
    AppHeader,
    AppContent,
    AppNavigation,
  },
  data: (vm) => ({
    drawer: vm.$vuetify.breakpoint.lgAndUp,
  }),
}
</script>
