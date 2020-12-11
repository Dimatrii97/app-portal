<template>
  <div :class="['form__group', { errors: error }]">
    <input
      v-model="setValue"
      :placeholder="config.name"
      :name="config.name"
      :id="config.name"
      :type="config.type || 'input'"
      class="form__field"
      autocomplete="off"
      required
    />
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
      }
    }
  }
};
</script>
