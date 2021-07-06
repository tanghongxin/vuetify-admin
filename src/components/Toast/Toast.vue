<template>
  <div>
    <v-snackbar
      :absolute="absolute"
      :bottom="bottom"
      :color="item.color"
      :dark="dark"
      :key="item.id"
      :left="left"
      :multi-line="multiLine"
      :right="right"
      :timeout="timeout"
      :top="top"
      :value="i === 0"
      :vertical="vertical"
      v-for="(item, i) in items"
    >
      {{ item.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="nextButtonColor"
          @click="removeItem(item.id)"
          text
          v-bind="attrs"
          v-if="items.length > 1"
        >
          {{ nextButtonText }} ({{ items.length - 1 }} {{ nextButtonCountText }})
        </v-btn>
        <v-btn
          :color="closeButtonColor"
          @click="removeItem(item.id)"
          text
          icon
          v-bind="attrs"
          v-else
        >
          <v-icon>{{ closeButtonIcon }}</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ToastService from '@/components/Toast/ToastService'

/**
 * A wrapper component for VSnackbar which supports queueing functionality
 */
export default {
  name: 'Toast',
  data: () => ({
    processing: false,
    timeoutId: false,
    toastService: new ToastService(),
  }),
  computed: {
    items () {
      return this.toastService.items
    },
  },
  props: {
    /**
     * Position snackbar absolute
     */
    absolute: {
      type: Boolean,
      default: false,
    },
    /**
     * @deprecated since v2.0.0
     *
     * Auto height prop for snackbar
     */
    autoHeight: {
      type: Boolean,
      default: false,
    },
    /**
     * Position snackbar bottom
     */
    bottom: {
      type: Boolean,
      default: false,
    },
    /**
     * The color of the close button
     */
    closeButtonColor: {
      type: String,
      default: 'white',
    },
    /**
     * The icon of the close button
     */
    closeButtonIcon: {
      type: String,
      default: 'close',
    },
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * Array for items to display [{id: '', color: '', message: ''}]
     */
    // items: {
    //   type: Array,
    //   required: true,
    // },
    /**
     * Position snackbar left
     */
    left: {
      type: Boolean,
      default: false,
    },
    /**
     * Position snackbar multiline
     */
    multiLine: {
      type: Boolean,
      default: false,
    },
    /**
     * The color of the next button
     */
    nextButtonColor: {
      type: String,
      default: 'white',
    },
    /**
     * The text displayed next to the count of snackbars
     */
    nextButtonCountText: {
      type: String,
      default: 'More',
    },
    /**
     * The text to display in the next button
     */
    nextButtonText: {
      type: String,
      default: 'Next',
    },
    /**
     * Position snackbar right
     */
    right: {
      type: Boolean,
      default: false,
    },
    /**
     * Number of milliseconds to display each snackbar for
     */
    timeout: {
      type: Number,
      default: 6000,
    },
    /**
     * Position snackbar top
     */
    top: {
      type: Boolean,
      default: false,
    },
    /**
     * Position snackbar vertical
     */
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    processItems () {
      const vm = this
      vm.processing = true
      if (vm.items && Array.isArray(vm.items) && vm.items.length > 0) {
        const item = vm.items[0]
        return vm.timeoutId = setTimeout(() => {
          vm.removeItem(item.id)
        }, vm.timeout)
      }
      vm.processing = false
    },
    removeItem (id) {
      const vm = this
      clearTimeout(vm.timeoutId)
      /**
       * Emit remove event
       * @event remove
       * @type {number}
       */
      // this.$emit('remove', id)
      this.toastService.removeItem(id)
      if (vm.items.length > 0) {
        return vm.processItems()
      }
    },
  },
  watch: {
    items () {
      this.processItems()
    },
  },
}
</script>
