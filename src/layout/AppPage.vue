<script lang="jsx">
import AppHeader from '@/layout/AppHeader.vue'
import AppContent from '@/layout/AppContent.vue'
import AppNavigation from '@/layout/AppNavigation.vue'
import AppSetting from '@/layout/AppSetting.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppPage',
  render () {
    return (
      <v-layout>
        <AppSetting />
        <AppHeader />
        <AppNavigation />
        <AppContent />
      </v-layout>
    )
  },
})
</script>

<style lang="scss">
</style>
