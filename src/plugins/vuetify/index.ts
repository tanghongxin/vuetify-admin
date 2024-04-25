import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import 'material-design-icons-iconfont/src/material-design-icons.scss';
import { aliases, md } from 'vuetify/iconsets/md';
import { zhHans } from 'vuetify/locale';
// https://next.vuetifyjs.com/en/labs/introduction/#available-components
import * as labs from 'vuetify/labs/components';
import { Plugin } from 'vue';
import theme from './theme';

const plugin: Plugin = function (app) {
  const vuetify = createVuetify({
    components: {
      ...labs,
    },
    icons: {
      defaultSet: 'md',
      aliases,
      sets: {
        md,
      },
    },
    locale: {
      locale: 'zhHans',
      fallback: 'zhHans',
      messages: { zhHans },
    },
    theme,
  });

  app.use(vuetify);
};

export default plugin;
