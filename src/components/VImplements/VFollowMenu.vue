<template>
  <Teleport to="body">
    <div class="VFollowMenu" ref="wrapper">
      <v-menu
        :attach="$refs.wrapper"
        v-model="menu"
        absolute
        offset-y
        location="end"
        transition="scale-transition"
      >
        <slot />
      </v-menu>
    </div>
  </Teleport>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VFollowMenu',
  data () {
    return {
      menu: false,
      x: 0,
      y: 0,
    }
  },
  methods: {
    async show (e) {
      e.preventDefault()
      if (this.menu) {
        this.menu = false
        setTimeout(() => {
          this.x = e.clientX + 'px'
          this.y = e.clientY + 'px'
          this.menu = true
        }, 90)
      } else {
        await this.$nextTick()
        this.x = e.clientX + 'px'
        this.y = e.clientY + 'px'
        this.menu = true
      }
    },
  },
})
</script>

<style lang="scss">
.VFollowMenu {
  // HACK: vuetify3 暂未开放动态设置 top、Left，此处为兼容实现
  .v-overlay__content {
    top: v-bind(y);
    left: v-bind(x);
  }
}
</style>
