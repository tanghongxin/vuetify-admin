import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash-es'
import AppPage from '@/layout/AppPage.vue'
import NProgress from '@/components/NProgress'

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

const createRouter = () => new VueRouter({ routes: [DEFAULT_ROUTE] })
const router = createRouter()
router.addRoute(DEFAULT_FALLBACK_ROUTE)

const resetRouter = () => {
  router.matcher = createRouter().matcher
  router.addRoute(DEFAULT_FALLBACK_ROUTE)
}

const buildDynamicRoutes = (menus = [], userPermissions = []) => {
  let num = 1
  const recursive = (items = []) => {
    return items.map(({ permissions = [], text, to, type, children, redirect, resource }) => {
      const route = {
        meta: { permissions: permissions },
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
            children: recursive(children || []),
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
    redirect: '/home',
    children: recursive(menus),
  })
  router.addRoute({
    path: '/exception/:type',
    component: lazyLoad('exception/index'),
  })
  router.addRoute({
    path: '*',
    redirect: () => '/exception/404',
  })
}

export {
  router as default,
  resetRouter,
  buildDynamicRoutes,
}
