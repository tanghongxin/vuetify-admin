<script setup>
import RecursiveMenus from './LayoutRecursiveMenus.vue'
import { defineOptions } from 'vue'
import { useAccountStore } from '@/store'
import { useState, useMutations } from './composable'

defineOptions({
  name: 'AppContent',
})

const accountStore = useAccountStore()
const state = useState()
const mutations = useMutations()
</script>

<template>
  <v-navigation-drawer
    :model-value="state.appPermanentNavigation || state.appNavigation"
    :permanent="state.appPermanentNavigation"
    @update:modelValue="mutations.toggleAppNavigation"
  >
    <RecursiveMenus :items="accountStore.account.menus" />
  </v-navigation-drawer>
</template>
