<script>
/* eslint-disable vue/require-prop-types */
import Exception from '@/components/Exception/index.vue'

export default {
  name: 'Exception',
  props: ['type'],
  render () {
    return <Exception type={this.type} />
  },
}
</script>
