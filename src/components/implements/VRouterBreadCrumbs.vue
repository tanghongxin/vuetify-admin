<template>
  <v-breadcrumbs
    class="VRouterBreadCrumbs"
    :items="breadcrumbs"
  />
</template>

<script>
export default {
  name:'VRouterBreadCrumbs',
  components: {},
  props: {},
  data: () => ({
    breadcrumbs: [],
  }),
  computed: {},
  watch: {
    '$route': {
      immediate: true,
      handler (to) {
        this.breadcrumbs = to.matched.map(route => ({
          text: route.name,
        }))
      },
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.VRouterBreadCrumbs {
  padding-left: 12px !important;
}
</style>
