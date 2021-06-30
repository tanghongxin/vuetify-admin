import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'
import Page from '@/layout/Page.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const lazyLoad = function (path) {
  return function (resolve) {
    // TODO: 适配主题色
    nprogress.start()
    import(`@/views/${path}.vue`)
      .then(resolve)
      .finally(nprogress.done)
  }
}

const createRouter = () => new VueRouter({
  routes: [
    {
      path: '/',
      component: { render: h => h('router-view') },
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: '登陆',
          component: lazyLoad('login/index'),
        },
      ],
    },
  ],
})
const router = createRouter()

const resetRouter = () => {
  router.matcher = createRouter().matcher
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
  resetRouter()
  router.addRoutes([{
    path: '/',
    component: Page,
    redirect: '/home',
    children: [
      ...recursive(menus),
      {
        path: '/exception/:type',
        component: lazyLoad('exception/index'),
      },
      {
        path: '*',
        redirect: () => '/exception/404',
      },
    ],
  }])
}

export {
  router as default,
  resetRouter,
  buildDynamicRoutes,
}
