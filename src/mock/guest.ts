import { RoutesConfig } from '@/types';

const res = {
  username: 'guest',
  token: 'ac21ebab-bddc-41a3-bef5-4ecf3325c888',
  roles: [],
  permissions: [],
  menus: [
    {
      name: '首页',
      icon: 'home',
      path: '/home',
      type: 'VIEW',
      component: 'home/index',
      meta: {},
    },
    {
      name: '项目管理',
      icon: 'apps',
      path: '/project',
      type: 'MENU',
      meta: {},
      component: '',
      children: [
        {
          name: '项目列表',
          path: '/project/list',
          type: 'VIEW',
          component: 'project/index',
          meta: {
            isKeepAlive: true,
          },
        },
      ],
    },
    {
      name: '404',
      icon: 'priority_high',
      path: '404_test',
      redirect: '/exception/404',
      type: 'VIEW',
      component: '',
      meta: {},
    },
  ] as RoutesConfig[],
};

export default res;
