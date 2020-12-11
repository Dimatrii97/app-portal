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
export default {
  props: {
    config: Object,
    value: String,
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.resizeTextarea();
      }
    }
  },
  methods: {
    resizeTextarea() {
      this.$refs.textArea.style.height = "5px";
      this.$refs.textArea.style.height =
        this.$refs.textArea.scrollHeight + "px";
    },
    clearResizeTextarea() {
      this.$refs.textArea.style.height = "41px";
    }
  }
};
</script>
<style>
textarea.form__field {
  height: 41px;
}
</style>
