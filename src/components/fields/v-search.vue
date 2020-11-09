<template>
  <transition-group :class="[className, 'input-clear']" tag="div" name="search">
    <div
      v-if="!isShowInput"
      @click="toggleSearch()"
      key="title"
      class="input-clear__title title"
    >
      {{ title }}
    </div>
    <i @click="toggleSearch()" :key="isShowInput" class="icon-search"></i>
    <input
      v-if="isShowInput"
      key="input"
      @input="onEmit($event)"
      :value="value"
      :placeholder="placeholder"
      ref="input"
      autocomplete="off"
      class="input-clear__input"
      type="text"
    />
  </transition-group>
</template>

<script>
import { debounce } from "@/utils/throttling";
export default {
  props: {
    className: String,
    title: String,
    value: String,
    placeholder: {
      type: String,
      default: "Поиск"
    }
  },
  data() {
    return {
      isShowInput: false
    };
  },
  computed: {
    debounceInput() {
      return debounce(function(value) {
        this.$emit("input", value);
      }, 400);
    }
  },
  beforeDestroy() {
    this.$emit("input", "");
  },
  methods: {
    toggleSearch() {
      this.isShowInput = !this.isShowInput;
      if (this.isShowInput)
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      else {
        this.$emit("input", "");
      }
    },
    onEmit(e) {
      this.debounceInput(e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-clear {
  display: flex;
  align-items: center;
  position: relative;
  color: $title;
  transition: 0.5s;
  cursor: pointer;
  &__input {
    flex: 1 0;
    margin-left: 10px;
    border: none;
    background-color: transparent;
    color: $title;
    padding: 0;
    &::placeholder {
      color: $title;
    }
  }
  &__title {
    margin-right: 45px;
  }
}
.search-enter {
  opacity: 0;
  position: absolute;
  transform: translateX(30px);
}
.search-enter-to {
  opacity: 1;
  &.icon-search {
    opacity: 0;
  }
  transform: translateX(0);
}
.search-enter-active,
.search-leave-active {
  transition: 0.5s;
  &.input-clear__input {
    position: absolute;
    width: 10px;
  }
  &.title {
    position: absolute;
    white-space: nowrap;
  }
}
.search-leave-to {
  transform: translateX(-30px);
  position: absolute;
  opacity: 0;
}
</style>
