<script>
import AppRouterViewTabs from '@/layout/AppRouterViewTabs.vue'

export default {
  name: 'AppContent',
  render () {
    return (
      <v-main class="app-content fill-height overflow-hidden">
        { this.$store.state.setting.appMultipleTabs ? <AppRouterViewTabs /> : <router-view /> }
      </v-main>
    )
  },
}
</script>

<style lang="scss">
</style>
