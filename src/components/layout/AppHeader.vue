A<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
  }),
  computed: {
    drawer: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      },
    },
  },
  methods: {},
}
</script>

<style lang="scss">

</style>
