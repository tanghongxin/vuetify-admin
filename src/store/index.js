import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  state,
  mutations,
  actions,
})
