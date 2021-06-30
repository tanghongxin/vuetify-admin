import { AccountActions, SettingMutations } from '@/store/modules'
import { ls } from '@/utils/storage'

export default function () {
  this.$store.dispatch(`account/${AccountActions.BUILD_ROUTES}`)
  this.$vuetify.theme.currentTheme.primary = ls.get('themeColor', this.$vuetify.theme.currentTheme.primary)
  this.$watch('$vuetify.breakpoint.xsOnly', function (e) {
    this.$store.commit(`setting/${SettingMutations.SET_APP_HEADER_HEIGHT}`, e ? 48 : 64)
  }, { immediate: true })
}
