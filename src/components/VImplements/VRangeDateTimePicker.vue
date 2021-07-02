<template>
  <v-card class="v-range-date-time-picker">
    <v-card-text class="px-0 py-0">
      <v-tabs
        fixed-tabs
        v-model="activeTab"
        :slider-size="3"
        slider-color="primary darken-1"
      >
        <v-tab key="calendar">
          <slot name="dateIcon">
            <v-icon>event</v-icon>
          </slot>
        </v-tab>
        <v-tab
          key="timer"
          :disabled="dates.length !== 2"
        >
          <slot name="timeIcon">
            <v-icon>access_time</v-icon>
          </slot>
        </v-tab>
        <v-tab-item key="calendar">
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
        </v-tab-item>
        <v-tab-item key="timer">
          <v-time-picker
            color="primary"
            format="24hr"
            locale="zh-cn"
            scrollable
            v-model="timeStart"
            v-bind="timePickerProps"
            width="285"
          />
          <v-time-picker
            color="primary"
            format="24hr"
            locale="zh-cn"
            :min="sameDate ? timeStart : null"
            scrollable
            v-model="timeEnd"
            v-bind="timePickerProps"
            width="285"
          />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <slot
        name="actions"
        :parent="this"
      >
        <v-btn
          v-show="activeTab === 0"
          color="primary"
          text
          :disabled="dates.length !== 2"
          @click="activeTab = 1"
        >
          选择时间
        </v-btn>
        <v-btn
          v-show="activeTab === 1"
          color="primary"
          text
          @click="activeTab = 0"
        >
          选择日期
        </v-btn>
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
const TIME_FORMAT = 'HH:mm:ss'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default {
  name: 'VRangeDateTimePicker',
  props: {
    value: {
      type: Array,
      default: () => [dayjs().format(DATE_TIME_FORMAT), dayjs().format(DATE_TIME_FORMAT)],
    },
    datePickerProps: {
      type: Object,
      default: () => ({}),
    },
    timePickerProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dates: null,
    timeStart: null,
    timeEnd: null,
    activeTab: 0,
  }),
  computed: {
    sameDate () {
      return dayjs(this.dates[0], DATE_FORMAT).isSame(
        dayjs(this.dates[1], DATE_FORMAT),
        'date'
      )
    },
  },
  methods: {
    dayjs,
    okHandler() {
      this.$emit('input', [
        this.dates[0] + ' ' + this.timeStart,
        this.dates[1] + ' ' + this.timeEnd,
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
      dayjs(this.value[0], DATE_TIME_FORMAT).format(DATE_FORMAT),
      dayjs(this.value[1], DATE_TIME_FORMAT).format(DATE_FORMAT),
    ]
    this.timeStart = dayjs(this.value[0], DATE_TIME_FORMAT).format(TIME_FORMAT)
    this.timeEnd = dayjs(this.value[1], DATE_TIME_FORMAT).format(TIME_FORMAT)
  },
}
</script>

<style lang="scss">
.v-range-date-time-picke {
  min-height: 374px;
  // 保证 VDatePicker 与 VTimePicker等高
  width: 570px;

  .v-picker {
    border-radius: 0 !important;
    box-shadow: none !important;
    width: 50%;
  }

  .v-picker__title {
    height: 84px;
    padding-top: 10px;
  }

  .v-picker__title {
    margin-left: -1px;
  }

  .v-time-picker-title {
    // 时分居中
    justify-content: center !important;
  }
    
}
  
</style>
