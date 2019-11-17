<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="primary"
    dark
    :flat="$vuetify.breakpoint.xsOnly"
    :height="appHeaderHeight"
  >
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <v-app-bar-nav-icon @click.stop="appNavigation = !appNavigation" />
      <span class="hidden-sm-and-down">Google Contacts</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    />
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn
      icon
      large
    >
      <v-avatar
        size="32px"
        item
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name:'AppHeader',
  components: {},
  data: () => ({
  }),
  computed: {
    appHeaderHeight: {
      get () {
        return this.$store.state.setting.appHeaderHeight
      },
    },
    appNavigation: {
      get () {
        return this.$store.state.setting.appNavigation
      },
      set (v) {
        this.$store.commit('setting/setAppNavigation', v)
      },
    },
  },
  methods: {},
}
</script>

<style lang="scss">

</style>
