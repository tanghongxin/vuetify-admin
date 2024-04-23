import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { LOGIN_ROUTE, NOT_FOUND_ROUTE, FALLBACK_ROUTE } from './routes';
import { dynamicImport } from './helper';
import { RoutesConfig } from '@/types';

const isHash = true;

const router = createRouter({
  routes: [LOGIN_ROUTE],
  history: isHash ? createWebHashHistory() : createWebHistory(),
});

const buildRoutes = (routesConfig: RoutesConfig[] = []) => {
  router.getRoutes().forEach((route) => {
    if (route.name !== LOGIN_ROUTE.name) {
      router.removeRoute(route.name);
    }
  });

  if (routesConfig.length) {
    const routes = JSON.parse(JSON.stringify(routesConfig), (k, v) => {
      return k === 'component' && !!v ? dynamicImport(v) : v;
    });
    router.addRoute({
      name: 'Layout',
      path: '/',
      component: () => import('@/layout/AppPage.vue'),
      redirect: '/home',
      children: [...routes, NOT_FOUND_ROUTE, FALLBACK_ROUTE],
    });
  }

  const { hash, pathname } = window.location;
  const path = isHash ? hash.replace('#/', '') : pathname;

  const matchedRoute = router.resolve(path);
  if (
    matchedRoute.name !== FALLBACK_ROUTE.name &&
    matchedRoute.name !== LOGIN_ROUTE.name
  ) {
    router.push(matchedRoute.fullPath);
    return;
  }
  router.push('/');
};

const resetRouter = () => buildRoutes();

export default router;
export { buildRoutes, resetRouter };
