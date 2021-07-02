<script>
export default {
  name: 'Home',
  render () {
    return (
      <div class="home">
        <TMap>
          <TSearch />
        </TMap>
      </div>
    )
  },
}
</script>

<style lang="scss">
.home {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
