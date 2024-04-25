import { Plugin } from 'vue';
import store from '@/store';

const plugin: Plugin = function (app) {
  app.use(store);
};

export default plugin;
