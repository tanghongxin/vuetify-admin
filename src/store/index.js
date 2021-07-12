import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

Vue.use(Vuex)

const persistence = new VuexPersistence({
  key: 'VuetifyBoilerplateVuex',
  storage: window.localStorage,
  reducer: ({
    account,
    setting: { appPermanentNavigation, appPrimaryColor, appThemeDark, appMultipleTabs },
  }) => ({
    account,
    setting: { appPermanentNavigation, appPrimaryColor, appThemeDark, appMultipleTabs },
  }),
})

export default new Vuex.Store({
  plugins: [
    persistence.plugin,
  ],
  modules,
})
