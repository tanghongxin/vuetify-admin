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
      @update:model-value="$emit('update:model-value', $event)"
    >
      <template #prepend>
        <v-toolbar :height="appHeaderHeight" color="primary darken-1">
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
    
        <VLoading absolute attach :model-value="loading" />
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

<script>
import { mapState } from 'pinia'
import { useSettingStore } from '@/store'
import VLoading from '@/components/VImplements/VLoading.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormDrawer',
  components: {
    VLoading,
  },
  props: {
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
  },
  emits: ['update:model-value'],
  computed: {
    ...mapState(useSettingStore, { appHeaderHeight: 'appHeaderHeight' }),
  },
})
</script>

<style lang="scss">
</style>
