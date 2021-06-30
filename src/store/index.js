import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

Vue.use(Vuex)

const vuexSession = new VuexPersistence({
  storage: window.localStorage,
  modules: ['account'],
})

export default new Vuex.Store({
  plugins: [vuexSession.plugin],
  modules,
})
