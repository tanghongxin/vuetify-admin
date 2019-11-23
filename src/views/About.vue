<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/home">
      home
    </router-link>
    <VRangeDatePicker />

    <v-divider />
    <VRangeDateTimePicker />
    <VRangeTimePicker />
  </div>
</template>

<script>
import VRangeDatePicker from '~~/implements/VRangeDatePicker'
import VRangeDateTimePicker from '~~/implements/VRangeDateTimePicker'
// import VRangeTimePicker from '~~/implements/VRangeTimePicker'

export default {
  name: 'About',
  components: {
    VRangeDateTimePicker,
    VRangeDatePicker,
    // VRangeTimePicker,
  },
}
</script>
