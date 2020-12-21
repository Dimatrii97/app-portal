<template>
  <div>
    <textarea
      v-model="setValue"
      ref="textarea"
      :class="['form__field', { errors: $attrs.error }]"
      :id="$attrs.id"
    />
    <slot name="label"></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "FormTextarea",
  props: {
    value: {
      default: "",
      type: String
    }
  },
  computed: {
    setValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.textarea_resize();
        this.$emit("input", value);
      }
    }
  },
  watch: {
    value(newValue) {
      if (!newValue) this.textarea_clearResize();
    }
  },
  methods: {
    textarea_resize() {
      this.$refs.textarea.style.height = "5px";
      this.$refs.textarea.style.height =
        this.$refs.textarea.scrollHeight + "px";
    },
    textarea_clearResize() {
      this.$refs.textarea.style.height = "41px";
    }
  }
};
</script>
<style>
textarea.form__field {
  height: 41px;
  max-height: 230px;
}
</style>
