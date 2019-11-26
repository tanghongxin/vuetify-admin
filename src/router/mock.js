export default [
  {
    text: '项目管理',
    to: '/project',
    type: 'MENU',
    resource: '',
    children: [
      {
        text: '项目列表',
        to: '/project/list',
        type: 'VIEW',
        resource: 'project/ProjectList',
      },
    ],
  },
  {
    text: '门店管理',
    to: '/shop',
    type: 'MENU',
    resource: '',
    children: [
      {
        text: '门店列表',
        to: '/shop/list',
        type: 'VIEW',
        resource: 'shop/ShopList',
      },
    ],
  },
  {
    text: '员工管理',
    to: '/employee',
    type: 'MENU',
    resource: '',
    children: [
      {
        text: '员工列表',
        to: '/employee/list' ,
        type: 'VIEW',
        resource: 'employee/EmployeeList',
      },
    ],
  },
]
