<template>
  <div class="TencentMap">
    <slot
      name="controls"
      v-bind="{ map }"
      v-if="map"
    />
  </div>
</template>

<script>
import TencentMapLoader from './TencentMapLoader'

export default {
  name:'TencentMap',
  components: {},
  props: {
    zoom: {
      type: Number,
      default: 10,
    },
    center: {
      type: Array,
      default: () =>[39.916527,116.397128],
    },
  },
  data: () => ({
    map: null,
  }),
  computed: {},
  methods: {},
  async mounted () {
    try {
      await (new TencentMapLoader().load())
      this.map = new qq.maps.Map(this.$el, {
        center: new qq.maps.LatLng(...this.center),
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
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
