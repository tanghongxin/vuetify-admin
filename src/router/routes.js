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
    ],
  },
]