<template>
  <v-overlay
    absolute
    color="rgba(255, 255, 255, 0.7)"
    opacity="1"
    :value="value"
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'absolute'],
}
</script>

<style>
</style>
