import { login } from '@/api/account'
import router from '@/router'
import { buildDynamicallyRoutes, resetRouter } from '@/router'

export const AccountMutations = {
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  SET_MENUS: 'SET_MENUS',
  SET_TOKEN: 'SET_TOKEN',
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
  },
  actions: {
    async [AccountActions.LOGIN] ({ commit, dispatch }, payload) {
      const { data } = await login(payload)
      const { permissions, menus, token } = data
      commit(AccountMutations.SET_PERMISSIONS, permissions)
      commit(AccountMutations.SET_MENUS, menus)
      commit(AccountMutations.SET_TOKEN, token)
      await dispatch(AccountActions.BUILD_ROUTES)
    },
    async [AccountActions.BUILD_ROUTES] ({ state }) {
      buildDynamicallyRoutes(state.menus)
      await router.push('/home')
    },
    async [AccountActions.LOGOUT] ({ commit }) {
      commit(AccountMutations.SET_PERMISSIONS, [])
      commit(AccountMutations.SET_MENUS, [])
      commit(AccountMutations.SET_TOKEN, '')
      resetRouter()
      await router.push('/login')
    },
  },
  getters: {
    hasLoggedIn(state) {
      return !!state.token
    },
  },
}
