<template>
  <v-overlay
    content-class="fill-width fill-height d-flex flex-row align-center justify-center"
    v-bind="$props"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    />
    <slot />
  </v-overlay>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VLoading',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    color () {
      return this.$vuetify.theme.dark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'
    },
  },
})
</script>

<style>
</style>
