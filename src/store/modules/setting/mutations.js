import { ls } from '@/utils/storage'

export default {
  setAppHeaderHeight (state, val) {
    state.appHeaderHeight = val
  },
  toggleAppNavigation (state, val) {
    state.appNavigation = !!val
  },
  togglePermanentAppNavition (state, val) {
    state.permanentAppNavition = !!val
    ls.set('permanentAppNavition', val)
  },
  toggleAppSetting (state, val) {
    state.appSetting = !!val
  },
}