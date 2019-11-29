import Vue from 'vue'
import VueRouter from 'vue-router'
import routes, { buildDynamicallyRoutes } from './routes'
import store from '@/store'
import _ from 'lodash'

Vue.use(VueRouter)
const createRouter = () => new VueRouter({
  routes: routes,
})

const router = createRouter()
export default router
export const resetRouter = () => (router.matcher = createRouter().matcher)

const hasPermissions = function (expectedPermissions = []) {
  return _.difference(expectedPermissions, store.state.account.permissions).length === 0
}

const globalInterceptor = function (to, from, next) {
  if (store.getters['account/hasLoginned']) {
    hasPermissions(to.meta.permissions) ? next() : next('/exception/403')
  } else if (to.path === '/login') {
    next()
  } else {
    next('/login')
  }
}

buildDynamicallyRoutes()
router.beforeEach(globalInterceptor)
