import { AccountActions, SettingMutations } from '@/store/modules'

export default function bootstrap () {
  const { $store, $vuetify, $nextTick } = this
  
  this.$watch(
    () => $vuetify.breakpoint.xsOnly,
    (xs) => $store.commit(`setting/${SettingMutations.SET_APP_HEADER_HEIGHT}`, xs ? 48 : 64),
    { immediate: true }
  )

  this.$watch(
    () => $store.state.setting.appPrimaryColor,
    (val) => $nextTick(() => $vuetify.theme.currentTheme.primary = val),
    { immediate: true }
  )

  this.$watch(
    () => $store.state.setting.appThemeDark,
    (val) => $nextTick(() => {
      // HACK: change dark will rollback to the default primary color
      const { primary } = $vuetify.theme.currentTheme
      $vuetify.theme.dark = val
      Object.assign($vuetify.theme.currentTheme, { primary })
    }),
    { immediate: true }
  )

  $store.dispatch(`account/${AccountActions.BUILD_ROUTES}`)
}
