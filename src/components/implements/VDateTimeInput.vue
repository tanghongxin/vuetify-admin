<template>
  <v-menu
    ref="menu"
    v-model="menu"
    content-class="VDateTimeInput"
    :close-on-content-click="false"
    :nudge-right="20"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="310px"
    min-width="310px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        label="Picker in menu"
        prepend-icon="access_time"
        readonly
        v-on="on"
      />
    </template>
    <VDateTimePicker
      v-show="menu"
      :datetime="time"
      full-width
      @input="onDateTimePickerInput"
    />
  </v-menu>
</template>

<script>
import VDateTimePicker from './VDateTimePicker'

export default {
  name:'VDateTimeInput',
  components: {
    VDateTimePicker,
  },
  props: {
    ...VDateTimePicker.props,
  },
  data: () => ({
    time: null,
    menu: false,
  }),
  methods: {
    onDateTimePickerInput (e) {
      this.time = e
      this.$refs.menu.save(e)
    },
  },
}
</script>

<style>

</style>
