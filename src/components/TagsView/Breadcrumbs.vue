<script setup lang="ts">
import { useBreadcrumbs } from '@/composables/layout';

const items = useBreadcrumbs();
</script>

<template>
  <v-breadcrumbs class="pt-2 pb-2 d-none d-sm-flex" :items>
    <template #divider>
      <v-icon>forward</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<style lang="scss"></style>
