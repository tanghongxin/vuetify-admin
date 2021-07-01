
import Mock from 'mockjs-async'

Mock.mock(/api\/login/, 'post', () => ({
  token: 'ac21ebab-bddc-41a3-bef5-4ecf3325c888',
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
          permissions: ['test'],
          type: 'VIEW',
          resource: 'shop/index',
        },
      ],
    },
  ],
}))
