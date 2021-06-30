<template>
  <ExceptionPage type="500" />
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage.vue'

export default {
  name:'ServerError',
  components: {
    ExceptionPage,
  },
  props: {},
  data: () => ({
  }),
  computed: {},
  methods: {},
}
</script>

<style lang="scss">

</style>
