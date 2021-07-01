<script>
import AppHeader from '@/layout/AppHeader.vue'
import AppContent from '@/layout/AppContent.vue'
import AppNavigation from '@/layout/AppNavigation.vue'
import AppSetting from '@/layout/AppSetting.vue'

export default {
  name: 'Page',
  render () {
    return (
      <div class="page">
        <AppNavigation />
        <AppHeader />
        <AppSetting />
        <AppContent />
      </div>
    )
  },
}
</script>

<style lang="scss">
.page {
  height: 100%;
  width: 100%;
}
</style>
