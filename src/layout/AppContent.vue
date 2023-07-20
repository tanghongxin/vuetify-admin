<script setup>
import LayoutRouterView from '@/layout/LayoutRouterView.vue'
import { defineOptions } from 'vue'

defineOptions({
  name: 'AppContent',
})
</script>

<template>
  <v-main class="app-content fill-height overflow-hidden">
    <LayoutRouterView />
  </v-main>
</template>
