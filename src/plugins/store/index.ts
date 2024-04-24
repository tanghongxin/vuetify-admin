import type { Plugin } from 'vue';
import store from '@/store';
import { useAccountStore } from '@/store/modules/account';

const plugin: Plugin = function (app) {
  app.use(store);

  const accountStore = useAccountStore();
  accountStore.generateRoutes();
};

export default plugin;
