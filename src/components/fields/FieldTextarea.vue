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
import textareaMixin from '@/plugins/mixins/textarea'
export default {
  inheritAttrs: false,
  name: 'FormTextarea',
  props: {
    value: {
      default: '',
      type: String
    }
  },
  mixins: [textareaMixin],
  computed: {
    setValue: {
      get() {
        return this.value
      },
      set(value) {
        this.m_textarea_resize(this.$refs.textarea)
        this.$emit('input', value)
      }
    }
  },
  watch: {
    value(newValue) {
      if (!newValue) this.m_textarea_clearResize(this.$refs.textarea)
    }
  }
}
</script>
<style>
textarea.form__field {
  height: 41px;
  max-height: 230px;
}
</style>
