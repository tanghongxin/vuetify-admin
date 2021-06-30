<template>
  <div
    class="MarkerInfoWindow"
    v-if="position.length"
  >
    <!-- / InfoWindow -->
    <InfoWindow 
      :position="position"
      ref="infoWindow"
    >
      <!-- / 传递 slot -->
      <template v-slot:content>
        <slot name="content" />
      </template>
    </InfoWindow>

    <!-- / Marker -->
    <TMarker 
      :position="position"
      @click="toggleInfoWindow"
    />
  </div>
</template>

<script>
import InfoWindow from './InfoWindow'
import TMarker from './Marker'

export default {
  name:'MarkerInfoWindow',
  components: {
    InfoWindow,
    TMarker,
  },
  inject: ['map'],
  props: {
    ...InfoWindow.props,
    ...TMarker.props,
  },
  data: () => ({
  }),
  computed: {},
  methods: {
    toggleInfoWindow () {
      this.$refs['infoWindow'] && this.$refs['infoWindow'].toggleInfoWindow && this.$refs['infoWindow'].toggleInfoWindow()
    },
  },
}
</script>

<style lang="scss">

</style>
