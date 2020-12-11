/* eslint-disable vue/no-parsing-error */
<template>
  <div class="subtasks">
    <div class="form__group form__group_a">
      <input
        v-model="textSubtask"
        @keyup.enter.stop="pushSubtask()"
        class="form__field"
        placeholder="Структура выполнения"
        name="Subtask"
        id="Subtask"
        type="text"
        autocomplete="off"
      />
      <label for="Subtask" class="form__label">Структура выполнения</label>
      <button
        @click="pushSubtask()"
        class="btn btn-ghost-primary btn-square"
        type="button"
      >
        +
      </button>
    </div>

    <ul v-if="value.length" class="field__list">
      <subtask-item
        v-for="(subtask, i) in value"
        :key="i"
        :subtask="subtask"
        @change-item="changeItem($event)"
        @delete-item="deleteItem($event)"
      >
      </subtask-item>
    </ul>
  </div>
</template>

<script>
import SubtaskItem from "./FieldListItem";

export default {
  props: {
    value: Array
  },

  components: {
    SubtaskItem
  },

  data() {
    return {
      textSubtask: ""
    };
  },

  methods: {
    pushSubtask() {
      if (this.textSubtask == "") return;
      this.$emit("input", { title: this.textSubtask, type: "add" });
      this.textSubtask = "";
    },
    changeItem(e) {
      this.$emit("input", { type: "change", ...e });
    },
    deleteItem(e) {
      this.$emit("input", { type: "delete", ...e });
    }
  }
};
</script>

<style lang="scss" scoped>
.subtasks {
  position: relative;
  & .field__list {
    max-height: 100px;
    z-index: 11;
  }
}
</style>
