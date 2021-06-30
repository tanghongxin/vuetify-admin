<template>
  <v-app-bar
    :clipped-left="permanentAppNavigation ? true : $vuetify.breakpoint.lgAndUp"
    app
    color="primary darken-2"
    dark
    flat
    :height="appHeaderHeight"
  >
    <!-- :flat="$vuetify.breakpoint.xsOnly" -->
    <v-toolbar-title
      style="width: 300px;"
      class="ml-0 pl-4"
    >
      <v-app-bar-nav-icon
        v-show="!permanentAppNavigation"
        @click.stop="appNavigation = !appNavigation"
      />
      <!-- class="hidden-sm-and-down" -->
      <span>若石管理系统</span>
    </v-toolbar-title>
    <!-- <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    /> -->
    <v-spacer />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="white"
          v-on="on"
          @click="appSetting = !appSetting"
        >
          <v-icon
            size="20"
            v-text="'settings'"
          />
        </v-btn>
      </template>
      个性化设置
    </v-tooltip>
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
        this.$store.commit('setting/toggleAppNavigation', v)
      },
    },
    appSetting: {
      get () {
        return this.$store.state.setting.appSetting
      },
      set (v) {
        this.$store.commit('setting/toggleAppSetting', v)
      },
    },
    permanentAppNavigation: {
      get () {
        return this.$store.state.setting.permanentAppNavigation
      },
    },
  },
  methods: {},
}
</script>

<style lang="scss">

</style>
