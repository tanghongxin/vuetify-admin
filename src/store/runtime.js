import { defineStore } from 'pinia'

export const useRuntimeStore = defineStore('runtime', {
  state: () => ({
    openedRoutes: [],
  }),
  actions: {
    setOpenedRoutes (routes = []) {
      this.openedRoutes = routes
    },
  },
})
