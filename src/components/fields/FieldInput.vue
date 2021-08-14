<template>
  <div>
    <input
      v-model="setValue"
      :id="$attrs.id"
      :type="$attrs.type || 'text'"
      :class="['form__field', { errors: $attrs.error }]"
    />
    <slot name="label"></slot>
  </div>
</template>
<script>
export default {
  name: 'FieldInput',
  inheritAttrs: false,
  props: {
    value: {
      default: '',
      type: String
    }
  },
  computed: {
    setValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
