<template>
  <div
    :class="[
      'dropdown__item',
      { active: params.isActive },
      { selected: params.isSelected }
    ]"
  >
    {{ item }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default: '',
      type: String
    },
    params: {
      default: () => {},
      type: [Object, Array]
    }
  }
}
</script>
<style lang="scss" scoped>
//.dropdown__item
.dropdown__item {
  //.dropdown__item.active
  &.active {
    border: 1.5px solid $blue;
  }
  //.dropdown__item.selected
  &.selected {
    background: #4f88f1bf;
    color: #ffffffcf;
  }
}
</style>
