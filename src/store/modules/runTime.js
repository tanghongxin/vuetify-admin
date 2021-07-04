export const RunTimeMutations = {
  SET_OPENED_ROUTES: 'SET_OPENED_ROUTES',
}

export default {
  namespaced: true,
  state: {
    openedRoutes: [],
  },
  mutations: {
    [RunTimeMutations.SET_OPENED_ROUTES] (state, routes = []) {
      state.openedRoutes = routes
    },
  },
}
