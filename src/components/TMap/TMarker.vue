<script>
import { Props } from './mixin'
import _ from 'lodash-es'
import { defineComponent, h, onMounted, onBeforeUnmount, watch } from '@vue/composition-api'
import { useInject } from './composable'

export default defineComponent({
  name:'TMarker',
  props: {
    ..._.pick(Props, ['clickable', 'draggable', 'position', 'zIndex']),
    animation: {
      type: String,
      default: 'DOWN',
      validator: animation => ['BOUNCE', 'DROP', 'DOWN', 'UP'].includes(animation),
    },
  },
  setup (props, ctx) {
    const map = useInject()
    let marker
    let listener

    onMounted(() => {
      marker = new qq.maps.Marker({
        animation: qq.maps.MarkerAnimation[props.animation],
        center: new qq.maps.LatLng(...props.position),
        clickable: true,
        draggable: false,
        zIndex: 99,
        map,
      })
      // https://lbs.qq.com/webApi/javascriptV2/jsGuide/jsEvent
      listener = qq.maps.event.addListener(marker, 'click', e => ctx.emit('click', e))
    })

    watch(
      () => props.position,
      () => {
        marker.setPosition(
          new qq.maps.LatLng(...props.position)
        )
      }
    )

    onBeforeUnmount(() => {
      marker.setMap(null)
      qq.maps.event.removeListener(listener)
    })

    return () => h()
  },
})
</script>
