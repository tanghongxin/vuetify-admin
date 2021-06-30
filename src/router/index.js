import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'

Vue.use(VueRouter)

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
          component: () => import('@/views/login/index.vue'),
        },
      ],
    },
  ],
})
const router = createRouter()

const resetRouter = () => {
  router.matcher = createRouter().matcher
}

const recursiveBuildRoutes = function (items = [], permissions) {
  return items.map(item => {
    const route = {
      meta: {
        permissions: item.permissions || [],
      },
      name: item.text,
      path: item.to,
      props: true,
    }
    switch (item.type) {
      case 'MENU':
        Object.assign(route, {
          component: { render: h => h('router-view') },
          children: recursiveBuildRoutes(item.children || []),
          redirect: '/exception/404',
        })
        break
      case 'VIEW':
        Object.assign(route, {
          component: () => import(`@/views/${item.resource}.vue`),
          beforeEnter(to, from, next) {
            if (!to.meta.permissions || !to.meta.permissions.length) {
              return next()
            } else if (_.difference(to.meta.permissions, permissions).length === 0) {
              return next()
            } else {
              return next('/exception/401')
            }
          },
        })
        break
      default:
        break
    }
    return route
  })
}

const buildDynamicallyRoutes = function (menus = [], permissions = []) {
  resetRouter()
  router.addRoutes([{
    path: '/',
    component: () => import('@/layout/Page.vue'),
    redirect: '/home',
    children: [
      ...recursiveBuildRoutes(menus, permissions),
      {
        path: '/exception/:type',
        component: () => import('@/views/exception/index.vue'),
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
  buildDynamicallyRoutes,
}
