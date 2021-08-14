<template>
  <div @blur.capture="handleBlur($event)" :class="[{ focus }, 'date-picker']">
    <div
      ref="calendar"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @keydown.enter.prevent="showCalendar()"
      class="date-picker__wrap"
      tabindex="0"
    >
      <div @click="showCalendar()">
        <div class="form__field date">{{ value }}</div>
        <slot name="label"></slot>
      </div>

      <div v-show="isActive" class="calendar">
        <Calendar-Body
          :interval="interval"
          :visibleMonth="visibleMonth"
          :month="getMonth"
          @set-day="setDay($event)"
        >
          <template #header>
            <Calendar-Header
              :visibleMonth="visibleMonth"
              @back="m_back()"
              @next="m_next()"
            />
          </template>
        </Calendar-Body>

        <Calendar-Settings
          :interval="interval"
          :disabled="!validValue"
          @today="visibleMonth = new Date()"
          @change="interval.active = $event"
          @set="emitValue()"
          @close="isActive = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CalendarSettings from '@/components/calendar/CalendarSettings.vue'
import CalendarBody from '@/components/calendar/СalendarBody'
import CalendarHeader from '@/components/calendar/CalendarHeader.vue'
import CalendarRouter from '@/plugins/mixins/calendar-router'
import bodyHidden from '@/plugins/mixins/body-hidden'
import { Month } from '@/components/calendar/CreateCalendar'
import { format, isAfter, subDays, isEqual, isDate } from 'date-fns'
export default {
  name: 'FieldDatePicker',
  props: {
    value: {
      default: '',
      type: String
    }
  },
  mixins: [CalendarRouter, bodyHidden],
  components: {
    CalendarBody,
    CalendarHeader,
    CalendarSettings
  },
  data() {
    return {
      isActive: false,
      isFocus: false,
      interval: {
        start: new Date(),
        end: null,
        active: 'start'
      },
      visibleMonth: new Date()
    }
  },

  computed: {
    getMonth() {
      return Month.createMonth(this.visibleMonth)
        .setInterval(this.interval)
        .getMonth()
    },
    focus() {
      return this.isActive || this.isFocus
    },
    validValue() {
      return isDate(this.interval.start) && isDate(this.interval.end)
    }
  },
  watch: {
    isActive() {
      // TODO: размер
      if (this.$store.getters.getSize <= 600) {
        this.bodyOverflowToggle()
      }
    },
    value(newValue) {
      if (!newValue) {
        this.interval.start = new Date()
        this.interval.end = null
        this.active = 'start'
      }
    }
  },

  methods: {
    handleBlur(e) {
      if (this.$el.contains(e.relatedTarget)) return
      this.hideCalendar()
    },
    toggleOptions() {
      this.optionsVisible ? this.hideCalendar() : this.showCalendar()
    },
    hideCalendar() {
      this.isActive = false
    },
    showCalendar() {
      this.isActive = true
    },

    emitValue() {
      if (this.validValue) {
        this.$emit(
          'input',
          `${format(this.interval.start, 'yyyy-MM-dd')}/${format(
            this.interval.end,
            'yyyy-MM-dd'
          )}`
        )
        this.reset()
      }
    },
    async reset() {
      this.hideCalendar()
      await this.$nextTick()
      this.$refs.calendar.focus()
    },

    setDay(date) {
      if (this.isValidInterval(date, this.interval.active)) {
        let activeStart = this.interval.active === 'start'
        let isAfterDate = activeStart
          ? isAfter(date, this.interval.end)
          : isAfter(this.interval.start, date)
        if (isAfterDate) {
          this.interval[activeStart ? 'end' : 'start'] = null

          this.setIntervalActive('start')
        } else {
          this.setIntervalActive('end')
        }
        this.interval[activeStart ? 'start' : 'end'] = date
        this.activeDay = date
      }
    },

    setIntervalActive(status) {
      this.interval.active = status
    },
    isValidInterval(date, b) {
      return isAfter(date, subDays(new Date(), 1)) || isEqual(date, b)
    }
  }
}
</script>

<style lang="scss" scoped>
.form__label.empty {
  font-size: 1.3rem;
  top: 5px;
}
.form__label {
  top: -15px;
  font-size: 1rem;
}
.focus .form__label {
  top: -15px !important;
  font-size: 1rem !important;
}

::v-deep .calendar-body {
  flex: 0 0 60%;
}
::v-deep .day.today {
  color: $blue;
  &::before {
    background-color: transparent;
  }
}
.date-picker {
  position: relative;
  &__wrap {
    outline: none;
  }
  & .day {
    font-size: 1.2rem;
  }
  & .name-day-week {
    font-size: 0.8rem;
  }
  & .date {
    height: 41px;
  }
  & .calendar {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    max-width: 750px;
    min-width: 490px;
    width: 80%;
    transform: translate(1%, 99%);
    z-index: 12;
    box-shadow: 1px 2px 5px #0000002e;
    border-radius: 5px;
    overflow: hidden;
    padding: 5px;
    background: #fff;
    border: 1px solid #3f51b559;
  }

  & .monthName {
    font-size: 1.2rem;
  }
  & .control {
    padding: 5px 0;
  }
  & .btn-square {
    padding: 0px;
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
  }
  @include _600 {
    & .day {
      font-size: 1rem;
    }
    & .calendar {
      position: fixed;
      z-index: 10000;
      min-width: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: none;
      border-radius: 0;
      height: 100%;
      display: block;
    }
    & .monthName {
      font-size: 1rem;
    }
  }
}
</style>
