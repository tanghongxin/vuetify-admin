import Page from '@/views/Page.vue'

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: Page,
    children: [
      {
        path: '/home',
        name: '主页',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      },
      {
        path: '/about',
        name: '关于',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: '/menu-test',
        name: '菜单',
        redirect: '/home',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'submenu',
            name: '子菜单',
            component: () =>
              import(/* webpackChunkName: "about" */ '../views/Home.vue'),
          },
        ],
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
            component: () => import('../views/exception/401.vue'),
          },
          {
            path: '403',
            name: '403',
            component: () => import('../views/exception/403.vue'),
          },
          {
            path: '404',
            name: '404',
            component: () => import('../views/exception/404.vue'),
          },
          {
            path: '500',
            name: '500',
            component: () => import('../views/exception/500.vue'),
          },
        ],
      },
    ],
  },
]