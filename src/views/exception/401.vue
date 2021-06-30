<template>
  <ExceptionPage type="401" />
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'

export default {
  name:'NoAuthentication',
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
