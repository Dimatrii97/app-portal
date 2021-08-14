<template functional>
  <label
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    class="form__label"
  >
    <slot></slot>
  </label>
</template>
<script>
export default {
  name: 'FormLabel'
}
</script>
