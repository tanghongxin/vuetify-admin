import { dynamicImport } from './helper';

export const LOGIN_ROUTE = {
  name: '登录',
  path: '/login',
  component: dynamicImport('login/index'),
};

export const NOT_FOUND_ROUTE = {
  name: '404',
  path: '/exception/404',
  component: dynamicImport('exception/index'),
};

export const FALLBACK_ROUTE = {
  name: 'fallback',
  path: '/:pathMatch(.*)*',
  redirect: () => NOT_FOUND_ROUTE.path,
};

export const DEFAULT_ROUTE = {
  name: '首页',
  path: '/home',
  component: dynamicImport('home/index'),
};
