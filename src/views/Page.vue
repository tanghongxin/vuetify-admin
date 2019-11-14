<template>
  <fragment>
    <AppNavigation v-model="drawer" />

    <AppHeader v-model="drawer" /> 

    <AppContent />
  </fragment>
</template>

<script>
import AppHeader from '~~/layout/AppHeader'
import AppContent from '~~/layout/AppContent'
import AppNavigation from '~~/layout/AppNavigation'

export default {
  namd: 'Page',
  components: {
    AppHeader,
    AppContent,
    AppNavigation,
  },
  props: {},
  data: (vm) => ({
    drawer: vm.$vuetify.breakpoint.lgAndUp,
  }),
  computed: {},
  methods: {},
}
</script>

<style lang="scss">

</style>
