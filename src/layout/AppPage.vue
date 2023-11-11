<script setup>
import AppHeader from '@/layout/AppHeader.vue'
import AppContent from '@/layout/AppContent.vue'
import AppNavigation from '@/layout/AppNavigation.vue'
import AppSetting from '@/layout/AppSetting.vue'
import { defineOptions } from 'vue'

defineOptions({
  name: 'AppPage',
})
</script>

<template>
  <v-layout>
    <AppSetting />
    <AppHeader />
    <AppNavigation />
    <AppContent />
  </v-layout>
</template>
