<template>
  <div class="t-map-wrapper">
    <v-loading v-if="!state.initialized" :value="true" />
    <div class="t-map" ref="$el">
      <slot v-if="state.initialized" />
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash-es'
import { Props } from './mixin'
import { defineComponent, provide, ref, onMounted, reactive } from '@vue/composition-api'
import { injectMapKey } from './composable'
import TMapLoader from './TMapLoader'
import Timeout from 'await-timeout'

export default defineComponent({
  name:'TMap',
  props: {
    ..._.pick(Props, ['position', 'zoom']),
  },
  setup (props, ctx) {
    const map = ref(null)
    const state = reactive({ initialized: false })

    provide(injectMapKey, map)

    onMounted(async () => {
      await TMapLoader.getInstance().init()
      map.value = new qq.maps.Map(ctx.refs.$el, {
        center: new qq.maps.LatLng(...props.position),
        zoom: props.zoom,
      })
      // wait for map init
      await Timeout.set(500)
      state.initialized = true
    })
    
    return { state }
  },
})
</script>

<style lang="scss">
.t-map-wrapper,
.t-map {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
