import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'
import Page from '@/layout/Page.vue'
import NProgress from '@/components/NProgress'

Vue.use(VueRouter)

const lazyLoad = (path) => (resolve) => {
  NProgress.start()
  return import(`@/views/${path}.vue`)
    .then(resolve)
    .finally(NProgress.done)
}

const DEFAULT_ROUTES = [
  {
    path: '/login',
    name: '登陆',
    component: lazyLoad('login/index'),
  },
  {
    path: '/exception/:type',
    component: lazyLoad('exception/index'),
  },
]

const FALLBACK_ROUTES = [
  {
    path: '*',
    redirect: () => '/exception/404',
  },
]

const createRouter = () => new VueRouter({ routes: DEFAULT_ROUTES })
const router = createRouter()
router.addRoutes(FALLBACK_ROUTES)

const resetRouter = () => {
  router.matcher = createRouter().matcher
  router.addRoutes(FALLBACK_ROUTES)
}

const buildDynamicRoutes = (menus = [], permissions = []) => {
  const recursive = (items = []) => {
    return items.map(item => {
      const route = {
        meta: {
          permissions: item.permissions || [],
        },
        name: item.text,
        path: item.to,
      }
      switch (item.type) {
        case 'MENU':
          Object.assign(route, {
            component: { render: h => h('router-view') },
            children: recursive(item.children || []),
            redirect: '/exception/404',
          })
          break
        case 'VIEW':
          Object.assign(route, {
            component: lazyLoad(item.resource),
            beforeEnter(to, from, next) {
              if (!to.meta.permissions || !to.meta.permissions.length) {
                return next()
              } else if (_.difference(to.meta.permissions, permissions).length === 0) {
                return next()
              } else {
                return next('/exception/401')
              }
            },
            props: true,
          })
          break
        default:
          break
      }
      return route
    })
  }
  router.matcher = createRouter().matcher
  router.addRoutes([
    {
      path: '/',
      component: Page,
      redirect: '/home',
      children: recursive(menus),
    },
    ...FALLBACK_ROUTES,
  ])
}

export {
  router as default,
  resetRouter,
  buildDynamicRoutes,
}
