import { useAccountStore, useSettingStore } from '@/store'
import { computed, reactive } from 'vue'

export const useState = () => {
  const accountStore = useAccountStore()
  const settingStore = useSettingStore()

  return reactive({
    appHeaderHeight: computed(() => settingStore.appHeaderHeight),
    appNavigation: computed(() => settingStore.appNavigation),
    appSetting: computed(() => settingStore.appSetting),
    appPermanentNavigation: computed(() => settingStore.appPermanentNavigation),
    appTheme: computed(() => settingStore.appTheme),
    appThemeDark: computed(() => settingStore.appThemeDark),
    appMultipleTabs: computed(() => settingStore.appMultipleTabs),
    username: computed(() => accountStore.account?.username),
  })
}

export const useMutations = () => {
  const settingStore = useSettingStore()

  return settingStore
}

export const useActions = () => {
  const accountStore = useAccountStore()
  return accountStore
}
