<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useBreadcrumbs } from '@/composables/layout';

const { xs } = useDisplay();
const breadcrumbs = useBreadcrumbs();
</script>

<template>
  <v-breadcrumbs v-show="!xs" class="pt-2 pb-2" :items="breadcrumbs">
    <template #divider>
      <v-icon>forward</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<style lang="scss"></style>
