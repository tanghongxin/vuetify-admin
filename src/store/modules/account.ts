import { useLocalStorage } from '@vueuse/core';
import { login as l } from '@/api/account';
import { buildRoutes, resetRouter } from '@/router';
import { LoginReq, AccountInfo } from '@/api/account/types';
import store from '@/store';

const getDefaultAccount = (): AccountInfo => ({
  username: '',
  token: '',
  roles: [],
  permissions: [],
  menus: [],
});

export const useAccountStore = defineStore('account', () => {
  const account = useLocalStorage<AccountInfo>('account', getDefaultAccount());

  const hasLoggedIn = computed(() => !!account.value.token);
  const username = computed(() => account.value.username);
  const menus = computed(() => account.value.menus);

  function $reset() {
    account.value = getDefaultAccount();
  }

  async function login(payload: LoginReq) {
    account.value = await l(payload);
  }

  function generateRoutes() {
    if (hasLoggedIn.value) {
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
    hasLoggedIn,
    username,
    menus,
    generateRoutes,
    login,
    logout,
  };
});

export const getAccountStore = () => useAccountStore(store);
