import { lazyLoad } from './utils'
import router, { resetRouter } from './index'
import store from '@/store'

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

const recursive = function (items = []) {
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
          children: recursive(item.children || []),
          redirect: '/exception/404',
        }
        break
      case 'VIEW':
        route = {
          ...route,
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
  const dynamicallyRoutes = recursive(store.state.account.menus || [])
  const logicRoutes = [{
    path: '/',
    component: lazyLoad('Page'),
    redirect: '/home',
    children: [
      ...dynamicallyRoutes,
      {
        path: '*',
        redirect: () => store.getters['account/hasLoginned'] ? '/exception/404' : '/login',
      },
    ],
  }]
  router.addRoutes(logicRoutes)
}
