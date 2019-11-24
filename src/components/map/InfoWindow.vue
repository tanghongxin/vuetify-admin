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
  props: {
    map: {
      type: Object,
      required: true,
    },
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
  computed: {},
  watch: {
    position () {
      if (this.infoWindow) {
        setTimeout(() => {
          this.infoWindow.setPosition(new qq.maps.LatLng(...this.position))
        }, 150)
      }
    },
  },
  methods: {},
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
