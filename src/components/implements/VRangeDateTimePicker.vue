<template>
  <v-card>
    <v-card-text class="px-0 py-0">
      <v-tabs
        fixed-tabs
        v-model="activeTab"
      >
        <v-tab key="calendar">
          <slot name="dateIcon">
            <v-icon>event</v-icon>
          </slot>
        </v-tab>
        <v-tab
          key="timer"
          :disabled="dateSelected"
        >
          <slot name="timeIcon">
            <v-icon>access_time</v-icon>
          </slot>
        </v-tab>
        <v-tab-item key="calendar">
          <v-date-picker
            range
            color="primary"
            class="VRangeDateTimePicker"
            v-model="dates"
            v-bind="datePickerProps"
            :day-format="date => date.slice(-2)"
            :selected-items-text="dates[0]"
            @input="showTimePicker"
          />
          <v-date-picker
            range
            color="primary"
            v-model="dates"
            class="VRangeDateTimePicker"
            v-bind="datePickerProps"
            :day-format="date => date.slice(-2)"
            :selected-items-text="dates[1]"
            @input="showTimePicker"
          />
        </v-tab-item>
        <v-tab-item key="timer">
          <v-time-picker
            color="primary"
            :use-seconds="timeFormat.includes(':ss')"
            ref="timer"
            format="24hr"
            scrollable
            class="VRangeDateTimePicker"
            v-model="timeEnd"
            :min="timeStart"
            v-bind="timePickerProps"
          />
          <v-time-picker
            color="primary"
            :use-seconds="timeFormat.includes(':ss')"
            ref="timer"
            format="24hr"
            scrollable
            class="VRangeDateTimePicker"
            v-model="timeStart"
            :min="timeEnd"
            v-bind="timePickerProps"
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
          color="primary"
          text
          @click.native="clearHandler"
        >
          {{ '取消' }}
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
moment.locale('zh-cn')

const DEFAULT_DATE = moment().locale('zh-cn').format('YYYY-MM-DD')
const DEFAULT_TIME = moment().locale('zh-cn').format('HH:mm:ss')
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'

export default {
  name: 'VRangeDateTimePicker',
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
      // dates: ['2018-09-15', '2018-09-20'],
      dates: [],
      // TODO
      dateStart: null,
      dateEnd: null,
      timeStart: null,
      timeEnd: null,
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
    dateSelected() {
      return !this.date
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
    showTimePicker(rangeDate) {
      if (rangeDate.length === 2){
        setTimeout(() => {
          this.activeTab = 1
        }, 400)
      }
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss">
.VRangeDateTimePicker {
  // 保证 VDatePicker 与 VTimePicker等高
  min-height: 374px;
  border-radius: 0 !important;
  box-shadow: none !important;

  .v-picker__title {
    height: 84px;
    padding-top: 10px;
  }
    
}
  
</style>
