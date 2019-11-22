<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <router-link to="/home">
      home
    </router-link>
    <VRangeTimePicker />
  </div>
</template>

<script>
import VRangeTimePicker from '~~/implements/VRangeTimePicker'

export default {
  name: 'About',
  components: {
    VRangeTimePicker,
  },
}
</script>
