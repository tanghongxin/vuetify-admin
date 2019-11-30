<template>
  <v-card>
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
          :disabled="!date"
        >
          <slot name="timeIcon">
            <v-icon>access_time</v-icon>
          </slot>
        </v-tab>
        <v-tab-item key="calendar">
          <v-date-picker
            color="primary"
            class="VDateTimePicker"
            v-model="date"
            v-bind="datePickerProps"
            :day-format="date => date.slice(-2)"
            full-width
          />
        </v-tab-item>
        <v-tab-item key="timer">
          <v-time-picker
            color="primary"
            :use-seconds="timeFormat.includes(':ss')"
            ref="timer"
            format="24hr"
            scrollable
            class="VDateTimePicker"
            v-model="time"
            v-bind="timePickerProps"
            full-width
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
          :disabled="!date"
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
import { format, parse } from 'date-fns'
import moment from 'moment'

const DEFAULT_DATE = moment().locale('zh-cn').format('YYYY-MM-DD')
const DEFAULT_TIME = moment().locale('zh-cn').format('HH:mm:ss')
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'

export default {
  name: 'VDateTimePicker',
  model: {
    prop: 'datetime',
    event: 'input',
  },
  props: {
    datetime: {
      type: [Date, String],
      default: null,
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT,
    },
    timeFormat: {
      type: String,
      default: DEFAULT_TIME_FORMAT,
    },
    textFieldProps: {
      type: Object,
      default: () => ({}),
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
  data() {
    return {
      display: false,
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME,
    }
  },
  computed: {
    dateTimeFormat() {
      return this.dateFormat + ' ' + this.timeFormat
    },
    defaultDateTimeFormat() {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    formattedDatetime() {
      return this.selectedDatetime ? format(this.selectedDatetime, this.dateTimeFormat) : ''
    },
    selectedDatetime() {
      if (this.date && this.time) {
        let datetimeString = this.date + ' ' + this.time
        if (this.time.length === 5) {
          datetimeString += ':00'
        }
        return parse(datetimeString, this.defaultDateTimeFormat, new Date())
      } else {
        return null
      }
    },
  },
  watch: {
    datetime: function() {
      this.init()
    },
  },
  methods: {
    init() {
      if (!this.datetime) {
        return
      }

      let initDateTime
      if (this.datetime instanceof Date) {
        initDateTime = this.datetime
      } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
        // see https://stackoverflow.com/a/9436948
        initDateTime = parse(this.datetime, this.dateTimeFormat, new Date())
      }

      this.date = format(initDateTime, DEFAULT_DATE_FORMAT)
      this.time = format(initDateTime, DEFAULT_TIME_FORMAT)
    },
    okHandler() {
      this.resetPicker()
      this.$emit('input', this.formattedDatetime)
    },
    clearHandler() {
      this.resetPicker()
      this.date = DEFAULT_DATE
      this.time = DEFAULT_TIME
      // has never changed
      this.$emit('input', this.datetime)
    },
    resetPicker() {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true
      }
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss">
.VDateTimePicker {
  // 保证 VDatePicker 与 VTimePicker等高
  min-height: 374px;
  border-radius: 0 !important;
  box-shadow: none !important;

  .v-picker__title {
    padding-top: 10px;
    height: 84px;
  }
}
</style>
