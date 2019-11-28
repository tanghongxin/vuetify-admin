<template>
  <v-navigation-drawer
    app
    :clipped="permanentAppNavition || $vuetify.breakpoint.lgAndUp"
    :value="permanentAppNavition || appNavigation"
    :permanent="permanentAppNavition"
    @input="e => permanentAppNavition ? '' : appNavigation = e"
  >
    <RecursiveMenus :items="menus" />
  </v-navigation-drawer>
</template>

<script>
import RecursiveMenus from './RecursiveMenus'

export default {
  name:'AppNavigation',
  components: {
    RecursiveMenus,
  },
  data: () => ({
    menus: [],
  }),
  computed: {
    appNavigation: {
      get () {
        return this.$store.state.setting.appNavigation
      },
      set (v) {
        this.$store.commit('setting/toggleAppNavigation', v)
      },
    },
    permanentAppNavition: {
      get () {
        return this.$store.state.setting.permanentAppNavition
      },
    },
  },
  watch: {
    '$route': {
      immediate: false,
      handler (to, from = {}) {
        to.path !== from.path && this.expandMenuMatchRoute(to.path)
      },
    },
  },
  methods: {
    buildMenus () {
      this.menus = (function recursive (items) {
        return items.map(item => {
          let menu = {
            ...item,
            expanded: this.$route.path.includes(item.to),
          }
          switch (item.type) {
            case 'MENU':
              menu = {
                ...menu,
                children: recursive.call(this, item.children || []),
              }
              break
            case 'VIEW':
              break
            default:
              break
          }
          return menu
        })
      }.bind(this))(this.$store.state.account.menus)
    },
    expandMenuMatchRoute (path) {
      // 需要展开的（子）菜单
      const menus = [];
      // 由外到内递归遍历
      (function recursive (items) {
        items.some(item => {
          if (path.includes(item.to)) {
            menus.unshift(item)
            recursive(item.children || [])
          }
        })
      })(this.menus)
      // 由内到外展开：保证当最外层展开时，动画一步到位
      menus.forEach(menu => {
        menu.expanded = true
      })
    },
  },
  created () {
    this.buildMenus()
  },
}
</script>

<style>

</style>
