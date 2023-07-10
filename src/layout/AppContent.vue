<script lang="jsx">
import LayoutRouterView from '@/layout/LayoutRouterView.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppContent',
  render () {
    return (
      <v-main class="app-content fill-height overflow-hidden">
        <LayoutRouterView />
      </v-main>
    )
  },
})
</script>

<style lang="scss">
</style>
