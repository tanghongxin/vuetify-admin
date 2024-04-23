import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { login as l } from '@/api/account';
import { buildRoutes, resetRouter } from '@/router';
import { useRuntimeStore } from './runtime';
import { LoginSuccessRes, LoginPayload } from '@/types';

const getDefaultAccount = (): LoginSuccessRes => ({
  username: '',
  token: '',
  roles: [],
  permissions: [],
  menus: [],
});

export const useAccountStore = defineStore('account', () => {
  const account = useLocalStorage<LoginSuccessRes>(
    'account',
    getDefaultAccount(),
  );

  const hasLoggedIn = computed(() => !!account.value.token);
  const username = computed(() => account.value.username);
  const menus = computed(() => account.value.menus);

  async function login(payload: LoginPayload) {
    account.value = await l(payload);
    generateRoutes();
  }

  function generateRoutes() {
    if (!hasLoggedIn.value) return;
    buildRoutes(account.value.menus);
  }

  function logout() {
    account.value = getDefaultAccount();
    useRuntimeStore().setOpenedRoutes([]);
    resetRouter();
  }

  return {
    account,
    hasLoggedIn,
    username,
    menus,
    login,
    generateRoutes,
    logout,
  };
});
