import { login } from '@/api/account'
import router from '@/router'
import { buildDynamicRoutes, resetRouter, ENTRY_ROUTE } from '@/router'
import { RuntimeMutations } from './runtime'

export const AccountMutations = {
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  SET_MENUS: 'SET_MENUS',
  SET_TOKEN: 'SET_TOKEN',
  SET_USER_NAME: 'SET_USER_NAME',
}

export const AccountActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  BUILD_ROUTES: 'BUILD_ROUTES',
}

export default {
  namespaced: true,
  state: {
    permissions: [],
    menus: [],
    token: '',
    username: '',
  },
  mutations: {
    [AccountMutations.SET_PERMISSIONS] (state, permissions = []) {
      state.permissions = permissions
    },
    [AccountMutations.SET_MENUS] (state, menus = []) {
      state.menus = menus
    },
    [AccountMutations.SET_TOKEN] (state, token = '') {
      state.token = token
    },
    [AccountMutations.SET_USER_NAME] (state, username = '') {
      state.username = username
    },
  },
  actions: {
    async [AccountActions.LOGIN] ({ commit, dispatch }, payload) {
      const { data } = await login(payload)
      const { permissions, menus, token, username } = data
      commit(AccountMutations.SET_PERMISSIONS, permissions)
      commit(AccountMutations.SET_MENUS, menus)
      commit(AccountMutations.SET_TOKEN, token)
      commit(AccountMutations.SET_USER_NAME, username)
      await dispatch(AccountActions.BUILD_ROUTES)
    },
    async [AccountActions.BUILD_ROUTES] ({ state, getters }) {
      if (getters.hasLoggedIn) {
        buildDynamicRoutes(state.menus)
        /**
         * VueRouter could not resolve the initial location without initialization.
         * Once a dynamic location was refreshed manually in browser,
         * the currentRoute's path will be resolved as '/'.
         */
        const redirectedFrom = location.hash.replace('#', '')
        const to = { path: '/' }

        if (redirectedFrom !== ENTRY_ROUTE.path) {
          to.query = {
            redirectedFrom,
          }
        }

        await router.push(to)
      }
    },
    async [AccountActions.LOGOUT] ({ commit }) {
      await router.push(ENTRY_ROUTE.path)
      commit(AccountMutations.SET_PERMISSIONS, [])
      commit(AccountMutations.SET_MENUS, [])
      commit(AccountMutations.SET_TOKEN, '')
      commit(AccountMutations.SET_USER_NAME, '')
      commit(`runtime/${RuntimeMutations.SET_OPENED_ROUTES}`, [], { root: true })
      resetRouter()
    },
  },
  getters: {
    hasLoggedIn (state) {
      return !!state.token
    },
  },
}
