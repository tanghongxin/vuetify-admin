import { useLocalStorage } from '@vueuse/core';
import { login as apiLogin, LoginReq, AccountInfo } from '@/api/account';
import { buildRoutes, resetRouter } from '@/router';
import store from '@/store';

const getInitialState = () =>
  ({
    username: '',
    token: '',
    roles: [],
    permissions: [],
    menus: [],
  }) as AccountInfo;

export const useAccountStore = defineStore('account', () => {
  const account = useLocalStorage('account', getInitialState());

  const loggedIn = computed(() => !!account.value.token);
  const username = computed(() => account.value.username);
  const menus = computed(() => account.value.menus);
  const permissions = computed(() => account.value.permissions);

  function $reset() {
    account.value = getInitialState();
  }

  async function login(payload: LoginReq) {
    account.value = await apiLogin(payload);
  }

  function generateRoutes() {
    if (loggedIn.value) {
      buildRoutes(account.value.menus);
    } else {
      resetRouter();
    }
  }

  function logout() {
    $reset();
  }

  watch(() => account.value.menus, generateRoutes, { immediate: true });

  return {
    account,
    loggedIn,
    username,
    menus,
    permissions,
    generateRoutes,
    login,
    logout,
  };
});

export const getAccountStore = () => useAccountStore(store);
