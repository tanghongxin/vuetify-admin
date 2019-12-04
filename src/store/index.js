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


export default new Vuex.Store({
  plugins: [vuexSession.plugin],
  modules,
  getters,
  state,
  mutations,
  actions,
})
