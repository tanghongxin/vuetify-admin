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
      return this.recursive(this.$store.state.account.menus)
    },
  },
  methods: {
    recursive (items) {
      return items.map(item => {
        const menu = {
          hidden: !!item.hidden,
          icon: item.icon || '',
          permissions: item.permissions || [],
          text: item.text || '',
          to: item.to || '',
          type: item.type || '',
        }
        switch (item.type) {
          case 'MENU':
            Object.assign(menu, {
              children: this.recursive(item.children || []),
            })
            break
          case 'VIEW':
          default:
            break
        }

        return menu
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
