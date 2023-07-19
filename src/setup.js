import { useAccountStore, useSettingStore } from '@/store'
import { useDisplay, useTheme } from 'vuetify'
import { watch } from 'vue'

export default function setup () {
  const accountStore = useAccountStore()
  const settingStore = useSettingStore()
  const { xs } = useDisplay()
  const theme = useTheme()

  watch(
    () => xs.value,
    () => settingStore.setAppHeaderHeight(xs.value ? 48 : 56),
    { immediate: true },
  )

  watch(
    () => [settingStore.appTheme, settingStore.appThemeDark],
    ([appTheme, appThemeDark]) => {
      setTimeout(() => {
        theme.global.name.value = `${appTheme}${appThemeDark ? `DarkTheme` : 'LightTheme'}`
        // TODO
      })
    },
    { immediate: true },
  )

  accountStore.buildRoutes()
}
