import type { Plugin } from 'vue';
import router from '@/router';
import '@/router/permission';

const plugin: Plugin = function (app) {
  app.use(router);
};

export default plugin;
