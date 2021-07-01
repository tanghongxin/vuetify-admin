<template>
  <div class="home">
    <TencentMap>
      <template #controls>
        <Autocomplete />
      </template>
    </TencentMap>
  </div>
</template>

<script>
import { TencentMap, Autocomplete } from '@/components/TencentMap/index'

export default {
  name: 'Home',
  components: {
    TencentMap,
    Autocomplete,
  },
}
</script>

<style lang="scss">
.home {
  height: 500px;
  width: 1200px;
}
</style>
