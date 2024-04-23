<script setup lang="ts">
const props = defineProps({
  openedRoutes: {
    type: Array,
    default: () => [],
  },
  targetIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['close', 'closeRight', 'closeLeft', 'closeOthers']);
</script>

<template>
  <v-list dense class="py-0">
    <v-list-item dense @click="() => emit('close', targetIndex)">
      <template #prepend>
        <v-icon class="mr-1" small :size="16" tag="span">
          keyboard_arrow_down
        </v-icon>
        <v-list-item-title>关闭选中标签</v-list-item-title>
      </template>
    </v-list-item>
    <v-list-item
      dense
      :disabled="targetIndex >= props.openedRoutes.length - 1"
      @click="() => emit('closeRight', targetIndex)"
    >
      <template #prepend>
        <v-icon class="mr-1" small :size="16" tag="span">
          keyboard_arrow_right
        </v-icon>
        <v-list-item-title>关闭右侧标签</v-list-item-title>
      </template>
    </v-list-item>
    <v-list-item
      dense
      :disabled="targetIndex < 1"
      @click="() => emit('closeLeft', targetIndex)"
    >
      <template #prepend>
        <v-icon class="mr-1" small :size="16" tag="span">
          keyboard_arrow_left
        </v-icon>
        <v-list-item-title>关闭左侧标签</v-list-item-title>
      </template>
    </v-list-item>
    <v-list-item
      dense
      :disabled="props.openedRoutes.length <= 1"
      @click="emit('closeOthers', targetIndex)"
    >
      <template #prepend>
        <v-icon class="mr-1" small :size="16" tag="span">
          keyboard_arrow_up
        </v-icon>
        <v-list-item-title>关闭其他标签</v-list-item-title>
      </template>
    </v-list-item>
  </v-list>
</template>

<style lang="scss"></style>
