import router from './index';
import { NProgress } from '@/components/NProgress';
import { getAccountStore } from '@/store/modules/account';
import { LOGIN_ROUTE } from '@/config/routes';
import { setDocumentTitle } from '@rthx/utils';

router.beforeEach((to, from, next) => {
  NProgress.start();

  const accountStore = getAccountStore();
  const isToLogin = to.name === LOGIN_ROUTE.name;

  if (!accountStore.loggedIn) {
    if (isToLogin) return next();
    return next(LOGIN_ROUTE.path);
  }

  if (isToLogin) return next('/');

  return next();
});

router.afterEach((to) => {
  let title = import.meta.env.VITE_APP_TITLE;
  if (typeof to.name === 'string' && to.name) {
    title += ` - ${to.name}`;
  }
  setDocumentTitle(title);
  NProgress.done();
});
