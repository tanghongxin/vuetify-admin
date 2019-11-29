import { lazyLoad } from './utils'
import router, { resetRouter } from './index'
import store from '@/store'
import _ from 'lodash'

export default [
  {
    path: '/',
    component: { render: h => h('router-view') },
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: '登陆',
        component: lazyLoad('Login'),
      },
    ],
  },
]

// const hasPermissons = function (expectedPermissions) {
//   return _.difference(expectedPermissions, store.state.account.permissions).length === 0
// }

const recursiveBuildRoutes = function (items) {
  return items.map(item => {
    let route = {
      meta: {
        permissions: item.permissions || [],
      },
      name: item.text,
      path: item.to,
    }
    switch (item.type) {
      case 'MENU':
        route = {
          ...route,
          component: { render: h => h('router-view') },
          children: recursiveBuildRoutes(item.children || []),
          redirect: '/exception/404',
        }
        break
      case 'VIEW':
        route = {
          ...route,
          beforeEnter: (to, from, next) => {
            if (_.difference(to.meta.permissions, store.state.account.permissions).length !== 0) {
              next('/exception/403')
            } else {
              next()
            }
          },
          component: lazyLoad(item.resource),
        }
        break
      default:
        break
    }
    return route
  })
}

export const buildDynamicallyRoutes = function() {
  resetRouter()
  const dynamicallyRoutes = recursiveBuildRoutes(store.state.account.menus)
  const logicRoutes = [{
    path: '/',
    component: lazyLoad('Page'),
    redirect: '/home',
    children: [
      ...dynamicallyRoutes,
      {
        path: '*',
        redirect: '/exception/404',
      },
    ],
  }]
  router.addRoutes(logicRoutes)
}
