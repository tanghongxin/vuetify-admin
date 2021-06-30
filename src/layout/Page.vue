<script>
import AppHeader from '@/layout/AppHeader.vue'
import AppContent from '@/layout/AppContent.vue'
import AppNavigation from '@/layout/AppNavigation.vue'
import AppSetting from '@/layout/AppSetting.vue'

export default {
  name: 'Page',
  render () {
    return (
      <div class="Page">
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
.Page {
  width: 100%;
  height: 100%;
}
</style>
