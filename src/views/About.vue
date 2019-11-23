<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/home">
      home
    </router-link>
    <div style="width: 100%; height: 100%">
      <TencentMap />
    </div>
    <VRangeDatePicker />

    <v-divider />
    <VRangeDateTimePicker />
    <!-- <VRangeTimePicker /> -->
  </div>
</template>

<script>
import VRangeDatePicker from '~~/implements/VRangeDatePicker'
import VRangeDateTimePicker from '~~/implements/VRangeDateTimePicker'
// import VRangeTimePicker from '~~/implements/VRangeTimePicker'
import TencentMap from '~~/map/TencentMap'

export default {
  name: 'About',
  components: {
    VRangeDateTimePicker,
    VRangeDatePicker,
    TencentMap,
    // VRangeTimePicker,
  },
}
</script>

<style lang="scss">
.about {
  width: 100%;
  height: 100%;
}
</style>
