<script>
import _ from 'lodash'
import { Props } from './common'
import { h, defineComponent, provide, ref } from '@vue/composition-api'
import { useInit } from './composable'

export default defineComponent({
  name:'TMap',
  props: {
    ..._.pick(Props, ['position', 'zoom']),
  },
  setup (props, ctx) {
    const map = ref(null)
    const initialized = ref(false)
    
    provide('map', map)

    useInit(() => {
      map.value = new qq.maps.Map(ctx.refs.$el, {
        center: new qq.maps.LatLng(...props.position),
        zoom: props.zoom,
      })
      initialized.value = true
    })

    return () => h('div', {
      class: 't-map',
      ref: '$el',
    }, initialized.value ? ctx.slots.default() : null)
  },
})
</script>

<style lang="scss">
.t-map {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
