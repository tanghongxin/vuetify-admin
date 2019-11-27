<template>
  <v-navigation-drawer
    app
    :clipped="permanentAppNavition || $vuetify.breakpoint.lgAndUp"
    :value="permanentAppNavition || appNavigation"
    :permanent="permanentAppNavition"
    @input="e => permanentAppNavition ? '' : appNavigation = e"
  >
    <RecursiveMenus :items="items" />
  </v-navigation-drawer>
</template>

<script>
import RecursiveMenus from './RecursiveMenus'
import _ from 'lodash'

export default {
  name:'AppNavigation',
  components: {
    RecursiveMenus,
  },
  data: () => ({
    items: [],
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
    menus: {
      get () {
        return this.$store.state.account.menus
      },
    },
    flatMenus: {
      get () {
        const result = [];
        (function recursive (items, parent) {
          items.forEach(item => {
            item.parent = parent
            result.push(item)
            item.children && recursive.bind(this)(item.children, item)
          })
        }.bind(this))(this.menus)
        return result
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
      // FIXME: animation shake
      _.forEachRight(this.flatMenus, menu => {
        this.$set(menu, 'model', this.$route.path.includes(menu.to))
      })
      // this.flatMenus.forEach(menu => {
      //   this.$set(menu, 'model', this.$route.path.includes(menu.to))
      // })
      this.items = this.menus
    },
  },
}
</script>

<style>

</style>
