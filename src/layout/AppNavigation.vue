<script>
import RecursiveMenus from './LayoutRecursiveMenus.vue'
import mixin from './LayoutMixin.vue'

export default {
  name: 'AppNavigation',
  mixins: [mixin],
  render () {
    const {
      $store, $vuetify, appPermanentNavigation,
      appNavigation, $refs, toggleAppNavigation,
    } = this
    return (
      <v-navigation-drawer
        app
        clipped={appPermanentNavigation || $vuetify.breakpoint.lgAndUp}
        value={appPermanentNavigation || appNavigation}
        permanent={appPermanentNavigation}
        ref="drawer"
        onInput={() => {
          $refs.drawer.isActive !== appNavigation && toggleAppNavigation()
        }}
      >
        <RecursiveMenus items={$store.state.account.menus} />
      </v-navigation-drawer>
    )
  },
}
</script>

<style>

</style>
