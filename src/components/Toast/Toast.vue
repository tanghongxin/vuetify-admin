<template>
  <div class="toast">
    <v-fade-transition mode="out-in" group>
      <!-- https://github.com/vuejs/vue/issues/8516#issuecomment-937505336 -->
      <div
        v-for="(item, i) in items"
        :key="item.id"
        v-show="i === 0"
      >
        <v-snackbar
          absolute
          :color="item.color"
          :timeout="item.timeout"
          location="top"
          :model-value="i === 0"
        >
          {{ item.message }}
          <template #actions>
            <v-btn
              color="white"
              @click="dequeue(item.id)"
              variant="text"
              v-if="items.length > 1"
            >
              下一条 （{{ items.length - 1 }} +）
            </v-btn>
            <v-btn
              v-else
              color="white"
              variant="text"
              icon
              @click="dequeue(item.id)"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import event, { EVENT_TYPE_ADD_ITEM } from './event'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toast',
  data: () => ({
    timeoutId: null,
    items: [],
  }),
  methods: {
    handleAddItem ({ id = Date.now() + Math.random(), message, color, timeout }) {
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
  beforeUnmount () {
    event.removeAllListeners()
  },
})
</script>

<style lang="scss">
.toast {
  .v-snack {
    position: fixed;
    z-index: 9;
  }
}
</style>
