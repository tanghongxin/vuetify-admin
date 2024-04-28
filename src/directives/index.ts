import { Plugin } from 'vue';
import keepScroll from './keepScroll';

const plugin: Plugin = function (app) {
  const directives = [keepScroll];

  for (const { name, directive } of directives) {
    app.directive(name, directive);
  }
};

export default plugin;
