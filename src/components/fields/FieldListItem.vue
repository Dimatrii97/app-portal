<template>
  <li v-click-outside="changeItem" class="dropdown__content">
    <span v-if="settings" @click="changeSettings()" class="dropdown__item"
      >{{ item }}
      <i @click.stop="$emit('delete-item')" class="icon-close"></i>
    </span>
    <span class="dropdown__item" v-else>
      <input
        v-model="setValue"
        ref="input-edit"
        class="dropdown__item-input"
        type="text"
        autocomplete="off"
      />

      <i @click.stop="changeItem()" class="icon-edit"></i>
    </span>
  </li>
</template>

<script>
export default {
  name: 'FieldListItem',
  props: {
    item: {
      default: '',
      type: String
    }
  },

  data() {
    return {
      settings: true,
      copyItem: this.item
    }
  },
  computed: {
    setValue: {
      get() {
        return this.copyItem
      },
      set(value) {
        this.copyItem = value
      }
    }
  },
  methods: {
    changeItem() {
      this.settings = true
      if (this.copyItem != this.item) {
        this.$emit('change-item', this.copyItem)
      } else this.copyItem = this.item
    },
    async changeSettings() {
      this.settings = false
      await this.$nextTick()
      this.$refs['input-edit'].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  &__item {
    justify-content: space-between;
    //.dropdown__item-input
    &-input {
      flex-grow: 1;
      color: $text-dark;
      border: none;
      background: transparent;
      padding: 0;
    }
  }
  //.dropdown__content
  &__content {
    margin: 5px 0 5px 0;
  }
}

.icon-close,
.icon-edit {
  color: $blue;
  border-color: $blue;
}
</style>
