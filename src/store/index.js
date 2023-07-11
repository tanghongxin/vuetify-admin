import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

// TODO: upgrade
const persistence = new VuexPersistence({
  key: 'VuetifyBoilerplateVuex',
  storage: window.localStorage,
  reducer: ({
    account,
    setting: { appPermanentNavigation, appTheme, appThemeDark, appMultipleTabs },
  }) => ({
    account,
    setting: { appPermanentNavigation, appTheme, appThemeDark, appMultipleTabs },
  }),
})

export default createStore({
  plugins: [
    persistence.plugin,
  ],
  modules,
})
