import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import plugins from './plugins'
import setup from './setup'
import globalComponents from './components/global_components'
import globalDirectives from './directives'
import './mock'

const app = createApp({
  setup,
  render: () => h(App),
})

app
  .use(plugins)
  .use(globalComponents)
  .use(globalDirectives)
  .use(store)
  .use(router)
  .mount('#app')

app.config.devtools = process.env.NODE_ENV === 'development'
