export default {
  permissions: [],
  menus: [
    {
      text: '项目管理',
      icon: 'apps',
      hidden: false,
      to: '/project',
      type: 'MENU',
      resource: '',
      children: [
        {
          text: '项目列表',
          hidden: false,
          to: '/project/list',
          type: 'VIEW',
          resource: 'project/ProjectList',
        },
      ],
    },
    {
      text: '门店管理',
      icon: 'store',
      hidden: false,
      to: '/shop',
      type: 'MENU',
      resource: '',
      children: [
        {
          text: '门店列表',
          hidden: false,
          to: '/shop/list',
          type: 'VIEW',
          resource: 'shop/ShopList',
        },
      ],
    },
    {
      text: '员工管理',
      icon: 'face',
      hidden: false,
      to: '/employee',
      type: 'MENU',
      resource: '',
      children: [
        {
          text: '员工列表',
          hidden: false,
          to: '/employee/list',
          type: 'VIEW',
          resource: 'employee/EmployeeList',
        },
      ],
    },
  ],
}
