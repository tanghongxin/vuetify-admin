import { ls } from '@/utils/storage'

export const SettingMutations = {
  SET_APP_HEADER_HEIGHT: 'SET_APP_HEADER_HEIGHT',
  TOGGLE_APP_NAVIGATION: 'TOGGLE_APP_NAVIGATION',
  TOGGLE_APP_PERMANENT_NAVIGATION: 'TOGGLE_APP_PERMANENT_NAVIGATION',
  TOGGLE_APP_SETTING: 'TOGGLE_APP_SETTING',
}

export default {
  namespaced: true,
  state: {
    appHeaderHeight: document.body.clientWidth <= 600 ? 48 : 64,
    appNavigation: document.body.clientWidth > 1264,
    appPermanentNavigation: ls.get('appPermanentNavigation'),
    appSetting: false,
  },
  mutations: {
    [SettingMutations.SET_APP_HEADER_HEIGHT] (state, val) {
      state.appHeaderHeight = val
    },
    [SettingMutations.TOGGLE_APP_NAVIGATION](state) {
      state.appNavigation = !state.appNavigation
    },
    [SettingMutations.TOGGLE_APP_PERMANENT_NAVIGATION] (state) {
      state.appPermanentNavigation = !state.appPermanentNavigation
      ls.set('appPermanentNavigation', !state.appPermanentNavigation)
    },
    [SettingMutations.TOGGLE_APP_SETTING] (state) {
      state.appSetting = !state.appSetting
    },
  },
}
