<template>
  <v-overlay
    content-class="w-100 h-100 d-flex flex-row align-center justify-center"
    contained
    attach
    :model-value="modelValue"
  >
    <v-progress-circular :bgColor color="primary" indeterminate size="64" />
  </v-overlay>
  <slot />
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings';

defineOptions({ name: 'Spin' });

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const { dark } = storeToRefs(useSettingStore());

const bgColor = computed(() =>
  dark.value ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
);
</script>

<style></style>
