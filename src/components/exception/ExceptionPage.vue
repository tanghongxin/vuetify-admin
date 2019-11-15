<template>
  <div class="ExceptionPage__container d-flex flex-column">
    <p
      class="ExceptionPage__p"
      v-text="config[type].title"
    />
    <p
      class="ExceptionPage__p-zh"
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

<style lang="scss">
.ExceptionPage {

  &__container {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  &__p {
    margin-top: -150px;
    margin-bottom: 0;
    color: #999;
    font-size: 110px;
  }

  &__p-eg {
    margin-bottom: 5px;
    color: #888;
    font-size: 20px;
  }

  &__p-zh {
    font-size: 30px;
  }
}
</style>
