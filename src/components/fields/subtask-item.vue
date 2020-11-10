<template>
  <li class="form__item" v-click-outside="changeItem">
    <span v-if="settings" @click="changeSettings()" class="form__selected"
      >{{ subtask.title }}
      <i
        @click.stop="$emit('delete-item', { id: $vnode.key })"
        class="icon-close"
      ></i>
    </span>
    <span class="form__selected" v-else>
      <textarea
        v-model="setValue"
        ref="input-edit"
        @focus="mixin_textarea_resize($refs['input-edit'])"
        class="form__selected-input"
        type="text"
        autocomplete="off"
      >
      </textarea>
      <i @click.stop="changeItem()" class="icon-edit"></i>
    </span>
  </li>
</template>

<script>
import textarea from "@/plugins/texarea-mixin";
export default {
  props: {
    subtask: Object,
    max: Number
  },

  mixins: [textarea],

  data() {
    return {
      settings: true,
      copySubtask: this.subtask.title
    };
  },
  computed: {
    setValue: {
      get() {
        return this.copySubtask;
      },
      set(value) {
        this.copySubtask = value;
        this.mixin_textarea_resize(this.$refs["input-edit"]);
      }
    }
  },
  methods: {
    changeItem() {
      this.settings = true;
      if (
        this.copySubtask != this.subtask.title &&
        this.copySubtask.length < this.max
      ) {
        if (!this.copySubtask) {
          this.$emit("delete-item", { id: this.$vnode.key });
          return;
        }
        this.$emit("changeItem", {
          id: this.$vnode.key,
          title: this.copySubtask
        });
      } else this.copySubtask = this.subtask.title;
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
