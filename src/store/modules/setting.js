import { ls } from '@/utils/storage'

export const SettingMutations = {
  SET_APP_HEADER_HEIGHT: 'SET_APP_HEADER_HEIGHT',
  TOGGLE_APP_NAVIGATION: 'TOGGLE_APP_NAVIGATION',
  TOGGLE_PERMANENT_APP_NAVIGATION: 'TOGGLE_PERMANENT_APP_NAVIGATION',
  TOGGLE_SETTING: 'TOGGLE_SETTING',
}

export default {
  namespaced: true,
  state: {
    appHeaderHeight: document.body.clientWidth <= 600 ? 48 : 64,
    appNavigation: document.body.clientWidth > 1264,
    permanentAppNavigation: ls.get('permanentAppNavigation'),
    appSetting: false,
  },
  mutations: {
    [SettingMutations.SET_APP_HEADER_HEIGHT] (state, val) {
      state.appHeaderHeight = val
    },
    [SettingMutations.TOGGLE_APP_NAVIGATION](state) {
      state.appNavigation = !state.appNavigation
    },
    [SettingMutations.TOGGLE_PERMANENT_APP_NAVIGATION] (state) {
      state.permanentAppNavigation = !state.permanentAppNavigation
      ls.set('permanentAppNavigation', !state.permanentAppNavigation)
    },
    [SettingMutations.TOGGLE_SETTING] (state) {
      state.appSetting = !state.appSetting
    },
  },
}
