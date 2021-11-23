import { AccountActions, SettingMutations } from '@/store/modules'

export default function bootstrap () {
  const { $store, $vuetify, $nextTick } = this
  
  this.$watch(
    () => $vuetify.breakpoint.xsOnly,
    (xs) => $store.commit(`setting/${SettingMutations.SET_APP_HEADER_HEIGHT}`, xs ? 48 : 56),
    { immediate: true },
  )

  this.$watch(
    () => $store.state.setting.appPrimaryColor,
    (primary) => $nextTick(() => Object.assign($vuetify.theme.currentTheme, { primary })),
    { immediate: true },
  )

  this.$watch(
    () => $store.state.setting.appThemeDark,
    (dark) => $nextTick(() => {
      /**
       * Vuetify will rollback to the default primary color
       * if we changed primary color dynamically or did not specify a dark theme color
       */
      const { primary } = $vuetify.theme.currentTheme
      Object.assign($vuetify.theme, { dark })
      Object.assign($vuetify.theme.currentTheme, { primary })
    }),
    { immediate: true },
  )

  $store.dispatch(`account/${AccountActions.BUILD_ROUTES}`)
}
