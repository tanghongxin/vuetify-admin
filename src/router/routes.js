import store from '@/store'
import { lazyLoad } from './utils'
import router from './index'

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

export const buildDynamicallyRoutes = function(dynamicallyRoutes = []) {
  const logicRoutes = {
    path: '/',
    component: lazyLoad('Page'),
    redirect: '/home',
    beforeEnter: (to, from, next) => {
      if (store.getters['account/hasLoginned']) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      ...dynamicallyRoutes,
      {
        path: '*',
        redirect: '/exception/404',
      },
    ],
  }
  router.addRoutes([logicRoutes])
}