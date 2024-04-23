<script setup lang="ts">
import AppHeader from '@/layout/AppHeader.vue';
import AppContent from '@/layout/AppContent.vue';
import AppNavigation from '@/layout/AppNavigation.vue';
import AppSetting from '@/layout/AppSetting.vue';

defineOptions({
  name: 'AppPage',
});
</script>

<template>
  <v-layout>
    <AppSetting />
    <AppHeader />
    <AppNavigation />
    <AppContent />
  </v-layout>
</template>
