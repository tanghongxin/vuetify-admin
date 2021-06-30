<template>
  <v-navigation-drawer
    app
    :clipped="permanentAppNavigation || $vuetify.breakpoint.lgAndUp"
    :value="permanentAppNavigation || appNavigation"
    :permanent="permanentAppNavigation"
    @input="e => permanentAppNavigation ? '' : appNavigation = e"
  >
    <RecursiveMenus :items="menus" />
  </v-navigation-drawer>
</template>

<script>
import RecursiveMenus from './RecursiveMenus.vue'

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
    permanentAppNavigation: {
      get () {
        return this.$store.state.setting.permanentAppNavigation
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
            // ...item,
            hidden: !!item.hidden,
            icon: item.icon || '',
            permissions: item.permissions || [],
            text: item.text || '',
            to: item.to || '',
            type: item.type || '',
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
      const toBeOpendMenus = []
      const toBeClosedMenus = [];
      (function recursive (items) {
        items.forEach(item => {
          if (path.includes(item.to)) {
            toBeOpendMenus.unshift(item)
            recursive(item.children || [])
          } else {
            toBeClosedMenus.push(item)
            // recursive(item.children || [])
          }
        })
      })(this.menus)
      toBeOpendMenus.forEach(menu => {
        menu.expanded = true
      })
      toBeClosedMenus.forEach(menu => {
        menu.expanded = false
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
