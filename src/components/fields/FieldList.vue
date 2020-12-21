<template>
  <div v-click-outside="outside">
    <div :class="[{ focus: isFocus }, { errors: $attrs.error }, 'multi-field']">
      <input
        v-model="textSubtask"
        :placeholder="$attrs.placeholder"
        :id="$attrs.id"
        @keyup.enter.stop="pushSubtask()"
        @focus="focus = true"
        class="form__field"
        type="text"
        autocomplete="off"
        ref="input"
      />

      <slot name="label"></slot>

      <button
        @click="pushSubtask()"
        class="btn btn-ghost-primary btn-square"
        type="button"
      >
        +
      </button>
    </div>

    <ul v-if="value.length" class="dropdown">
      <Field-List-Item
        v-for="(item, i) in value"
        :key="i"
        :item="item"
        @change-item="changeItem(i, $event)"
        @delete-item="deleteItem(i)"
      />
    </ul>
  </div>
</template>

<script>
import FieldListItem from "./FieldListItem";
export default {
  inheritAttrs: false,
  props: {
    value: {
      default: () => [],
      type: Array
    }
  },

  components: {
    FieldListItem
  },

  data() {
    return {
      textSubtask: "",
      focus: false
    };
  },

  computed: {
    isFocus() {
      return this.focus || this.textSubtask;
    }
  },

  methods: {
    pushSubtask() {
      this.$refs.input.focus();
      if (!(this.textSubtask === "")) {
        let newValue = [...this.value];
        newValue.push(this.textSubtask);
        this.$emit("input", newValue);
      }
      this.textSubtask = "";
    },
    changeItem(index, newItem) {
      let newValue = [...this.value];
      newValue[index] = newItem;
      this.$emit("input", newValue);
    },
    deleteItem(index) {
      let newValue = [...this.value];
      newValue.splice(index, 1);
      this.$emit("input", newValue);
    },
    outside() {
      this.focus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  z-index: 9;
  max-height: 90px;
}
</style>
