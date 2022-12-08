<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CssStyle',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  render (h) {
    return h('style', this.content)
  },
})
</script>
