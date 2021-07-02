<script>
export default {
  name: 'VLoading',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'absolute'],
  render () {
    return (
      <v-overlay
        absolute
        color="rgba(255, 255, 255, 0.7)"
        opacity="1"
        value={this.value}
      >
        <button>123</button>
      </v-overlay>
    )
  },
}
</script>
