import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)
const createRouter = () => new VueRouter({
  routes: routes,
})
const router = createRouter()
router.beforeEach((to, from, next) => {
  (!store.getters['account/hasLoginned'] && to.path !== '/login') ? next('/login') : next()
})
export default router
export const resetRouter = () => (router.matcher = createRouter().matcher)