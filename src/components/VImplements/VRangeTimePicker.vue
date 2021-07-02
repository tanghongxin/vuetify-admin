<template>
  <div>
    <h1>Plan your event:</h1>
    <v-row
      justify="space-around"
      align="center"
    >
      <v-col style=" flex: 0 1 auto;
  width: 290px;"
      >
        <h2>Start:</h2>
        <v-time-picker
          v-model="start"
          :max="end"
          color="primary"
          format="24hr"
          scrollable
        />
      </v-col>
      <v-col style=" flex: 0 1 auto;
  width: 290px;"
      >
        <h2>End:</h2>
        <v-time-picker
          v-model="end"
          :min="start"
          color="primary"
          format="24hr"
          scrollable
        />
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  name:'VRangeTimePicker',
  components: {},
  props: {},
  data: () => ({
    start: null,
    end: null,
  }),
  computed: {},
  methods: {},
}
</script>

<style lang="scss">

</style>
