<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings';

defineOptions({ name: 'FormDrawer' });

const props = defineProps({
  flat: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 650,
  },
  afterClose: {
    type: Function,
    default: () => {},
  },
});

const emit = defineEmits<{
  open: [];
  close: [];
  'update:model-value': [value: boolean];
}>();

const { headerHeight } = storeToRefs(useSettingStore());

watch(
  () => props.modelValue,
  async (v) => {
    if (v) {
      emit('open');
    } else {
      emit('close');
      props.afterClose();
    }
  },
);
</script>

<template>
  <Teleport to="#v-application">
    <v-navigation-drawer
      class="FormWrapper"
      :permanent="false"
      location="right"
      temporary
      :order="-1"
      :width="width"
      :model-value="modelValue"
      @update:model-value="emit('update:model-value', $event)"
    >
      <template #prepend>
        <v-toolbar :height="headerHeight" color="primary darken-1">
          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <v-container>
        <v-card :flat="flat" height="100%" class="overflow-y-auto">
          <v-card-text class="flex-grow-1">
            <slot name="content" />
          </v-card-text>
        </v-card>

        <Spin :model-value="loading" />
      </v-container>

      <!-- / Footer -->
      <template #append>
        <v-divider />
        <div class="fill-width d-flex flex-row">
          <slot name="actions" />
        </div>
      </template>
    </v-navigation-drawer>
  </Teleport>
</template>

<style lang="scss"></style>
