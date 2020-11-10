<template>
  <div class="app">
    <slot name="header"></slot>
    <div class="wrap">
      <div class="day-name">Пн</div>
      <div class="day-name">Вт</div>
      <div class="day-name">Ср</div>
      <div class="day-name">Чт</div>
      <div class="day-name">Пт</div>
      <div class="day-name">Сб</div>
      <div class="day-name">Вс</div>
      <div
        v-for="(date, i) in getMonth"
        :key="i"
        :class="[
          { today: today(date.day) },
          { interval: date.interval },
          { back: date.backMonth },
          { next: date.nextMonth },
          { isActive: isActive(date.day) },
          { isActiveStart: isActiveStart(date.day) },
          { isActiveEnd: isActiveEnd(date.day) },
          { new: date.showNew },
          'day'
        ]"
        @click="setActiveDay(date)"
      >
        <div class="day-wrap">
          <div>{{ date.day | localRu }}</div>
          <div :class="['tasks', { phontom: hide(date.tasks) }]">
            <div
              v-for="(task, i) in sliceHide(date.tasks)"
              :key="i"
              :style="{ backgroundColor: task.color }"
              class="task"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import {
  endOfMonth,
  startOfMonth,
  lastDayOfISOWeek,
  startOfISOWeek,
  subMonths,
  eachDayOfInterval,
  differenceInCalendarDays,
  areIntervalsOverlapping,
  getDaysInMonth,
  isToday,
  isEqual,
  isDate
} from "date-fns";
export default {
  props: {
    activeDay: {
      type: Date,
      default: () => {
        return new Date();
      },
      required: false
    },
    visibleMonth: {
      type: Date
    },
    events: {
      type: Array
    },
    interval: {
      type: Object
    }
  },
  data() {
    return {
      first: true
    };
  },
  computed: {
    firstDay() {
      return startOfISOWeek(endOfMonth(subMonths(this.visibleMonth, 1)));
    },

    lastDay() {
      return lastDayOfISOWeek(endOfMonth(this.visibleMonth));
    },

    isIntervalReady() {
      return (
        this.$props.interval &&
        isDate(this.interval.start) &&
        isDate(this.interval.end)
      );
    },

    getMonth() {
      let month = eachDayOfInterval({
        start: this.firstDay,
        end: this.lastDay
      }).map(day => ({ day }));
      this.backNextMonthProperty(month);
      if (this.$props.events) {
        this.$props.events.forEach(task => {
          this.normalInterval(task.startdate, task.deadline, this.setTasks, {
            month,
            task
          });
        });
      }
      if (this.isIntervalReady) {
        this.normalInterval(
          this.interval.start,
          this.interval.end,
          this.setInterval,
          { month }
        );
      }
      return month;
    }
  },
  created() {
    if (this.$props.events) {
      this.setFirstTaskList();
    }
  },

  methods: {
    backNextMonthProperty(month) {
      let intervalFistDayMonth = differenceInCalendarDays(
        startOfMonth(this.visibleMonth),
        this.firstDay
      );
      let intervalLastDayMonth = differenceInCalendarDays(
        this.lastDay,
        endOfMonth(this.visibleMonth)
      );
      let monthDayCount = getDaysInMonth(this.visibleMonth);
      for (let i = 0; i < intervalFistDayMonth + intervalLastDayMonth; i++) {
        intervalFistDayMonth > i
          ? (month[i].backMonth = true)
          : (month[i + monthDayCount].nextMonth = true);
      }
    },

    isWithinInterval(startdate, deadline) {
      let stD = new Date(startdate).setHours(0, 0, 0, 0);
      let dlD = new Date(deadline).setHours(0, 0, 0, 0);
      let firstB = stD <= this.activeDay;
      let LastB = this.activeDay <= dlD;
      return firstB && LastB;
    },

    setFirstTaskList() {
      let id = [];
      this.events.forEach(task => {
        if (this.isWithinInterval(task.startdate, task.deadline)) {
          id.push(task.id);
        }
      });
      this.$emit("setTasks", id);
    },

    normalInterval(start, end, cl, params) {
      let intersection = areIntervalsOverlapping(
        { start: new Date(start), end: new Date(end) },
        { start: new Date(this.firstDay), end: new Date(this.lastDay) }
      );

      if (intersection) {
        let intervalCl = differenceInCalendarDays(
          new Date(end),
          new Date(start)
        );
        let intervalMonth = differenceInCalendarDays(
          new Date(this.lastDay),
          new Date(this.firstDay)
        );
        let findIndex = differenceInCalendarDays(
          new Date(start),
          this.firstDay
        );
        if (findIndex + intervalCl > intervalMonth) {
          intervalCl = intervalMonth - findIndex;
        }
        if (findIndex < 0) {
          intervalCl += findIndex;
          findIndex = 0;
        }
        cl(findIndex, intervalCl, params);
      }
    },

    setTasks(findIndex, intervalTask, { month, task }) {
      for (let i = findIndex; i < intervalTask + findIndex + 1; i++) {
        if (!month[i].tasks) {
          month[i].tasks = [];
        }
        if (i === findIndex) {
          month[i].showNew = !task.scanned;
        }
        month[i].tasks.push(task);
      }
    },

    setInterval(findIndex, intervalTask, { month }) {
      for (let i = findIndex; i < intervalTask + findIndex; i++) {
        month[i].interval = true;
      }
    },

    today(day) {
      return isToday(day);
    },

    sliceHide(arr) {
      if (arr) return arr.slice(0, 3);
      return null;
    },

    setActiveDay({ day, tasks }) {
      this.$emit("setDay", day);
      this.$emit("setTasks", tasks ? tasks.map(i => i.id) : []);
    },

    hide(tasks) {
      return tasks && tasks.length > 4;
    },

    isActive(day) {
      if (!this.$props.interval) {
        return isEqual(day, this.activeDay);
      }
      return false;
    },

    isActiveStart(day) {
      if (this.$props.interval) {
        return isEqual(day, this.interval.start);
      }
    },

    isActiveEnd(day) {
      if (this.$props.interval) {
        return isEqual(day, this.interval.end);
      }
    }
  },
  watch: {
    events(newValue) {
      if (newValue.length) {
        this.setFirstTaskList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/pages/calendar";
</style>
