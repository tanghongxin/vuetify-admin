<script>
import LayoutRouterView from '@/layout/LayoutRouterView.vue'

export default {
  name: 'AppContent',
  render () {
    return (
      <v-main class="app-content fill-height overflow-hidden">
        <LayoutRouterView />
      </v-main>
    )
  },
}
</script>

<style lang="scss">
</style>
