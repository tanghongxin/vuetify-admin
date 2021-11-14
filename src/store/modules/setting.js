export const SettingMutations = {
  SET_APP_HEADER_HEIGHT: 'SET_APP_HEADER_HEIGHT',
  SET_APP_PRIMARY_COLOR: 'SET_APP_PRIMARY_COLOR',
  TOGGLE_APP_NAVIGATION: 'TOGGLE_APP_NAVIGATION',
  TOGGLE_APP_PERMANENT_NAVIGATION: 'TOGGLE_APP_PERMANENT_NAVIGATION',
  TOGGLE_APP_SETTING: 'TOGGLE_APP_SETTING',
  TOGGLE_APP_THEME_DARK: 'TOGGLE_APP_THEME_DARK',
  TOGGLE_APP_MULTIPLE_TABS: 'TOGGLE_APP_MULTIPLE_TABS',
}

export const SettingActions = {
  TOGGLE_APP_MULTIPLE_TABS: 'TOGGLE_APP_MULTIPLE_TABS',
}

export default {
  namespaced: true,
  state: {
    appHeaderHeight: document.body.clientWidth <= 600 ? 48 : 56,
    appNavigation: document.body.clientWidth > 1264,
    appPermanentNavigation: false,
    appPrimaryColor: '#00bcd4',
    appThemeDark: false,
    appSetting: false,
    appMultipleTabs: true,
  },
  mutations: {
    [SettingMutations.SET_APP_HEADER_HEIGHT] (state, payload) {
      state.appHeaderHeight = payload
    },
    [SettingMutations.SET_APP_PRIMARY_COLOR] (state, payload) {
      state.appPrimaryColor = payload
    },
    [SettingMutations.TOGGLE_APP_THEME_DARK] (state) {
      state.appThemeDark = !state.appThemeDark
    },
    [SettingMutations.TOGGLE_APP_NAVIGATION] (state) {
      state.appNavigation = !state.appNavigation
    },
    [SettingMutations.TOGGLE_APP_PERMANENT_NAVIGATION] (state) {
      state.appPermanentNavigation = !state.appPermanentNavigation
    },
    [SettingMutations.TOGGLE_APP_SETTING] (state) {
      state.appSetting = !state.appSetting
    },
    [SettingMutations.TOGGLE_APP_MULTIPLE_TABS] (state) {
      state.appMultipleTabs = !state.appMultipleTabs
    },
  },
}
