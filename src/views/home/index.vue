<script>
export default {
  name: 'Home',
  render () {
    return (
      <div class="home">
        <TMap>
          <TAutocomplete />
        </TMap>
      </div>
    )
  },
}
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;
}
</style>
