<script>
import { props } from './TMapMixin'
import _ from 'lodash-es'
import { defineComponent, h, onBeforeUnmount, watch } from '@vue/composition-api'
import { useInject } from './composable'

export default defineComponent({
  name: 'TMarker',
  props: {
    ..._.pick(props, ['position', 'zIndex']),
    animation: {
      type: String,
      default: 'DOWN',
      validator: animation => ['BOUNCE', 'DROP', 'DOWN', 'UP'].includes(animation),
    },
  },
  setup (props, ctx) {
    const map = useInject()
    const marker = new qq.maps.Marker({
      animation: qq.maps.MarkerAnimation[props.animation],
      position: new qq.maps.LatLng(...props.position),
      clickable: true,
      draggable: false,
      zIndex: props.zIndex,
      map,
    })
    // https://lbs.qq.com/webApi/javascriptV2/jsGuide/jsEvent
    const listener = qq.maps.event.addListener(marker, 'click', e => ctx.emit('click', e))

    watch(
      () => props.position,
      () => {
        marker.setPosition(
          new qq.maps.LatLng(...props.position),
        )
      },
      { deep: true },
    )

    onBeforeUnmount(() => {
      marker.setMap(null)
      qq.maps.event.removeListener(listener)
    })

    return () => h()
  },
})
</script>
