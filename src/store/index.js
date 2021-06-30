import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import account from './modules/account'
import setting from './modules/setting'

Vue.use(Vuex)

const vuexSession = new VuexPersistence({
  storage: window.localStorage,
  modules: ['account'],
})

export default new Vuex.Store({
  plugins: [vuexSession.plugin],
  modules: {
    account,
    setting,
  },
})
