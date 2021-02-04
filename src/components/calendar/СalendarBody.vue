<template>
  <div class="calendar-body">
    <slot name="header"></slot>
    <div class="wrap">
      <div class="day name-day-week">
        <div class="day-wrap">Пн</div>
      </div>
      <div class="day name-day-week">
        <div class="day-wrap">Вт</div>
      </div>
      <div class="day name-day-week">
        <div class="day-wrap">Ср</div>
      </div>
      <div class="day name-day-week">
        <div class="day-wrap">Чт</div>
      </div>
      <div class="day name-day-week">
        <div class="day-wrap">Пт</div>
      </div>
      <div class="day name-day-week">
        <div class="day-wrap">Сб</div>
      </div>
      <div class="day name-day-week">
        <div class="day-wrap">Вс</div>
      </div>

      <div
        v-for="(date, i) in month"
        :key="i"
        :class="[
          { today: today(date.day) },
          { interval: date.interval },
          { back: date.backMonth },
          { next: date.nextMonth },
          { isActive: isActive(date.day) },
          { new: date.showNew },
          'day'
        ]"
        @click="$emit('set-day', date.day)"
      >
        <div class="day-wrap">
          <div>{{ date.day | localRu }}</div>
          <slot name="events" :tasks="date.tasks"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isToday, isEqual } from 'date-fns'
export default {
  props: {
    activeDay: {
      type: Date,
      default: () => new Date(0),
      required: false
    },
    visibleMonth: {
      type: Date
    },
    month: {
      default: () => [],
      type: Array
    }
  },

  methods: {
    today(day) {
      return isToday(day)
    },
    isActive(day) {
      return isEqual(day, this.activeDay)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/pages/calendar';
</style>
