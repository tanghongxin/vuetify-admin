import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

Vue.use(Vuex)

const accountStorage = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['account'],
})

const settingStorage = new VuexPersistence({
  storage: window.localStorage,
  modules: ['setting'],
})

export default new Vuex.Store({
  plugins: [
    accountStorage.plugin,
    settingStorage.plugin,
  ],
  modules,
})
