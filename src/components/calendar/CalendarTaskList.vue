<template>
  <div
    :style="{ backgroundColor: task.color }"
    @click="open()"
    class="task-list"
  >
    <div class="task-list__row">
      <h3 class="task-list__title">
        {{ task.title }}
      </h3>
      <div :class="['task-list__users', { phontom: hide }]">
        <Img-User
          v-for="(user, i) in sliceHide"
          :src="user.name"
          :key="i"
          class="user-item sm"
        />
      </div>
    </div>
    <Transition-Expand>
      <div v-if="isOpen" @click.stop="" class="task-list__all">
        <div class="task-list__subtitle">
          <h3 class="task-list__title">Задача:</h3>
          <p v-html="additionalInfo.subtitle" class="task-list__text"></p>
        </div>
        <div v-show="additionalInfo.subtasks.length">
          <h3 class="task-list__title">Структура выполнения:</h3>
          <ul class="subtasks">
            <li
              v-for="subTask in subtasks"
              :key="subTask.id + 'subtasks' + subTask.status"
            >
              <!-- TODO: переписать на check  :disabled="subtask.status" -->
              <div
                v-if="!subTask.status"
                @click="performSubTask(subTask.id)"
                class="subtasks__item"
              >
                <div class="circle uncom">
                  <i
                    :class="{ ['icon-check']: changes.includes(subTask.id) }"
                  ></i>
                </div>
                <p class="task-list__text">{{ subTask.title }}</p>
              </div>
              <div v-else class="subtasks__item">
                <div class="circle com"><i class="icon-check"></i></div>
                <p class="task-list__text">{{ subTask.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="task-list__executors">
          <h3 class="task-list__title">Исполнительный состав:</h3>
          <V-Chip
            v-for="(user, i) in additionalInfo.users"
            :key="i"
            :user="user"
          />
        </div>
        <div class="task-list__date">
          <h3 class="task-list__title">
            Дата начала:
            <div class="task-list__text">{{ task.startdate }}.</div>
          </h3>
          <h3 class="task-list__title">
            Дата окончания:
            <div class="task-list__text">{{ task.deadline }}.</div>
          </h3>
        </div>
        <div class="button-left">
          <V-Btn
            v-if="allComplite"
            @click="completeTask()"
            class="btn btn-primary"
          >
            Выполнить задачу
          </V-Btn>
          <V-Btn
            v-else
            :disabled="!changes.length"
            @click="updateSubTask()"
            class="btn btn-primary"
          >
            Принять изменения
          </V-Btn>
        </div>
      </div>
    </Transition-Expand>
  </div>
</template>
<script>
import TransitionExpand from '@/components/transition-expand'
import ImgUser from '@/components/ImgUser.vue'
import VChip from '../chips'
import { mapGetters } from 'vuex'
export default {
  name: 'CalendarTaskList',
  components: {
    ImgUser,
    VChip,
    TransitionExpand
  },
  data() {
    return {
      changes: []
    }
  },
  updated() {
    console.log('uptade')
  },
  props: {
    additionalInfo: Object,
    isOpen: {
      default: false,
      type: Boolean
    },
    task: {
      default: () => {},
      type: Object
    }
  },
  mounted() {
    // this.$store.dispatch('users/thereAreUsers', this.usersIdArray)
  },
  computed: {
    ...mapGetters('user', { user: 'getUserHeaderInfo' }),
    // additionalInfo() {
    //   return 3
    //   // this.$store.getters['tasks/getFindAdditional'](this.$vnode.key)
    // },
    users() {
      // let h = this.$store.getters['users/findUserId'](this.usersIdArray)
      // return h
      return 3
    },
    subtasks() {
      return this.additionalInfo.subtasks
    },
    sliceHide() {
      if (this.users.length) return this.users.slice(0, 3)
      return null
    },
    hide() {
      return this.users && this.users.length >= 4
    },
    usersIdArray() {
      return this.task.users.map(i => i.id)
    },
    allComplite() {
      if (this.additionalInfo.subtasks) {
        return this.additionalInfo.subtasks.every(task => task.status)
      }
      return false
    }
  },
  methods: {
    open() {
      this.$emit('open', this.$vnode.key)
      if (!this.task.scanned)
        this.$emit('scanned-task', {
          name: 'updateViewedTask',
          payload: this.$vnode.key
        })
    },
    performSubTask(id) {
      if (!this.changes.includes(id)) {
        this.changes.push(id)
        return
      }
      this.changes.splice(this.changes.indexOf(id), 1)
    },
    updateSubTask() {
      this.$emit('update-subtask', {
        name: 'updateSubtasks',
        payload: this.changes
      })
      this.changes = []
      this.showModal = false
    },
    completeTask() {
      this.$emit('complite', { name: 'completeTask', payload: this.$vnode.key })
      this.showModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
.task-list {
  margin: 10px 0;
  padding: 10px 8px;
  border-radius: 10px;
  color: #fff;
  // .task-list__row
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // .task-list__title
  &__title {
    font-size: 1.4rem;
    word-break: break-all;
  }
  // .task-list__all
  &__all {
    margin-top: 20px;
  }
  // .task-list__users
  &__users {
    display: flex;
    position: relative;
  }
  //.task-list__subtitle
  // .tas-listk__date
  &__subtitle,
  &__date,
  &__executors {
    margin-bottom: 10px;
    & .task__title {
      margin-bottom: 5px;
    }
  }
  &__executors {
    .chip {
      box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.21);
      margin-top: 8px;
    }
  }
  // .task-list__text
  &__text {
    font-size: 1.2rem;
    word-break: break-all;
  }
}
.user-item {
  margin: 0 3px;
}
.subtasks {
  max-height: 350px;
  overflow: auto;
  margin-top: 10px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(63, 63, 63);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(47, 47, 47);
  }
  // .subtasks__item
  & .task-list__title {
    margin-bottom: 5px;
  }
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 10px;
    margin: 10px 0;
    font-size: 1.2rem;
    cursor: pointer;
    & .task-list__text {
      margin: 0 0 0 15px;
      margin-left: 39px;
    }
  }
}
.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 31px;
  &.com {
    background-color: $blue;
    color: #fff;
    position: absolute;
    left: 0;
    font-size: 0.8rem;
  }
  &.uncom {
    border: 2px solid #fff;
    color: #fff;
    position: absolute;
    left: 0;
    font-size: 0.8rem;
  }
  &.border {
    border: 1px solid $blue;
    color: $blue;
  }
}
.phontom::after {
  content: '+';
  font-size: 1.8rem;
  position: absolute;
  top: -18px;
  right: -4px;
}
</style>
