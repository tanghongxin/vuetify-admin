<template>
  <v-card class="VRangeDatePicker">
    <v-card-text class="px-0 py-0">
      <v-date-picker
        color="primary"
        :day-format="date => date.slice(-2)"
        locale="zh-cn"
        range
        :show-current="false"
        :selected-items-text="dates[0]"
        :value="dates"
        v-bind="datePickerProps"
        width="285"
        @input="dateInput"
      />
      <!-- / TODO: 默认展示到下一月 -->
      <v-date-picker
        color="primary"
        :day-format="date => date.slice(-2)"
        locale="zh-cn"
        :min="dates[0]"
        range
        :value="dates"
        v-bind="datePickerProps"
        :show-current="false"
        :selected-items-text="dates[1]"
        width="285"
        @input="dateInput"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <slot
        name="actions"
        :parent="this"
      >
        <v-btn
          color="primary"
          text
          @click="okHandler"
        >
          {{ '确定' }}
        </v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
dayjs.locale('zh-cn')

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  name:'VRangeDatePicker',
  components: {},
  props: {
    value: {
      type: Array,
      default: () => [dayjs().format(DATE_FORMAT), dayjs().format(DATE_FORMAT)],
    },
    datePickerProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dates: null,
  }),
  computed: {},
  methods: {
    okHandler() {
      this.$emit('input', [
        this.dates[0],
        this.dates[1],
      ])
    },
    dateInput ([first, end]) {
      if (!end) {
        this.dates = [first]
        return
      }
      // 先选择结束日期，后选择开始日期
      if (dayjs(end, DATE_FORMAT).isBefore(dayjs(first, DATE_FORMAT))) {
        [first, end] = [end, first]
      }
      this.dates = [first, end]
    },
  },
  created () {
    this.dates = [
      dayjs(this.value[0], DATE_FORMAT).format(DATE_FORMAT),
      dayjs(this.value[1], DATE_FORMAT).format(DATE_FORMAT),
    ]
  },
}
</script>

<style lang="scss">
.VRangeDatePicker {
  width: 570px;
  min-height: 374px;

  .v-picker {
    width: 50%;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}
</style>
