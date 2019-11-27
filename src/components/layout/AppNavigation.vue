<template>
  <!-- v-model="appNavigation" -->
  <v-navigation-drawer
    app
    :clipped="permanentAppNavition || $vuetify.breakpoint.lgAndUp"
    :value="permanentAppNavition || appNavigation"
    :permanent="permanentAppNavition"
    @input="e => permanentAppNavition ? '' : appNavigation = e"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-list-group
          v-if="item.type === 'MENU' && !item.hidden"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.icon"
          :append-icon="item.model ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            :to="child.to" 
          >
            <template v-if="!child.hidden">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="item.type === 'VIEW' && !item.hidden"
          :key="item.text"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name:'AppNavigation',
  components: {},
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
      const menus = [];
      (function recursive (items) {
        const children = []
        items.forEach(item => {
          let menu = {
            text: item.text,
            icon: item.icon,
            hidden: item.hidden,
            model: this.$route.path.includes(item.to),
            permission: item.permissions || [],
            to: item.to,
            type: item.type,
          }
          switch (item.type) {
            case 'MENU':
              menu = {
                ...menu,
                children: recursive.bind(this)(item.children || []),
              }
              menus.push(menu)
              break
            case 'VIEW':
              children.push(menu)
              break
            default:
              break
          }
        })
        return children
      }.bind(this))(this.$store.state.account.menus)
      this.items = menus
    },
  },
}
</script>

<style>

</style>
