<script>
import VRouterViewTabs from '@/components/Implements/VRouterViewTabs.vue'

export default {
  name: 'AppContent',
  render () {
    return (
      <v-content class="app-content fill-height overflow-hidden">
        <VRouterViewTabs />
      </v-content>
    )
  },
}
</script>

<style lang="scss">
.app-content {
  background-color: #fff;
}
</style>
