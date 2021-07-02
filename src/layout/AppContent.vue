<script>
import VRouterViewTabs from '@/components/VImplements/VRouterViewTabs.vue'

export default {
  name: 'AppContent',
  render () {
    return (
      <v-main class="app-content fill-height overflow-hidden">
        <VRouterViewTabs />
      </v-main>
    )
  },
}
</script>

<style lang="scss">
</style>
