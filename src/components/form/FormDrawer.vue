<template>
  <v-navigation-drawer
    app
    class="FormWrapper"
    :value="value"
    fixed
    flat
    ref="drawer"
    :permanent="value"
    right
    temporary
    :width="width"
  >
    <!-- / Header -->
    <v-toolbar
      :height="appHeaderHeight"
      dark
      slot="prepend"
      color="primary darken-1"
    >
      <v-toolbar-title>
        <slot name="title" />
      </v-toolbar-title>
    </v-toolbar>
    <v-card
      :flat="flat"
      height="100%"
      class="overflow-y-auto"
    >
      <!-- / Content -->
      <v-card-text class="flex-grow-1">
        <slot name="content" />
      </v-card-text>
    </v-card>
    
    <!-- TODO: actions 部分是否也应当遮挡？与需求确认 -->
    <v-overlay
      color="rgba(255, 255, 255, 0.7)"
      absolute
      opacity="1"
      :style="{
        top: appHeaderHeight + 'px'
      }"
      :value="loading"
    >
      <v-progress-circular
        color="blue"
        indeterminate
        size="64"
      />
    </v-overlay>
    
    <!-- / Actions -->
    <template v-slot:append>
      <v-divider dark />
      <div class="fill-width d-flex flex-row">
        <slot name="actions" />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name:'FormWrapper',
  components: {},
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 650,
    },
  },
  data: () => ({}),
  computed: {
    appHeaderHeight: {
      get () {
        return this.$store.state.setting.appHeaderHeight
      },
    },
  },
}
</script>

<style lang="scss">
</style>
