import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['account'],
})

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['setting'],
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin, vuexSession.plugin],
  modules,
  getters,
  state,
  mutations,
  actions,
})
