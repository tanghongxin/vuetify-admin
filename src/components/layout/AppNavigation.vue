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
      immediate: true,
      handler (to, from = {}) {
        if (to.path !== from.path) {
          this.buildMenus()
        }
      },
    },
  },
  methods: {
    buildMenus () {
      this.menus = (function recursive (items) {
        return items.map(item => {
          let menu = {
            ...item,
            model: this.$route.path.includes(item.to),
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
  },
}
</script>

<style>

</style>
