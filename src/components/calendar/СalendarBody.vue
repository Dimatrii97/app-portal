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
  name: 'CalendarBody',
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
.wrap {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(50px, auto);
}
.day-name{
  font-size: 1.2rem;
  color:$title;
  text-align: center;
  align-self: center;
  padding: 10px 0;
  background-color:$bg-gray;
}
.day::before {
  content: "";
  display: inline-block;
  height: 0;
  padding-bottom: 100%;
  width: 1px;
}
.day {
  background-color: #fff;
  color: $dark;
  text-align: center;
  position: relative;
  &.back,
  &.next {
    background-color: $bg-gray;
    color: $title;
  }
  &.today,
  &.isActive,
  &.isActiveStart,
  &.isActiveEnd {
    color: #fff;
  }
  &.today::before,
  &.isActive::before,
  &.isActiveStart::before,
  &.isActiveEnd::before {
    content: "";
    position: absolute;
    left: 0;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
  }

  &.today::before {
    background-color: $blue;
  }

  &.isActive::before,
  &.isActiveStart::before {
    background-color: #8448c0;
  }
  &.isActiveEnd::before {
    background-color: #1739fa;
  }
}
.interval {
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    border-bottom: 2px solid $blue;
  }
  &.isActiveEnd::after,
  &.isActiveStart::after {
    background-color: transparent;
  }
}
.day-wrap {
  position: absolute;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tasks {
  display: flex;
  justify-content: center;
  align-items: center;
}
.task {
  $red: random(256)-1;
  $green: random(256)-1;
  $blue: random(256)-1;
  background-color: rgba($red, $green, $blue);
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.phontom::after {
  content: "+";
}
.new::after{
    content: "new";
    position: absolute;
    top: -5px;
    right: 6px;
    font-size: 15px;
    padding: 2px 3px;
    background: #ff4949;
    border-radius: 5px;
    color: #fff;
    transform: rotate(-18deg);
    @include _979 {
      font-size: 12px;
    }

}

</style>
