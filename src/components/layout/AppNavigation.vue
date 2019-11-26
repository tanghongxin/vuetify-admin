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
        <v-row
          v-if="item.heading"
          :key="item.heading"
          align="center"
        >
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col
            cols="6"
            class="text-center"
          >
            <a
              href="#!"
              class="body-2 black--text"
            >EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
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
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
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
            model: this.$route.path.includes(item.to),
            to: item.to,
          }
          switch (item.type) {
            case 'MENU':
              menu = {
                ...menu,
                children: recursive.bind(this)(item.children || []),
              }
              !menu.hidden && menus.push(menu)
              break
            case 'VIEW':
              !menu.hidden && children.push(menu)
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
