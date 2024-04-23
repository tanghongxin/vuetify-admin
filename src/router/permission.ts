import router from './index';
import { NProgress } from '@/components/NProgress';
import { useAccountStore } from '@/store/modules/account';
import { LOGIN_ROUTE } from './routes';

router.beforeEach((to, from, next) => {
  NProgress.start();
  const accountStore = useAccountStore();
  if (!accountStore.hasLoggedIn) {
    if (to.name === LOGIN_ROUTE.name) return next();
    return next(LOGIN_ROUTE.path);
  }

  if (to.name === LOGIN_ROUTE.name) {
    return next('/');
  }

  return next();
});

router.afterEach((to) => {
  document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.name as string}`;
  NProgress.done();
});
