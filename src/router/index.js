import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash-es'
import { AppPage } from '@/layout'
import { NProgress } from '@/components/NProgress'

// router.addRoutes() is deprecated and has been removed in Vue Router 4

Vue.use(VueRouter)

const lazyLoad = (path) => (resolve) => {
  NProgress.start()
  return import(`@/views/${path}.vue`)
    .then(resolve)
    .finally(NProgress.done)
}

const DEFAULT_ROUTE = {
  path: '/login',
  name: '登录',
  component: lazyLoad('login/index'),
}

const DEFAULT_FALLBACK_ROUTE = {
  path: '*',
  redirect: '/login',
}

const createRouter = () => new VueRouter({ routes: [DEFAULT_ROUTE], mode: 'hash' })
const router = createRouter()
router.addRoute(DEFAULT_FALLBACK_ROUTE)
router.afterEach((to) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.params.type || to.name}`
})

const resetRouter = () => {
  router.matcher = createRouter().matcher
  router.addRoute(DEFAULT_FALLBACK_ROUTE)
}

const buildDynamicRoutes = (menus = [], userPermissions = []) => {
  let num = 1
  const recursive = (items = []) => {
    return items.map(({ permissions = [], text, to, type, children = [], redirect, resource }) => {
      const route = {
        meta: { permissions },
        name: text,
        path: to,
      }
      switch (type) {
        case 'MENU':
          Object.assign(route, {
            component: {
              name: `RouterViewWrapper${num++}`,
              render: h => h('router-view'),
            },
            children: recursive(children),
            redirect: '/exception/404',
          })
          break
        case 'VIEW':
          if (redirect) {
            Object.assign(route, { redirect })
          } else {
            Object.assign(route, {
              component: lazyLoad(resource),
              beforeEnter (to, from, next) {
                if (!to.meta.permissions.length) {
                  return next()
                } else if (_.difference(to.meta.permissions, userPermissions).length === 0) {
                  return next()
                } else {
                  return next('/exception/401')
                }
              },
              props: true,
            })
          }
          break
        default:
          break
      }
      return route
    })
  }
  router.matcher = createRouter().matcher
  router.addRoute({
    path: '/',
    component: AppPage,
    redirect: (to) => {
      const redirectedFrom = to.redirectedFrom || to.query.redirectedFrom
      const isAvailable = redirectedFrom && redirectedFrom !== '/' && router.resolve(redirectedFrom).resolved.path !== '/exception/404'
      return {
        path: isAvailable ? redirectedFrom : '/home',
        query: _.omit(to.query, ['redirectedFrom']),
      }
    },
    children: recursive(menus),
  })
  router.addRoute({
    name: 'Exception',
    path: '/exception/:type',
    component: lazyLoad('exception/index'),
  })
  router.addRoute({
    path: '*',
    redirect: () => '/exception/404',
  })
}

export {
  DEFAULT_ROUTE as ENTRY_ROUTE,
  router as default,
  resetRouter,
  buildDynamicRoutes,
}
