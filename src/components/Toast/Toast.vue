<template>
  <div class="toast">
    <v-snackbar
      app
      absolute
      auto-height
      :color="item.color"
      :dark="dark"
      :key="item.id"
      :timeout="item.timeout"
      :top="true"
      :value="i === 0"
      v-for="(item, i) in items"
    >
      {{ item.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          @click="removeItem(item.id)"
          text
          v-bind="attrs"
          v-if="items.length > 1"
        >
          下一条 （{{ items.length - 1 }} +）
        </v-btn>
        <v-btn
          color="white"
          @click="removeItem(item.id)"
          text
          icon
          v-bind="attrs"
          v-else
        >
          <v-icon>close</v-icon>
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
    dark: {
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
        }, item.timeout)
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
    items: {
      deep: true,
      handler () {
        this.processItems()
      },
    },
  },
}
</script>

<style lang="scss">
.toast {
  .v-snack {
    position: fixed;
    z-index: 9;
  }
}
</style>
