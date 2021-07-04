<script>
import { mapState } from 'vuex'
export default {
  name: 'Map',
  computed: {
    ...mapState('setting', ['appThemeDark']),
  },
  render () {
    return (
      <div class="map">
        <TMap dark={this.appThemeDark}>
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
