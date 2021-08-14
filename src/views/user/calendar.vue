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
            <template #events="{tasks}">
              <div :class="['tasks', { phontom: hide(tasks) }]">
                <div
                  v-for="(task, i) in sliceHide(tasks)"
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
            :additionalInfo="additionalEvents[task.id]"
            @open="toggleTask($event)"
            @scanned-task="setUpdateTask($event)"
            @update-subtask="setUpdateTask($event)"
            @complite="setUpdateTask($event)"
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
import { emit, subscribe } from '@/websocket/websocket.js'
import * as apiTask from '@/api/task.js'
// import { mapGetters } from 'vuex'
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
      events: [],
      additionalEvents: {},
      openTaskId: ''
    }
  },
  computed: {
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
  async created() {
    this.events = await apiTask.all()
    subscribe('setTaskAdditional', this.setAdditionalEvents)
    subscribe('updatedSubtask', this.updateSubTask)
    subscribe('updateViewedTask', this.updateScanned)
  },

  watch: {
    getTasksDay(newValue) {
      emit(
        'getTaskById',
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
    setAdditionalEvents(events) {
      events.forEach(el => {
        this.additionalEvents[el.id] = el
      })
    },

    setUpdateTask({ name, payload }) {
      emit(name, payload)
      // completeTask
      // viewedTask
    },

    updateSubTask({ idSubtasks, taskId }) {
      console.log(this.additionalEvents[taskId].subtasks, idSubtasks)
      const newSubtasks = this.additionalEvents[taskId].subtasks
      for (const id of idSubtasks) {
        const index = this.additionalEvents[taskId].subtasks.findIndex(
          el => el.id === id
        )
        newSubtasks[index].scanned = true
      }
      this.$set(this.additionalEvents[taskId], 'subtasks', newSubtasks)
      // this.additionalEvents[taskId].subtasks = this.additionalEvents[
      //   taskId
      // ].subtasks.map(el => {
      //   if (idSubtasks.includes(el.id)) {
      //     el.status = true
      //   }
      //   return el
      // })
    },

    updateScanned(id) {
      console.log('111134')
      this.events = this.events.map(el => {
        if (el.id == id) el.scanned = true
        return el
      })
    },
    complite(id) {
      const index = this.events.findIndex(el => el.id === id)
      this.events.slice(index, 1)
      this.$delete(this.additionalEvents, id)
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
