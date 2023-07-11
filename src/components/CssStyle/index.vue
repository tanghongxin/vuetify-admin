<script>
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'CssStyle',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  render () {
    return h('style', this.content)
  },
})
</script>
