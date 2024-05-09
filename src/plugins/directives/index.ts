import { Plugin } from 'vue';
import vKeepScroll from 'v-keep-scroll';

const plugin: Plugin = function (app) {
  app.use(vKeepScroll);
};

export default plugin;
