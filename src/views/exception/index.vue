<script>
import config from './config'

export default {
  name: 'Exception',
  props: {
    type: {
      type: [Number, String],
      default: 404,
      validator: type => Object.keys(config).includes(`${type}`),
    },
  },
  render () {
    return (
      <div class="fill-width fill-height d-flex flex-column justify-center align-center">
        <p class="display-4 error--text">{config[this.type].title}</p>
        <p class="display-4 error--text">{config[this.type].desc}</p>
      </div>
    )
  },
}
</script>
