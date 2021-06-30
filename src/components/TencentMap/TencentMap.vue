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
  provide () {
    return {
      map: this.map,
    }
  },
  data: () => ({
    loader: new TencentMapLoader({
      key: process.env.VUE_APP_TENCENT_MAP_KEY,
      v: process.env.VUE_APP_TENCENT_MAP_VERSION,
      protocol: process.env.VUE_APP_TENCENT_MAP_PROTOCOL,
      hostAndPath: process.env.VUE_APP_TENCENT_MAP_HOST_AND_PATH,
      libraries: ['place'],
    }),
    map: null,
  }),
  async mounted () {
    try {
      await this.loader.init()
      this.map = new qq.maps.Map(this.$el, {
        center: new qq.maps.LatLng(...this.center),
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
