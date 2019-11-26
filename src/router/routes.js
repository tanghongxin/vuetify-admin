import store from '@/store'
import dynamicallyRoutes from './dynamicallyRoutes'
import { lazyLoad } from './utils'

export default [
  {
    path: '/',
    component: { render: h => h('router-view') },
    redirect: '/home',
    children: [
      {
        path: '/login',
        name: '登陆',
        component: lazyLoad('Login'),
      },
    ],
  },
  {
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
        path: '/home',
        name: 'home',
        component: lazyLoad('Home'),
      },
      {
        path: '/about',
        name: 'about',
        component: lazyLoad('About'),
      },
      {
        path: '/exception',
        name: '异常',
        redirect: '/exception/404',
        component: { render: h => h('router-view') },
        children: [
          {
            path: '401',
            name: '401',
            component: lazyLoad('exception/401'),
          },
          {
            path: '403',
            name: '403',
            component: lazyLoad('exception/403'),
          },
          {
            path: '404',
            name: '404',
            component: lazyLoad('exception/404'),
          },
          {
            path: '500',
            name: '500',
            component: lazyLoad('exception/500'),
          },
        ],
      },
      {
        path: '*',
        redirect: '/exception/404',
      },
    ],
  },
]
