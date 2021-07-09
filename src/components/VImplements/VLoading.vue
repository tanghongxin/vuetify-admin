<template>
  <v-overlay
    :color="value ? color : 'transparent'"
    opacity="1"
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
export default {
  name: 'VLoading',
  props: {
    value: {
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
}
</script>

<style>
</style>
