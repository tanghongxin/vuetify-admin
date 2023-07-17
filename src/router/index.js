import { createRouter, createWebHashHistory } from 'vue-router'
import _ from 'lodash-es'
import { AppPage } from '@/layout'
import { NProgress } from '@/components/NProgress'
import Page from './Page.vue'
const modules = import.meta.glob('../views/**/*.vue')

const lazyLoad = (path) => (resolve) => {
  NProgress.start()
  return modules[`../views/${path}.vue`]()
    .then(resolve)
    .finally(NProgress.done)
}

const ENTRY_ROUTE = {
  path: '/login',
  name: '登录',
  component: lazyLoad('login/index'),
}

const DEFAULT_FALLBACK_ROUTE = {
  name: 'defaultFallback',
  path: '/:pathMatch(.*)*',
  redirect: ENTRY_ROUTE.path,
}

const NOT_FOUND = {
  name: '404',
  path: '/exception/404',
  component: lazyLoad('exception/index'),
}

const FALLBACK_ROUTE = {
  name: 'fallback',
  path: '/:pathMatch(.*)*',
  redirect: () => NOT_FOUND.path,
}

const router = createRouter({ routes: [ENTRY_ROUTE], history: createWebHashHistory() })
router.addRoute(DEFAULT_FALLBACK_ROUTE)
router.beforeEach(() => {
})
router.afterEach((to) => {
  document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.params.type || to.name}`
})

const resetRouter = () => {
  router.getRoutes().forEach(route => {
    if (route.name !== ENTRY_ROUTE.name) {
      router.removeRoute(route.name)
    }
  })
  router.addRoute(DEFAULT_FALLBACK_ROUTE)
}

const buildDynamicRoutes = (menus = []) => {
  let num = 1
  const recursive = (items = []) => {
    return items.map(({ text, to, type, children = [], redirect, resource }) => {
      const route = {
        meta: {},
        name: text,
        path: to,
      }
      switch (type) {
        case 'MENU':
          Object.assign(route, {
            component: {
              ...Page,
              name: `RouterViewWrapper${num++}`,
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
  router.removeRoute(DEFAULT_FALLBACK_ROUTE.name)
  router.addRoute({
    path: '/',
    component: AppPage,
    redirect: (to) => {
      const redirectedFrom = to.redirectedFrom || to.query.redirectedFrom
      const isAvailable = redirectedFrom && redirectedFrom !== '/' && router.resolve(redirectedFrom).path !== NOT_FOUND.path
      return {
        path: isAvailable ? redirectedFrom : '/home',
        query: _.omit(to.query, ['redirectedFrom']),
      }
    },
    children: [
      ...recursive(menus),
      NOT_FOUND,
    ],
  })
  router.addRoute(FALLBACK_ROUTE)
}

export {
  ENTRY_ROUTE,
  router as default,
  resetRouter,
  buildDynamicRoutes,
}
