import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import { AccountActions, SettingMutations } from '@/store/modules'

export const useState = () => {
  const store = useStore()

  return reactive({
    appHeaderHeight: computed(() => store.state.setting.appHeaderHeight),
    appNavigation: computed(() => store.state.setting.appNavigation),
    appSetting: computed(() => store.state.setting.appSetting),
    appPermanentNavigation: computed(() => store.state.setting.appPermanentNavigation),
    appTheme: computed(() => store.state.setting.appTheme),
    appThemeDark: computed(() => store.state.setting.appThemeDark),
    appMultipleTabs: computed(() => store.state.setting.appMultipleTabs),
    username: computed(() => store.state.account.username),
  })
}

export const useMutations = () => {
  const store = useStore()

  return {
    setAppHeaderHeight: (payload) => store.commit('setting/' + SettingMutations.SET_APP_HEADER_HEIGHT, payload),
    setAppTheme: (payload) => store.commit('setting/' + SettingMutations.SET_APP_THEME, payload),
    toggleAppThemeDark: (payload) => store.commit('setting/' + SettingMutations.TOGGLE_APP_THEME_DARK, payload),
    toggleAppSetting: (payload) => store.commit('setting/' + SettingMutations.TOGGLE_APP_SETTING, payload),
    toggleAppNavigation: (payload) => store.commit('setting/' + SettingMutations.TOGGLE_APP_NAVIGATION, payload),
    toggleAppPermanentNavigation: (payload) => store.commit('setting/' + SettingMutations.TOGGLE_APP_PERMANENT_NAVIGATION, payload),
    toggleAppMultipleTabs: (payload) => store.commit('setting/' + SettingMutations.TOGGLE_APP_MULTIPLE_TABS, payload),
  }
}

export const useActions = () => {
  const store = useStore()

  return {
    logout: () => store.dispatch('account/' + AccountActions.LOGOUT),
  }
}
