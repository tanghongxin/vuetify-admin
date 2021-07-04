export const RunTimeMutations = {
  SET_CACHED_ROUTES: 'SET_CACHED_ROUTES',
}

export default {
  namespaced: true,
  state: {
    openedRoutes: [],
  },
  mutations: {
    [RunTimeMutations.SET_CACHED_ROUTES] (state, routes = []) {
      state.openedRoutes = routes
    },
  },
}
