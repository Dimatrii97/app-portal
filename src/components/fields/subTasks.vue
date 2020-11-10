/* eslint-disable vue/no-parsing-error */
<template>
  <div class="subtasks">
    <div
      :class="[
        { errors: $v.textSubtask.$error },
        'form__group',
        'form__group_a'
      ]"
    >
      <input
        v-model="$v.textSubtask.$model"
        @keyup.enter.stop="pushSubtask()"
        class="form__field"
        placeholder="Структура выполнения"
        name="Subtask"
        id="Subtask"
        type="text"
        autocomplete="off"
      />
      <label for="Subtask" class="form__label">Структура выполнения</label>
      <button @click="pushSubtask()" class="btn-ghost__square" type="button">
        +
      </button>
    </div>

    <ul v-if="value.length" class="field__list">
      <subtask-item
        v-for="(subtask, i) in value"
        :key="i"
        :subtask="subtask"
        :max="$v.textSubtask.$params.maxLength.max"
        @changeItem="changeItem($event)"
        @delete-item="deleteItem($event)"
      >
      </subtask-item>
    </ul>
    <div class="error" v-if="!$v.textSubtask.maxLength">
      Поле должно содержать меньше
      {{ $v.textSubtask.$params.maxLength.max }} симвлов.
    </div>
  </div>
</template>

<script>
import subtaskItem from "./subtask-item";
import { maxLength } from "vuelidate/lib/validators";
export default {
  props: {
    value: Array
  },

  components: {
    subtaskItem
  },

  data() {
    return {
      textSubtask: ""
    };
  },
  validations: {
    textSubtask: {
      maxLength: maxLength(180)
    }
  },

  methods: {
    pushSubtask() {
      if (!this.$v.textSubtask.$invalid && !this.textSubtask == "") {
        this.$emit("input", { title: this.textSubtask, type: "add" });
        this.textSubtask = "";
      }
      return;
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
    position: relative;
  }
}
</style>
