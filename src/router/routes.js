import Page from '@/views/Page.vue'

export default [
  {
    path :'/',
    redirect: '/home',
  },
  {
    path: '/',
    component: Page,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
    ],
  },
]