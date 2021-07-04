<script>
import AppRouterViewTabs from '@/layout/RouterViewTabs.vue'

export default {
  name: 'AppContent',
  render () {
    return (
      <v-main class="app-content fill-height overflow-hidden">
        <AppRouterViewTabs />
      </v-main>
    )
  },
}
</script>

<style lang="scss">
</style>
