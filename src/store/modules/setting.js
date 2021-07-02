export const SettingMutations = {
  SET_APP_HEADER_HEIGHT: 'SET_APP_HEADER_HEIGHT',
  SET_APP_PRIMARY_COLOR: 'SET_APP_PRIMARY_COLOR',
  TOGGLE_APP_NAVIGATION: 'TOGGLE_APP_NAVIGATION',
  TOGGLE_APP_PERMANENT_NAVIGATION: 'TOGGLE_APP_PERMANENT_NAVIGATION',
  TOGGLE_APP_SETTING: 'TOGGLE_APP_SETTING',
}

export default {
  namespaced: true,
  state: {
    appHeaderHeight: document.body.clientWidth <= 600 ? 48 : 64,
    appNavigation: document.body.clientWidth > 1264,
    appPrimaryColor: '#1976D2',
    appSetting: false,
  },
  mutations: {
    [SettingMutations.SET_APP_HEADER_HEIGHT] (state, payload) {
      state.appHeaderHeight = payload
    },
    [SettingMutations.SET_APP_PRIMARY_COLOR] (state, payload) {
      state.appPrimaryColor = payload
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
  },
}
