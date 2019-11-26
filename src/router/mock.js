export default [
  {
    text: '项目管理',
    icon: 'apps',
    model: false,
    to: '/project',
    type: 'MENU',
    resource: '',
    children: [
      {
        text: '项目列表',
        model: false,
        to: '/project/list',
        type: 'VIEW',
        resource: 'project/ProjectList',
      },
    ],
  },
  {
    text: '门店管理',
    icon: 'store',
    model: false,
    to: '/shop',
    type: 'MENU',
    resource: '',
    children: [
      {
        text: '门店列表',
        model: false,
        to: '/shop/list',
        type: 'VIEW',
        resource: 'shop/ShopList',
      },
    ],
  },
  {
    text: '员工管理',
    icon: 'face',
    model: false,
    to: '/employee',
    type: 'MENU',
    resource: '',
    children: [
      {
        text: '员工列表',
        to: '/employee/list',
        type: 'VIEW',
        resource: 'employee/EmployeeList',
      },
    ],
  },
]
