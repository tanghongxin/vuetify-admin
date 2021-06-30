import '@babel/polyfill'
import './plugins'
import './directives'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/global_components'
import './mock'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
