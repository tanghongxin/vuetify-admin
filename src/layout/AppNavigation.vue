<script setup>
import RecursiveMenus from './LayoutRecursiveMenus.vue'
import { defineOptions } from 'vue'
import { storeToRefs } from 'pinia'
import { useAccountStore, useSettingStore } from '@/stores'

defineOptions({
  name: 'AppContent',
})

const accountStore = useAccountStore()

const { toggleAppNavigation } = useSettingStore()
const {
  appPermanentNavigation, appNavigation,
} = storeToRefs(useSettingStore())
</script>

<template>
  <v-navigation-drawer
    :model-value="appPermanentNavigation || appNavigation"
    :permanent="appPermanentNavigation"
    @update:modelValue="toggleAppNavigation"
  >
    <RecursiveMenus :items="accountStore.menus" />
  </v-navigation-drawer>
</template>
