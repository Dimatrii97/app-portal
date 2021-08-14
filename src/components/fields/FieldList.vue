<template>
  <div @blur.capture="handleBlur($event)">
    <div
      :class="[
        { focus: optionsVisible },
        { errors: $attrs.error },
        'multi-field'
      ]"
    >
      <input
        v-model="textSubtask"
        :placeholder="$attrs.placeholder"
        :id="$attrs.id"
        @keyup.enter.prevent="pushSubtask()"
        @focus="showOptions()"
        class="form__field"
        type="text"
        autocomplete="off"
        ref="input"
      />

      <slot name="label"></slot>
      <V-Btn
        @click="pushSubtask()"
        class="btn btn-ghost-primary btn-square"
        type="button"
        >+</V-Btn
      >
    </div>

    <ul v-if="value.length" class="dropdown">
      <Field-List-Item
        v-for="(item, i) in value"
        :key="i"
        :item="item"
        @change-item="changeItem(i, $event)"
        @delete-item="deleteItem(i)"
      />
    </ul>
  </div>
</template>

<script>
import FieldListItem from './FieldListItem'
export default {
  name: 'FieldList',
  inheritAttrs: false,
  props: {
    value: {
      default: () => [],
      type: Array
    }
  },

  components: {
    FieldListItem
  },

  data() {
    return {
      textSubtask: '',
      optionsVisible: false
    }
  },

  computed: {
    isFocus() {
      return this.optionsVisible || this.textSubtask
    }
  },

  methods: {
    handleBlur(e) {
      if (this.$el.contains(e.relatedTarget)) return
      this.hideOptions()
    },
    hideOptions() {
      this.optionsVisible = false
    },
    showOptions() {
      this.optionsVisible = true
    },
    pushSubtask() {
      this.$refs.input.focus()
      if (!(this.textSubtask === '')) {
        let newValue = [...this.value]
        newValue.push(this.textSubtask)
        this.$emit('input', newValue)
      }
      this.textSubtask = ''
    },
    changeItem(index, newItem) {
      let newValue = [...this.value]
      newValue[index] = newItem
      this.$emit('input', newValue)
    },
    deleteItem(index) {
      let newValue = [...this.value]
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.form__group .form__label {
  font-size: 1rem;
  top: 0px;
}
.dropdown {
  z-index: 9;
  max-height: 90px;
}
</style>
