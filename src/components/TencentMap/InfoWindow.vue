<template>
  <div class="InfoWindow">
    <slot
      name="content"
      ref="content"
    />
  </div>
</template>

<script>
export default {
  name:'InfoWindow',
  components: {},
  inject: ['map'],
  props: {
    position: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
  },
  data: () => ({
    infoWindow: null,
  }),
  watch: {
    position () {
      if (this.infoWindow) {
        this.infoWindow.setPosition(new qq.maps.LatLng(...this.position))
      }
    },
  },
  methods: {
    toggleInfoWindow () {
      if (this.infoWindow) {
        this.infoWindow.visible ? this.infoWindow.close() : this.infoWindow.open()
      }
    },
  },
  mounted () {
    this.infoWindow = new qq.maps.InfoWindow({
      content: this.$el,
      map: this.map,
      position: new qq.maps.LatLng(...this.position),
      visible: this.visible,
      zIndex: this.zIndex,
    })
  },
  beforeDestroy () {
    this.infoWindow && this.infoWindow.setMap && this.infoWindow.setMap(null)
  },
}
</script>

<style lang="scss">
.InfoWindow {
  margin-bottom: 10px;
}
</style>
