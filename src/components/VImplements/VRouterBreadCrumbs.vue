<template>
  <v-breadcrumbs
    class="v-router-bread-crumns"
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
.v-router-bread-crumns {
  padding-left: 12px !important;
}
</style>
