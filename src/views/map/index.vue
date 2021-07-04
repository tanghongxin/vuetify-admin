<script>
export default {
  name: 'Map',
  render () {
    return (
      <div class="map">
        <TMap>
          <TSearch />
        </TMap>
      </div>
    )
  },
}
</script>

<style lang="scss">
.map {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
