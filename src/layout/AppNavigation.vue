<template>
  <v-navigation-drawer
    :model-value="state.appPermanentNavigation || state.appNavigation"
    :permanent="state.appPermanentNavigation"
    @update:modelValue="mutations.toggleAppNavigation"
  >
    <RecursiveMenus :items="store.state.account.menus" />
  </v-navigation-drawer>
</template>

<script>
import RecursiveMenus from './LayoutRecursiveMenus.vue'
import { defineComponent } from 'vue'
import { useDisplay } from 'vuetify'
import { useStore } from 'vuex'
import { useState, useMutations } from './composable'

export default defineComponent({
  name: 'AppNavigation',
  components: {
    RecursiveMenus,
  },
  setup () {
    const { lgAndUp } = useDisplay()
    const store = useStore()
    const state = useState()
    const mutations = useMutations()

    return {
      lgAndUp,
      store,
      state,
      mutations,
    }
  },
})
</script>

<style>

</style>
