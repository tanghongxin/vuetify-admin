import { ls } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    appHeaderHeight: window.document.body.clientWidth <= 600 ? 48 : 64,
    appNavigation: window.document.body.clientWidth > 1264,
    permanentAppNavigation: ls.get('permanentAppNavigation'),
    appSetting: false,
  },
  mutations: {
    setAppHeaderHeight (state, val) {
      state.appHeaderHeight = val
    },
    toggleAppNavigation (state, val) {
      state.appNavigation = !!val
    },
    togglePermanentAppNavigation (state, val) {
      state.permanentAppNavigation = !!val
      ls.set('permanentAppNavigation', val)
    },
    toggleAppSetting (state, val) {
      state.appSetting = !!val
    },
  },
}
