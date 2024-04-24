import router from './index';
import { NProgress } from '@/components/NProgress';
import { useAccountStore } from '@/store/modules/account';
import { LOGIN_ROUTE } from './routes';
import { setDocumentTitle } from '@rthx/utils';

router.beforeEach((to, from, next) => {
  NProgress.start();

  const accountStore = useAccountStore();
  const isToLogin = to.name === LOGIN_ROUTE.name;

  if (!accountStore.hasLoggedIn) {
    if (isToLogin) return next();
    return next(LOGIN_ROUTE.path);
  }

  if (isToLogin) return next('/');

  return next();
});

router.afterEach((to) => {
  setDocumentTitle(`${import.meta.env.VITE_APP_TITLE} - ${to.name as string}`);
  NProgress.done();
});
