<template>
  <v-menu
    v-model="menu"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
    transition="scale-transition"
  >
    <slot />
  </v-menu>
</template>

<script>
export default {
  name: 'VFollowMenu',
  data: () => ({
    menu: false,
    x: 0,
    y: 0,
  }),
  methods: {
    async show (e) {
      e.preventDefault()
      if (this.menu) {
        this.menu = false
        setTimeout(() => {
          this.x = e.clientX
          this.y = e.clientY
          this.menu = true
        }, 90)
      } else {
        await this.$nextTick()
        this.x = e.clientX
        this.y = e.clientY
        this.menu = true
      }
    },
  },
}
</script>

<style lang="scss"></style>
