<template>
  <div class="home">
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
import TencentMap from '@/components/TencentMap/TencentMap.vue'
import Autocomplete from '@/components/TencentMap/Autocomplete.vue'

export default {
  name: 'Home',
  components: {
    TencentMap,
    Autocomplete,
  },
}
</script>
