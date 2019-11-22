<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <router-link to="/home">
      home
    </router-link>
    <div style="width: 580px">
      <VRangeDateTimePicker />
    </div>
    <!-- <VRangeTimePicker /> -->
  </div>
</template>

<script>
import VRangeDateTimePicker from '~~/implements/VRangeDateTimePicker'
// import VRangeTimePicker from '~~/implements/VRangeTimePicker'

export default {
  name: 'About',
  components: {
    VRangeDateTimePicker,
    // VRangeTimePicker,
  },
}
</script>
