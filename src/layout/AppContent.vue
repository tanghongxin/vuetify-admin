<template>
  <v-main class="app-content fill-height overflow-hidden">
    <LayoutRouterView />
  </v-main>
</template>

<script>
import LayoutRouterView from '@/layout/LayoutRouterView.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppContent',
  components: {
    LayoutRouterView,
  },
})
</script>

<style lang="scss">
</style>
