<template>
  <v-content class="AppContent fill-height overflow-hidden">
    <VRouterViewTabs />
  </v-content>
</template>

<script>
import VRouterViewTabs from '@/components/implements/VRouterViewTabs'

export default {
  name: 'AppContent',
  components: {
    VRouterViewTabs,
  },
}
</script>

<style lang="scss">
.AppContent {
  background-color: #fff;
}
</style>
