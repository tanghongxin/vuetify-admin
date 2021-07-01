<template>
  <v-navigation-drawer
    app
    :clipped="appPermanentNavigation || $vuetify.breakpoint.lgAndUp"
    :value="appPermanentNavigation || appNavigation"
    :permanent="appPermanentNavigation"
    @input="handleInput"
    ref="drawer"
  >
    <RecursiveMenus :items="menus" />
  </v-navigation-drawer>
</template>

<script>
import RecursiveMenus from './RecursiveMenus.vue'
import mixin from './mixin.vue'

export default {
  name:'AppNavigation',
  components: {
    RecursiveMenus,
  },
  mixins: [mixin],
  computed: {
    menus () {
      const menus = (function recursive (items) {
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
      return menus
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
    expandMenuMatchRoute (path) {
      const willOpenMenus = []
      const toBeClosedMenus = [];
      (function recursive (items) {
        items.forEach(item => {
          if (path.includes(item.to)) {
            willOpenMenus.unshift(item)
            recursive(item.children || [])
          } else {
            toBeClosedMenus.push(item)
            // recursive(item.children || [])
          }
        })
      })(this.menus)
      willOpenMenus.forEach(menu => {
        menu.expanded = true
      })
      toBeClosedMenus.forEach(menu => {
        menu.expanded = false
      })
    },
    handleInput () {
      // HACK
      if (this.$refs.drawer.isActive !== this.appNavigation) {
        this.toggleAppNavigation()
      }
    },
  },
}
</script>

<style>

</style>
