import { useSessionStorage } from '@vueuse/core';

export const useRuntimeStore = defineStore('runtime', {
  state: () => ({
    openedRoutes: useSessionStorage('openedRoutes', []),
  }),
  actions: {
    setOpenedRoutes(routes = []) {
      this.openedRoutes = routes;
    },
  },
});
