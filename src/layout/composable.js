import { useAccountStore, useSettingStore } from '@/store'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

export const useState = () => {
  const accountStore = useAccountStore()
  const settingStore = useSettingStore()
  const route = useRoute()

  return reactive({
    appHeaderHeight: computed(() => settingStore.appHeaderHeight),
    appNavigation: computed(() => settingStore.appNavigation),
    appSetting: computed(() => settingStore.appSetting),
    appPermanentNavigation: computed(() => settingStore.appPermanentNavigation),
    appTheme: computed(() => settingStore.appTheme),
    appThemeDark: computed(() => settingStore.appThemeDark),
    appMultipleTabs: computed(() => settingStore.appMultipleTabs),
    username: computed(() => accountStore.account?.username),
    breadcrumbs: computed(() => route.matched.map(r => ({ title: r.name })).slice(1)),
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
