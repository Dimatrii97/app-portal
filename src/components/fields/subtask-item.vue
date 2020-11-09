<template>
  <li class="form__item">
    <span v-if="settings" @click="changeSettings()" class="form__selected"
      >{{ subtask.title }}
      <i
        @click.stop="$emit('deleteItem', { id: $vnode.key })"
        class="icon-close"
      ></i>
    </span>
    <span class="form__selected" v-else>
      <input
        v-model="copySubtask"
        ref="input-edit"
        @blur="changeItem()"
        class="form__selected-input"
        type="text"
        autocomplete="off"
      />
      <i class="icon-edit"></i>
    </span>
  </li>
</template>

<script>
export default {
  props: {
    subtask: Object
  },

  data() {
    return {
      settings: true,
      copySubtask: this.subtask.title
    };
  },

  methods: {
    changeItem() {
      this.settings = true;
      if (this.copySubtask != this.subtask.title)
        this.$emit("changeItem", {
          id: this.$vnode.key,
          title: this.copySubtask
        });
    },
    changeSettings() {
      this.settings = false;
      this.$nextTick(() => {
        this.$refs["input-edit"].focus();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form__selected {
  justify-content: space-between;
}
.icon-close,
.icon-edit {
  color: $blue;
  border-color: $blue;
}
</style>
