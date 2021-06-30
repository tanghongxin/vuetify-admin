<script>
export default {
  name:'TMarker',
  render: h => h(),
  inject: ['map'],
  props: {
    animation: {
      type: String,
      default: 'DOWN',
      validator: animation => ['BOUNCE', 'DROP', 'DOWN', 'UP'].includes(animation),
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    // TODO: $watch and v-model
    draggable: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Array,
      required: true,
    },
    zIndex: {
      type: Number,
      default: 99,
    },
  },
  data: () => ({
    marker: null,
  }),
  computed: {},
  watch: {
    position () {
      if (this.marker) {
        this.marker.setPosition(
          new qq.maps.LatLng(...this.position)
        )
      }
    },
  },
  methods: {},
  created () {
    this.marker = new qq.maps.Marker({
      animation: qq.maps.MarkerAnimation[this.animation],
      center: new qq.maps.LatLng(...this.position),
      clickable: this.clickable,
      draggable: this.draggable,
      map: this.map,
      zIndex: this.zIndex,
    })
    qq.maps.event.addListener(this.marker, 'click', e => {
      this.$emit('click', e)
    })
  },
  beforeDestroy () {
    this.marker && this.marker.setMap && this.marker.setMap(null)
  },
}
</script>
