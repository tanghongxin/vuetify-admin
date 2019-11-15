<template>
  <ExceptionPage type="403" />
</template>

<script>
import ExceptionPage from '~~/exception/ExceptionPage'

export default {
  name:'Forbidden',
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
