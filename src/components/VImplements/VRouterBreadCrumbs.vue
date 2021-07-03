<script>
export default {
  name:'VRouterBreadCrumbs',
  render () {
    return (
      <v-breadcrumbs items={this.$route.matched.map(r => ({ text: r.name }))} />
    )
  },
}
</script>

<style lang="scss">
.v-router-bread-crumbs {
  padding-left: 12px !important;
}
</style>
