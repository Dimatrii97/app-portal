<template>
  <section class="page">
    <h2 class="main-title">Календарь</h2>
    <div class="calendar__wrapper">
      <div class="calendar__container">
        <article class="substrate">
          <Calendar-Body
            :activeDay="activeDay"
            :visibleMonth="visibleMonth"
            :month="getMonth"
            @set-day="setActiveDay($event)"
          >
            <template #header>
              <Calendar-Header
                :visibleMonth="visibleMonth"
                @back="m_back()"
                @next="m_next()"
              />
            </template>
            <template #events="propsSlot">
              <div :class="['tasks', { phontom: hide(propsSlot.tasks) }]">
                <div
                  v-for="(task, i) in sliceHide(propsSlot.tasks)"
                  :key="i"
                  :style="{ backgroundColor: task.color }"
                  class="task"
                ></div>
              </div>
            </template>
          </Calendar-Body>
        </article>
      </div>
      <div class="calendar__tasks">
        <article class="substrate">
          <Calendar-Task-List
            v-for="task in getTasksDay"
            :key="task.id"
            :isOpen="task.id === openTaskId"
            :task="task"
            @open="toggleTask($event)"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import CalendarTaskList from '@/components/calendar/CalendarTaskList.vue'
import CalendarHeader from '@/components/calendar/CalendarHeader.vue'
import CalendarBody from '@/components/calendar/СalendarBody'
import CalendarRouter from '@/plugins/mixins/calendar-router'
import { Month } from '@/components/calendar/CreateCalendar'
import { mapGetters } from 'vuex'
export default {
  components: {
    CalendarBody,
    CalendarHeader,
    CalendarTaskList
  },
  mixins: [CalendarRouter],

  data() {
    return {
      activeDay: new Date(),
      visibleMonth: new Date(),
      tasksDay: [],
      openTaskId: ''
    }
  },
  computed: {
    ...mapGetters('tasks', { events: 'getTasks' }),

    getMonth() {
      return Month.createMonth(this.visibleMonth)
        .setTasks(this.events)
        .getMonth()
    },

    getTasksDay() {
      return this.events.filter(task => {
        return this.isWithinInterval(task.startdate, task.deadline)
      })
    }
  },

  watch: {
    getTasksDay(newValue) {
      this.$store.dispatch(
        'tasks/thereAreTaskInfo',
        newValue.map(i => i.id)
      )
    }
  },

  methods: {
    setActiveDay(date) {
      this.activeDay = date
    },

    toggleTask(idTasks) {
      this.openTaskId == idTasks
        ? (this.openTaskId = '')
        : (this.openTaskId = idTasks)
    },

    setTasks(id) {
      this.tasksDay = id
    },

    isWithinInterval(startdate, deadline) {
      let stD = new Date(startdate).setHours(0, 0, 0, 0)
      let dlD = new Date(deadline).setHours(0, 0, 0, 0)
      let firstB = stD <= this.activeDay
      let LastB = this.activeDay <= dlD
      return firstB && LastB
    },

    sliceHide(arr) {
      if (arr) return arr.slice(0, 3)
      return null
    },

    hide(tasks) {
      return tasks && tasks.length > 4
    }
  }
}
</script>
<style lang="scss" scoped>
.calendar {
  &__wrapper {
    display: flex;
  }
  &__container {
    margin-right: 20px;
    flex: 1;
  }
  &__tasks {
    flex: 0 0 40%;
    max-width: 490px;
    & .substrate {
      height: 100%;
    }
  }
  @include _768 {
    &__wrapper {
      flex-direction: column;
    }
    &__tasks {
      margin-top: 20px;
      max-width: inherit;
    }
    &__container {
      margin-right: 0px;
    }
  }
}
.calendar-wrapper {
  display: flex;
}
</style>
