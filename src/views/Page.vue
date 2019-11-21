<template>
  <div class="Page">
    <AppNavigation />
    <AppHeader /> 
    <AppContent />
    <AppSetting />
  </div>
</template>

<script>
import AppHeader from '~~/layout/AppHeader'
import AppContent from '~~/layout/AppContent'
import AppNavigation from '~~/layout/AppNavigation'
import AppSetting from '~~/layout/AppSetting'

export default {
  namd: 'Page',
  components: {
    AppHeader,
    AppContent,
    AppNavigation,
    AppSetting,
  },
  watch: {
    '$vuetify.breakpoint.xsOnly': {
      immediate: true,
      handler (e) {
        this.$store.commit('setting/setAppHeaderHeight', e ? 48 : 64)
      },
    },
  },
}
</script>

<style lang="scss">
.Page {
  width: 100%;
  height: 100%;
}
</style>
