<template>
  <div class="TencentMap" />
</template>

<script>
import TencentMapLoader from './TencentMapLoader'

export default {
  name:'TencentMap',
  components: {},
  props: {
    zoom: {
      type: Number,
      default: 5,
    },
    center: {
      type: Array,
      default: () =>[116.404, 39.915],
    },
  },
  data: () => ({
    map: null,
  }),
  computed: {},
  methods: {},
  async created () {
    try {
      await (new TencentMapLoader().load())
      this.map = new qq.maps.Map(this.$el, {
        // center: new qq.maps.LatLng(this.center),
        zoom: this.zoom,
      })
    } catch (e) {
      throw e
    }
  },
}
</script>

<style lang="scss">
.TencentMap {
  width: 100%;
  height: 100%;
}
</style>
