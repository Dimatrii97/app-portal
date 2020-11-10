<template>
  <div :class="['form__group', { errors: error }]">
    <textarea
      v-model="setValue"
      :placeholder="config.name"
      :name="config.name"
      :id="config.name"
      ref="textArea"
      class="form__field"
      autocomplete="off"
      required
    >
    </textarea>
    <label :for="config.name" class="form__label">{{
      config.placeholder
    }}</label>
    <slot name="errors"></slot>
  </div>
</template>

<script>
import textarea from "@/plugins/texarea-mixin";
export default {
  props: {
    config: Object,
    value: String,
    error: {
      type: Boolean,
      default: false
    }
  },
  mixins: [textarea],
  computed: {
    setValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.mixin_textarea_resize(this.$refs.textArea);
      }
    }
  },
  methods: {
    clearResizeTextarea() {
      this.mixin_textarea_clearResize(this.$refs.textArea, "41px");
    }
  }
};
</script>
<style>
textarea.form__field {
  height: 41px;
}
</style>
