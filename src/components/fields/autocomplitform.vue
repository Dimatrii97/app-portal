<template>
  <div class="autocomplit" v-click-outside="outside" @click="inside()">
    <div class="autocomplit__wrapper">
      <div
        :class="[
          { focus: showList },
          { errors: error },
          'form__group',
          'form__group_a'
        ]"
      >
        <v-chip
          v-for="(user, i) in selectedUsers"
          @deleteChips="deleteUser($event)"
          :close="true"
          :key="i"
          :user="user"
        />
        <div class="field">
          <input
            v-model="setTextInput"
            @focus="onShowList()"
            @keyup.up="onKeyUp()"
            @keyup.down="onKeyDown()"
            @keyup.enter="onEnter()"
            @keyup.delete="onBackspace()"
            :class="[{ focus: showList }, 'form__field']"
            type="input"
            name="autocomplit"
            ref="input"
            id="autocomplit"
            autocomplete="off"
          />
          <label :class="[inputActive, 'form__label']" for="autocomplit"
            >Назначить сотрудников
          </label>
          <div>
            <div @click="onIcons($event)" class="form__icon">
              <i v-show="showList" class="icon-arrow-top"></i>
              <i v-show="!showList" class="icon-arrow-bottom"></i>
            </div>
          </div>
        </div>
      </div>
      <slot name="errors"></slot>
    </div>
    <transition-group
      tag="ul"
      name="list__item"
      class="field__list"
      ref="list"
      v-if="showList"
    >
      <li class="field__item" v-for="(user, i) in search" :key="user.user_id">
        <div
          @click="pushUser(user)"
          :class="['form__selected', isActive(i), isSelected(user.user_id)]"
        >
          <user-img
            :src="{ img: user.img, name: user.name }"
            class="form__selected-img"
            alt=""
          />
          <div class="form__selected-info">
            <span>{{ user.name }}</span>
            <p class="form__position-user">{{ user.position }}</p>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import vChip from "@/components/Permanent/chips";
import userImg from "@/components/Permanent/img-user";
export default {
  components: {
    vChip,
    userImg
  },

  props: {
    users: Array,
    error: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showList: false,
      textInput: "",
      selectedUsers: {},
      touchMe: false,
      toggleBackspace: true,
      activeUser: null
    };
  },

  computed: {
    search() {
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.textInput.toLowerCase());
      });
    },

    inputActive() {
      return JSON.stringify(this.selectedUsers) != "{}" || this.textInput
        ? "filled"
        : "empty";
    },

    isActiveUserNotNull() {
      return this.activeUser !== null;
    },

    heightElementList() {
      return window
        .getComputedStyle(this.$refs.list.$el.childNodes[0])
        .height.slice(0, -2);
    },

    setTextInput: {
      get() {
        return this.textInput;
      },
      set(values) {
        this.textInput = values;
        this.toggleBackspace = true;
      }
    }
  },
  methods: {
    outside() {
      this.showList = false;
    },
    inside() {
      this.$refs.input.focus();
    },
    onShowList() {
      this.showList = true;
    },
    pushUser(user) {
      if (this.selectedUsers[user.user_id]) this.deleteUser(user.user_id);
      else {
        this.$set(this.selectedUsers, user.user_id, user);
        this.emitIdUsers();
      }
      this.activeUser = null;
    },

    deleteUser(user_id) {
      this.$delete(this.selectedUsers, user_id);
      this.emitIdUsers();
    },

    onEnter() {
      if (this.activeUser !== null) this.pushUser(this.search[this.activeUser]);
    },

    onBackspace() {
      if (!this.toggleBackspace && Object.keys(this.selectedUsers).length) {
        let lastSelectedUser = Object.values(this.selectedUsers)[
          Object.keys(this.selectedUsers).length - 1
        ];
        this.deleteUser(lastSelectedUser.user_id);
      }
      if (!this.textInput) this.toggleBackspace = false;
    },

    onKeyUp() {
      if (this.isActiveUserNotNull && this.activeUser !== 0) {
        this.activeUser -= 1;
      } else {
        this.activeUser = this.search.length - 1;
      }
      this.scrollUp(this.activeUser);
    },

    onKeyDown() {
      if (
        this.isActiveUserNotNull &&
        this.activeUser !== this.search.length - 1
      ) {
        this.activeUser += 1;
      } else {
        this.activeUser = 0;
      }
      this.scrollUp(this.activeUser);
    },

    onIcons(e) {
      if (this.showList) {
        e.stopPropagation();
        this.showList = false;
        this.$refs.input.blur();
      }
    },

    emitIdUsers() {
      let idUsers = Object.keys(this.selectedUsers);
      this.$emit("input", idUsers);
    },

    scrollUp(num) {
      this.$refs.list.$el.scrollTop = +this.heightElementList * num;
    },

    isSelected(id) {
      return Object.prototype.hasOwnProperty.call(this.selectedUsers, id)
        ? "selected"
        : "";
    },

    isActive(i) {
      return this.activeUser === i ? "active" : "";
    },

    clearEl() {
      this.selectedUsers = {};
      this.emitIdUsers();
    }
  }
};
</script>

<style lang="scss" scoped>
.form__group_a {
  flex-wrap: wrap;
}
.field {
  min-width: 270px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.autocomplit__component {
  position: relative;
}
.autocomplit {
  position: relative;
  //.autocomplit .field__list
  & .field__list {
    z-index: 15;
  }
}
.autocomplit__input {
  padding-right: 24px;
}
.list__item-enter-active,
.list__item-leave-active {
  transition: all 1s;
}
.list__item-enter,
.list__item-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
