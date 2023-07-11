<template>
  <div class="map">
    <TMap :dark="appThemeDark">
      <TSearch />
    </TMap>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Map',
  computed: {
    ...mapState('setting', ['appThemeDark']),
  },
})
</script>

<style lang="scss">
.map {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
