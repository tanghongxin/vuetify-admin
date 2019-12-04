<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <router-link to="/about">
      about
    </router-link>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div style="width: 1200px; height: 500px;">
      <TencentMap>
        <template v-slot:controls="{ map }">
          <Autocomplete :map="map" />
        </template>
      </TencentMap>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TencentMap from '~~/map/TencentMap'
import Autocomplete from '~~/map/Autocomplete'

export default {
  name: 'Home',
  components: {
    TencentMap,
    Autocomplete,
  },
}
</script>
