<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  render () {
    return (
      <div class="home">
        <p>Welcome</p>
      </div>
    )
  },
})
</script>

<style lang="scss">
.home {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
