<template>
  <v-content>
    <router-view :key="$route.name" />
  </v-content>
</template>

<script>
export default {
  name:'AppContent',
  components: {},
  props: {},
  data: () => ({
  }),
  computed: {},
  methods: {},
}
</script>

<style lang="scss">

</style>
