import { lazyImport } from '@/router/helper';

export const LOGIN_ROUTE = {
  name: '登录',
  path: '/login',
  component: lazyImport('login/index'),
};

export const NOT_FOUND_ROUTE = {
  name: '404',
  path: '/exception/404',
  component: lazyImport('exception/index'),
};

export const FALLBACK_ROUTE = {
  name: 'fallback',
  path: '/:pathMatch(.*)*',
  redirect: () => NOT_FOUND_ROUTE.path,
};

export const DEFAULT_ROUTE = {
  name: '首页',
  path: '/home',
  component: lazyImport('home/index'),
};
