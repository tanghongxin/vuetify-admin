<template>
  <v-app
    id="app"
    class="fill-width fill-height"
  >
    <router-view />
    <vue-snotify />
  </v-app>
</template>

<script>
import { lazyLoad } from '@/router/utils'
import { buildDynamicallyRoutes } from '@/router/routes'

export default {
  name: 'App',
  watch: {
    '$route': {
      immediate: true,
      handler () {
        let dynamicallyRoutes = [];
        (function recursive(items) {
          const children = []
          items.forEach(item => {
            let route = {
              name: item.text,
              path: item.to,
            }
            switch (item.type) {
              case 'MENU':
                route = {
                  ...route,
                  component: { render: h => h('router-view') },
                  children: recursive(item.children || []),
                  redirect: '/exception/404',
                }
                dynamicallyRoutes.push(route)
                break
              case 'VIEW':
                route = {
                  ...route,
                  component: lazyLoad(item.resource),
                }
                children.push(route)
                break
              default:
                break
            }
          })
          return children
        })(this.$store.state.account.menus)
        buildDynamicallyRoutes(dynamicallyRoutes)
      },
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/styles/index.scss';
</style>
