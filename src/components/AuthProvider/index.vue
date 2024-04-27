<script setup lang="ts">
import { usePermissions, hasPermissions } from '@/composables/auth';

defineOptions({ name: 'AuthProvider' });

interface Props {
  required: string | string[];
}

const props = withDefaults(defineProps<Props>(), { required: '' });

const { permissions } = usePermissions();
</script>

<template>
  <slot v-if="hasPermissions(props.required)" :permissions></slot>
</template>
