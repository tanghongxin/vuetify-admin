import Page from '@/views/Page.vue'

const lazyLoad = function(path) {
  return function(resolve) {
    import(`@/views/${path}.vue`)
      .then(mod => {
        resolve(mod)
      })
      .catch(handleLazyLoadError)
  }
}

const handleLazyLoadError = function (error) {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    // toast show
  } else {
    throw error
  }
}

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
        path: 'project',
        name: '项目管理',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'list',
            name: '项目列表',
            component: lazyLoad('project/ProjectList'),
          },
        ],
      },
      {
        path: 'shop',
        name: '门店管理',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'list',
            name: '门店列表',
            component: lazyLoad('shop/ShopList'),
          },
        ],
      },
      {
        path: 'employee',
        name: '员工管理',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'list',
            name: '员工列表',
            component: lazyLoad('employee/EmployeeList'),
          },
        ],
      },
      {
        path: '/home',
        name: '主页',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      },
      {
        path: '/table',
        name: '美疗师列表',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Table.vue'),
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
      {
        path: '*',
        redirect: '/exception/404',
      },
    ],
  },
]