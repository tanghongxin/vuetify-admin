import { defineStore } from 'pinia'
import { login } from '@/api/account'
import router from '@/router'
import { buildDynamicRoutes, resetRouter, ENTRY_ROUTE } from '@/router'
import { useLocalStorage } from '@vueuse/core'
import { useRuntimeStore } from './runtime'

export const useAccountStore = defineStore('account', {
  state: () => ({
    // FIXME: does not work on pnpm preview
    account: JSON.parse(useLocalStorage('account', null).value),
  }),
  getters: {
    hasLoggedIn: (state) => !!state.account?.token,
    username: (state) => state.account?.username || '',
    menus: (state) => state.account?.menus || [],
  },
  actions: {
    async login (payload) {
      const { data } = await login(payload)
      const {
        roles, permissions, menus, token, username,
      } = data
      useLocalStorage('account', this.account = {
        roles, permissions, token, username,
        menus: [
          {
            text: '首页',
            icon: 'home',
            hidden: false,
            to: '/home',
            type: 'VIEW',
            resource: 'home/index',
          },
          ...menus,
        ],
      })
      this.buildRoutes()
    },
    async buildRoutes () {
      if (!this.hasLoggedIn) return

      buildDynamicRoutes(this.account.menus)
      /**
       * VueRouter could not resolve the initial location without initialization.
       * Once a dynamic location was refreshed manually in browser,
       * the currentRoute's path will be resolved as '/'.
       */
      const redirectedFrom = location.hash.replace('#', '')
      const to = { path: '/' }

      if (redirectedFrom !== ENTRY_ROUTE.path) {
        to.query = {
          redirectedFrom,
        }
      }

      await router.push(to)
    },
    async logout () {
      await router.push(ENTRY_ROUTE.path)
      // this.$reset()
      useLocalStorage('account', this.account = null)
      useRuntimeStore().setOpenedRoutes([])
      resetRouter()
    },
  },
})
