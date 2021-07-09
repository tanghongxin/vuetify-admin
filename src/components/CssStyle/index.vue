<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  render (h) {
    return h('style', this.content)
  },
}
</script>
