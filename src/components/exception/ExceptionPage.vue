<template>
  <div class="fill-width fill-height d-flex flex-column justify-center align-center">
    <p
      class="display-4 error--text"
      v-text="config[type].title"
    />
    <p
      class="headline error--text"
      v-text="config[type].desc"
    />
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'ExceptionPage',
  props: {
    type: {
      type: [Number, String],
      default: 404,
      validator: type => Object.keys(config).includes(`${type}`),
    },
  },
  computed: {
    config: () => config,
  },
}
</script>
