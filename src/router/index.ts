import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import {
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  FALLBACK_ROUTE,
  DEFAULT_ROUTE,
} from '@/config/routes';
import { dynamicImport } from './helper';
import { uuid } from '@rthx/utils';
import { RouteRecordRaw } from 'vue-router';

const isHash = import.meta.env.VITE_ROUTER_HISTORY === 'hash';

const router = createRouter({
  routes: [LOGIN_ROUTE],
  history: isHash ? createWebHashHistory() : createWebHistory(),
});

const buildRoutes = (routesConfig: RouteConfig[] = []) => {
  router.getRoutes().forEach((route) => {
    if (route.name !== LOGIN_ROUTE.name) {
      router.removeRoute(route.name);
    }
  });

  const cb = ({ component, meta, children, ...rest }: RouteConfig) => {
    const compName = meta.isKeepAlive ? uuid() : '';
    return {
      ...rest,
      component: component ? dynamicImport(component, compName) : '',
      meta: Object.assign({}, meta, compName ? { compName } : {}),
      children: children?.map(cb),
    } as RouteRecordRaw;
  };

  if (routesConfig.length) {
    router.addRoute({
      name: Symbol('Layout'),
      path: '/',
      component: () => import('@/layout/AppPage.vue'),
      redirect: DEFAULT_ROUTE.path,
      children: [...routesConfig.map(cb), NOT_FOUND_ROUTE, FALLBACK_ROUTE],
    });
  }

  const { hash, pathname } = window.location;
  const path = isHash ? hash.replace('#/', '') : pathname;
  const matchedRoute = router.resolve(path);

  router.push(
    matchedRoute.name !== LOGIN_ROUTE.name ? matchedRoute.fullPath : '/',
  );
};

const resetRouter = () => {
  try {
    buildRoutes();
  } catch {
    window.location.reload();
  }
};

export default router;
export { buildRoutes, resetRouter };
