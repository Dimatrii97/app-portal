<template>
  <div v-click-outside="outside" @click="inside()" class="select">
    <div
      :class="[
        { focus: showList },
        { errors: error },
        'form__group',
        'form__group_a'
      ]"
    >
      <p class="select__title">{{ titleSelect }}</p>
      <p class="select__icon" @click="onIcons($event)">
        <i v-if="showList" class="icon-arrow-top"></i>
        <i v-else class="icon-arrow-bottom"></i>
      </p>
      <label :class="[inputActive, 'form__label']" for="autocomplit">
        {{ placeholder }}
      </label>
    </div>
    <slot name="errors"></slot>
    <transition name="list">
      <ul v-if="showList" class="field__list">
        <li
          v-for="(item, i) of docs"
          @click="updateActive(item)"
          :key="i"
          class="select__item"
        >
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    wait: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "Выберите категорию"
    },
    recovery: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showList: false,
      active: ""
    };
  },
  computed: {
    titleSelect() {
      if (this.active) return this.active;
      return "";
    },
    docs() {
      if (this.recovery) {
        let newValue = [...this.value];
        newValue.unshift(this.placeholder);
        return newValue;
      }
      return this.value;
    },
    inputActive() {
      return this.active ? "filled" : "empty";
    }
  },
  beforeDestroy() {
    this.$emit("input", "");
  },

  methods: {
    outside() {
      this.showList = false;
    },
    inside() {
      if (this.wait) {
        this.showList = true;
      }
    },
    updateActive(update) {
      if (update === this.placeholder) {
        update = "";
      }
      this.$emit("input", update);
      this.showList = false;
      this.active = update;
    },
    onIcons(e) {
      if (this.showList) {
        e.stopPropagation();
        this.showList = false;
      }
    },
    clearEl() {
      this.$emit("input", "");
      (this.showList = false), (this.active = "");
    }
  }
};
</script>
<style lang="scss" scoped>
.select {
  color: $title;
  font-size: 1.3rem;
  position: relative;
  &__title {
    flex: 1;
    padding: 7px 0;
    height: 39px;
  }
  // .select__icon
  &__icon {
    align-self: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  & .field__list {
    max-height: 150px;
    z-index: 15;
  }
  // .select__item
  &__item {
    &:first-child,
    &:last-child {
      margin: 2px 0;
    }
    background: $bg-gray;
    padding: 10px 5px;
    margin: 10px 0;
    border-radius: 10px;
  }
}
ul.select__list {
  padding: 0 5px;
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
