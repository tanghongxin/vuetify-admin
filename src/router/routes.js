// import store from '@/store'
import { lazyLoad } from './utils'
import router, { resetRouter } from './index'

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
  resetRouter()
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