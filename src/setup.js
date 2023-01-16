import { AccountActions, SettingMutations } from '@/store/modules'
import { useStore } from 'vuex'
import { useDisplay, useTheme } from 'vuetify'
import { watch } from 'vue'

export default function setup () {
  const store = useStore()
  const { xs } = useDisplay()
  const theme = useTheme()

  watch(
    () => xs.value,
    () => store.commit('setting/' + SettingMutations.SET_APP_HEADER_HEIGHT, xs.value ? 48 : 56),
    { immediate: true },
  )

  watch(
    () => [store.state.setting.appTheme, store.state.setting.appThemeDark],
    ([appTheme, appThemeDark]) => {
      setTimeout(() => {
        theme.global.name.value = `${appTheme}${appThemeDark ? `DarkTheme` : 'LightTheme'}`
      })
    },
    { immediate: true },
  )

  store.dispatch('account/' + AccountActions.BUILD_ROUTES)
}
