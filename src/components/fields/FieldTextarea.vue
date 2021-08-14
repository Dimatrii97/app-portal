<template>
  <div>
    <slot name="prepend"></slot>
    <i
      v-if="prependIcon"
      @click="$emit('prepen-icon')"
      :class="[prependIcon, 'prependIcon']"
    ></i>
    <textarea
      v-bind="{ ...$attrs, value }"
      v-on="listeners"
      ref="textarea"
      :class="['form__field', { errors: error }]"
    />

    <slot name="label"></slot>
    <i
      v-if="appendIcon"
      @click="$emit('append-icon')"
      :class="[appendIcon, 'appendIcon']"
    ></i>
    <slot name="append"></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'FieldTextarea',
  props: {
    value: {
      default: '',
      type: String
    },
    error: Boolean,
    prependIcon: String,
    appendIcon: String
  },

  computed: {
    // setValue: {
    //   get() {
    //     return this.value
    //   },
    //   set(value) {
    //     this.textareaResize()
    //     this.$emit('input', value)
    //   }
    // }
    listeners() {
      return {
        ...this.$listeners,
        input: $event => {
          this.textareaResize()
          this.$emit('input', $event.target.value)
        }
      }
    }
    // attrs() {
    //   return {
    //     ...this.$attrs,
    //     value: ''
    //   }
    // }
  },
  watch: {
    value(newValue) {
      if (!newValue) this.textareaClearResize()
    }
  },

  methods: {
    textareaResize() {
      this.$refs.textarea.style.height = '5px'
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
    },
    textareaClearResize() {
      this.$refs.textarea.style.height = '41px'
    }
  }
}
</script>
<style>
textarea.form__field {
  height: 41px;
  max-height: 130px;
}
</style>
