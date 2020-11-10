<template>
  <section class="page">
    <h2 class="main-title">Календарь</h2>
    <div class="calendar__wrapper">
      <div class="calendar__container">
        <article class="substrate">
          <the-calendar
            :activeDay="activeDay"
            :visibleMonth="visibleMonth"
            :events="calendarEvents"
            @setTasks="setTasks($event)"
            @setDay="setActiveDay($event)"
          >
            <template #header>
              <header-c
                :visibleMonth="visibleMonth"
                @back="back()"
                @next="next()"
              />
            </template>
          </the-calendar>
        </article>
      </div>
      <div class="calendar__tasks">
        <article class="substrate">
          <task-list
            v-for="task in idTasksDay"
            :key="task.id"
            :isOpen="task.id === openTaskId"
            :task="task"
            @open="setOpenTask($event)"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import TaskList from "@/components/calendar/task-list.vue";
import HeaderC from "@/components/calendar/headerDefault.vue";
import theCalendar from "@/components/calendar/calendarBody.vue";
import { addMonths, subMonths } from "date-fns";
import { mapGetters } from "vuex";
export default {
  components: {
    theCalendar,
    HeaderC,
    TaskList
  },
  data() {
    return {
      activeDay: new Date(),
      visibleMonth: new Date(),
      tasksDay: [],
      openTaskId: ""
    };
  },
  computed: {
    ...mapGetters("tasks", { events: "getTasks" }),
    idTasksDay() {
      return this.events.filter(task => {
        return this.tasksDay.includes(task.id);
      });
    },
    calendarEvents() {
      return this.events.map(({ id, startdate, deadline, color, scanned }) => {
        return { id, startdate, deadline, color, scanned };
      });
    }
  },
  watch: {
    idTasksDay(newValue) {
      this.$store.dispatch(
        "tasks/thereAreTaskInfo",
        newValue.map(i => i.id)
      );
    }
  },
  methods: {
    setActiveDay(date) {
      this.activeDay = date;
    },
    back() {
      this.visibleMonth = subMonths(this.visibleMonth, 1);
    },
    next() {
      this.visibleMonth = addMonths(this.visibleMonth, 1);
    },
    setOpenTask(idTasks) {
      this.openTaskId = this.openTaskId === idTasks ? "" : idTasks;
    },
    setTasks(id) {
      this.tasksDay = id;
    }
  }
};
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
