<template>
  <v-content class="AppContent">
    <VRouterViewTabs />
  </v-content>
</template>

<script>
import VRouterViewTabs from '~~/implements/VRouterViewTabs'

export default {
  name: 'AppContent',
  components: {
    VRouterViewTabs,
  },
}
</script>

<style lang="scss">
.AppContent {
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
</style>
