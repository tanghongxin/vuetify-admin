<template>
  <div class="t-map-wrapper">
    <v-loading v-if="!initialized" :absolute="true" :value="true" />
    <div class="t-map" ref="$el">
      <slot v-if="initialized" />
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash-es'
import { Props } from './mixin'
import { 
  defineComponent, onMounted, watch, computed,
} from '@vue/composition-api'
import { useProvide, useState } from './composable'
import TMapLoader from './TMapLoader'

export default defineComponent({
  name:'TMap',
  props: {
    ..._.pick(Props, ['position', 'zoom']),
  },
  setup (props, ctx) {
    const [map, setMap] = useState(null)
    const [initialized, setInitialized] = useState(false)

    useProvide(map)

    onMounted(async () => {
      await TMapLoader.getInstance().init()

      const options = computed(() => ({
        center: new qq.maps.LatLng(...props.position),
        zoom: props.zoom,
        // https://lbs.qq.com/webDemoCenter/glAPI/glCustommap/customDark
        mapStyleId: ctx.root.$vuetify.theme.dark ? 'style2' : 'DEFAULT',
      }))

      watch(
        () => options.value,
        () => {
          if (!map.value) {
            setMap(new qq.maps.Map(ctx.refs.$el, options.value))
            setTimeout(setInitialized, 600, true)
          } else {
            map.value.setOptions(_.omit(options.value, ['center', 'zoom']))
          }
        },
        { deep: true, immediate: true }
      )
    })
    
    return { initialized }
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
