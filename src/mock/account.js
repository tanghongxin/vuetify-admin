
import Mock from 'mockjs-async'

Mock.mock(/api\/login/, 'post', () => ({
  token: '',
  permissions: [],
  menus: [
    {
      text: '首页',
      icon: 'home',
      hidden: false,
      to: '/home',
      permissions: [],
      type: 'VIEW',
      resource: 'home/index',
    },
    {
      text: '关于',
      icon: '',
      hidden: true,
      to: '/about',
      permissions: [],
      type: 'VIEW',
      resource: 'about/index',
    },
    {
      text: '项目管理',
      icon: 'apps',
      hidden: false,
      to: '/project',
      permissions: [],
      type: 'MENU',
      resource: '',
      children: [
        {
          text: '二级菜单',
          hidden: false,
          to: '/project',
          permissions: [],
          type: 'MENU',
          resource: '',
          children: [
            {
              text: '项目列表',
              hidden: false,
              to: '/project/list',
              permissions: [],
              type: 'VIEW',
              resource: 'project/index',
            },
          ],
        },
      ],
    },
    {
      text: '门店管理',
      icon: 'store',
      hidden: false,
      to: '/shop',
      permissions: [],
      type: 'MENU',
      resource: '',
      children: [
        {
          text: '门店列表',
          hidden: false,
          to: '/shop/list',
          permissions: [],
          type: 'VIEW',
          resource: 'shop/index',
        },
      ],
    },
    {
      text: '员工管理',
      icon: 'face',
      hidden: false,
      to: '/employee',
      permissions: [],
      type: 'MENU',
      resource: '',
      children: [
        {
          text: '员工列表',
          hidden: false,
          to: '/employee/list',
          permissions: ['test'],
          type: 'VIEW',
          resource: 'employee/index',
        },
      ],
    },
  ],
}))
