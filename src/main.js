import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

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
  .use(createPinia())
  .use(plugins)
  .use(globalComponents)
  .use(globalDirectives)
  .use(router)
  .mount('#app')

app.config.devtools = import.meta.env.MODE === 'development'
app.config.devtools = true
