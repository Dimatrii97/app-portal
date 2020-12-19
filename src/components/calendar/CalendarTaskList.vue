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
        <img-user
          v-for="(user, i) in sliceHide"
          :src="{ img: user.img, name: user.name }"
          :key="i"
          className="sm"
          class="user-item"
        />
      </div>
    </div>
    <transition-expand>
      <div v-if="isOpen" @click.stop="" class="task-list__all">
        <div class="task-list__subtitle">
          <h3 class="task-list__title">Задача:</h3>
          <p class="task-list__text" v-html="additionalInfo.subtitle"></p>
        </div>
        <div v-show="additionalInfo.subtasks.length">
          <h3 class="task-list__title">Структура выполнения:</h3>
          <ul class="subtasks">
            <li v-for="subTask in additionalInfo.subtasks" :key="subTask.id">
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
          <v-chip v-for="(user, i) in users" :key="i" :user="user" />
          <v-chip :user="user" />
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
          <button v-if="allComplite" @click="next()" class="btn btn-primary">
            Выполнить задачу
          </button>
          <button
            v-else
            class="btn btn-primary"
            @click="next()"
            :disabled="!changes.length"
          >
            Принять изменения
          </button>
        </div>
      </div>
    </transition-expand>
  </div>
</template>
<script>
import TransitionExpand from "../transition-expand.vue";
import ImgUser from "@/components/ImgUser.vue";
import vChip from "@/components/chips";
import { mapGetters } from "vuex";
export default {
  components: {
    ImgUser,
    vChip,
    TransitionExpand
  },
  data() {
    return {
      changes: []
    };
  },
  props: {
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
    this.$store.dispatch("users/thereAreUsers", this.usersIdArray);
  },
  computed: {
    ...mapGetters("user", { user: "getUserHeaderInfo" }),
    additionalInfo() {
      return this.$store.getters["tasks/getFindAdditional"](this.$vnode.key);
    },
    users() {
      let h = this.$store.getters["users/findUserId"](this.usersIdArray);
      return h;
    },
    sliceHide() {
      if (this.users.length) return this.users.slice(0, 3);
      return null;
    },
    hide() {
      return this.users && this.users.length >= 4;
    },
    usersIdArray() {
      return this.task.users.map(i => i.id);
    },
    allComplite() {
      if (this.additionalInfo.subtasks) {
        return this.additionalInfo.subtasks.every(task => task.status);
      }
      return false;
    }
  },
  methods: {
    open() {
      this.$emit("open", this.$vnode.key);
      if (!this.task.scanned)
        this.$store.dispatch("tasks/viewedTask", this.$vnode.key);
    },
    performSubTask(id) {
      if (!this.changes.includes(id)) {
        this.changes.push(id);
        return;
      }
      this.changes.splice(this.changes.indexOf(id), 1);
    },
    updateSubTask() {
      this.$store.dispatch("tasks/updateSubTask", this.changes);
      this.changes = [];
    },
    completeTask() {
      this.$store.dispatch("tasks/completeTask", this.$vnode.key);
    },
    next() {
      if (!this.changes.length) {
        this.completeTask();
      } else {
        this.updateSubTask();
      }
      this.showModal = false;
    },
    enter(element) {
      const width = getComputedStyle(element).width;
      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";
      const height = getComputedStyle(element).height;
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;
      getComputedStyle(element).height;
      requestAnimationFrame(() => {
        element.style.height = height;
      });
    }
  }
};
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
  content: "+";
  font-size: 1.8rem;
  position: absolute;
  top: -18px;
  right: -4px;
}
</style>
