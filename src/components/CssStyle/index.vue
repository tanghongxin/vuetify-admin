<script>
export default {
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
}
</script>
