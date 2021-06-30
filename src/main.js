import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { vuetify } from './plugins'
import bootstrap from './bootstrap'
import './components/global_components'
import './directives'
import './mock'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  vuetify,
  created: bootstrap,
  render: h => h(App),
}).$mount('#app')
