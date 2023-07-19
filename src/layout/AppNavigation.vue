<template>
  <v-navigation-drawer
    :model-value="state.appPermanentNavigation || state.appNavigation"
    :permanent="state.appPermanentNavigation"
    @update:modelValue="mutations.toggleAppNavigation"
  >
    <RecursiveMenus :items="accountStore.account.menus" />
  </v-navigation-drawer>
</template>

<script>
import RecursiveMenus from './LayoutRecursiveMenus.vue'
import { defineComponent } from 'vue'
import { useDisplay } from 'vuetify'
import { useAccountStore } from '@/store'
import { useState, useMutations } from './composable'

export default defineComponent({
  name: 'AppNavigation',
  components: {
    RecursiveMenus,
  },
  setup () {
    const { lgAndUp } = useDisplay()
    const accountStore = useAccountStore()
    const state = useState()
    const mutations = useMutations()

    return {
      lgAndUp,
      accountStore,
      state,
      mutations,
    }
  },
})
</script>

<style>

</style>
