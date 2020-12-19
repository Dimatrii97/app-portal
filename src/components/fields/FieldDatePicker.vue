<template>
  <div v-click-outside="outside" :class="[{ focus: isActive }, 'date-picker']">
    <div @click="inside()">
      <div class="form__field date">{{ value }}</div>
      <slot name="label"></slot>
    </div>

    <div class="calendar" v-if="isActive">
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
        @today="visibleMonth = new Date()"
        @change="interval.active = $event"
        @set="emitValue()"
        @close="isActive = false"
      />
    </div>
  </div>
</template>

<script>
import CalendarSettings from "@/components/calendar/CalendarSettings.vue";
import CalendarBody from "@/components/calendar/СalendarBody";
import CalendarHeader from "@/components/calendar/CalendarHeader.vue";
import CalendarRouter from "@/plugins/mixins/calendar-router";
import bodyHidden from "@/plugins/mixins/body-hidden";
import { Month } from "@/components/calendar/CreateCalendar";
import { format, isAfter, subDays, isEqual, isDate } from "date-fns";
export default {
  props: {
    value: {
      default: "",
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
      interval: {
        start: new Date(),
        end: null,
        active: "start"
      },
      visibleMonth: new Date()
    };
  },

  computed: {
    getMonth() {
      return Month.createMonth(this.visibleMonth)
        .setInterval(this.interval)
        .getMonth();
    }
  },
  watch: {
    isActive() {
      if (this.$store.getters.getSize <= 600) {
        this.bodyOverflowToggle();
      }
    },
    value(newValue) {
      if (!newValue) {
        this.interval.start = new Date();
        this.interval.end = null;
        this.active = "start";
      }
    }
  },

  methods: {
    outside() {
      this.isActive = false;
    },

    inside() {
      this.isActive = true;
    },

    emitValue() {
      if (isDate(this.interval.start) && isDate(this.interval.end)) {
        this.$emit(
          "input",
          `${format(this.interval.start, "yyyy-MM-dd")}/${format(
            this.interval.end,
            "yyyy-MM-dd"
          )}`
        );
        this.isActive = false;
      }
    },

    setDay(date) {
      switch (this.interval.active) {
        case "start": {
          if (this.isSetStartdate(date)) {
            if (isAfter(date, this.interval.end)) {
              this.interval.end = null;
            }
            this.interval.start = date;
            this.activeDay = date;
            this.interval.active = "end";
          }
          return;
        }

        case "end": {
          if (this.isSetEnddate(date)) {
            if (isAfter(this.interval.start, date)) {
              this.interval.start = null;
              this.interval.active = "start";
            }
            this.interval.end = date;
            this.activeDay = date;
          }
          return;
        }
        default:
          throw new Error("this.interval.active = 'end' || 'start'");
      }
    },

    setIntervalActive(status) {
      this.interval.active = status;
    },

    isSetStartdate(date) {
      return (
        isAfter(date, subDays(new Date(), 1)) ||
        isEqual(date, this.interval.end)
      );
    },

    isSetEnddate(date) {
      return (
        isAfter(date, subDays(new Date(), 1)) ||
        isEqual(date, this.interval.start)
      );
    }
  }
};
</script>

<style lang="scss">
.date-picker {
  // position: relative;
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
  & .calendar-body {
    flex: 0 0 60%;
  }
  & .day.today {
    color: $blue;
    &::before {
      background-color: transparent;
    }
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
