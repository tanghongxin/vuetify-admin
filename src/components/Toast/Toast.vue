<template>
  <div class="toast">
    <v-fade-transition mode="out-in" group>
      <v-snackbar
        app
        absolute
        :color="item.color"
        :dark="dark"
        :key="item.id"
        :timeout="item.timeout"
        :top="true"
        :value="i === 0"
        v-for="(item, i) in items"
      >
        {{ item.message }}
        <template #action="{ attrs }">
          <v-btn
            color="white"
            @click="dequeue(item.id)"
            text
            v-bind="attrs"
            v-if="items.length > 1"
          >
            下一条 （{{ items.length - 1 }} +）
          </v-btn>
          <v-btn
            color="white"
            @click="dequeue(item.id)"
            text
            icon
            v-bind="attrs"
            v-else
          >
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-fade-transition>
  </div>
</template>

<script>
import event, { EVENT_TYPE_ADD_ITEM } from './event'

export default {
  name: 'Toast',
  data: () => ({
    timeoutId: null,
    items: [],
  }),
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleAddItem ({ id = Date.now(), message, color, timeout }) {
      this.items.push({ id, message, color, timeout })
      this.enqueue()
    },
    enqueue () {
      const [{ id, timeout }] = this.items
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(this.dequeue, timeout, id)
      }
    },
    dequeue (id) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }

      const index = this.items.findIndex(i => i.id === id)
      this.items.splice(index, 1)

      if (this.items.length) {
        this.enqueue()
      }
    },
  },
  created () {
    event.addListener(EVENT_TYPE_ADD_ITEM, this.handleAddItem)
  },
  beforeDestroy () {
    event.removeAllListeners()
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
