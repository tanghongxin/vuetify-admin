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
    <v-toolbar :height="appHeaderHeight" dark slot="prepend" color="primary darken-1">
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>

    <!-- / Content -->
    <v-card :flat="flat" height="100%" class="overflow-y-auto">
      <v-card-text class="flex-grow-1">
        <slot name="content" />
      </v-card-text>
    </v-card>

    <VLoading absolute :value="loading" />

    <!-- / Footer -->
    <template #append>
      <v-divider dark />
      <div class="fill-width d-flex flex-row">
        <slot name="actions" />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import VLoading from '@/components/VImplements/VLoading.vue'

export default {
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
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 650,
    },
  },
  computed: {
    ...mapState('setting', ['appHeaderHeight']),
  },
}
</script>

<style lang="scss">
</style>
