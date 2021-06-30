<script>
import VRouterViewTabs from '@/components/Implements/VRouterViewTabs.vue'

export default {
  name: 'AppContent',
  render () {
    return (
      <v-content class="AppContent fill-height overflow-hidden">
        <VRouterViewTabs />
      </v-content>
    )
  },
}
</script>

<style lang="scss">
.AppContent {
  background-color: #fff;
}
</style>
