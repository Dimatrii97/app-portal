<template functional>
  <div
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    class="form__group"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormGroup'
}
</script>
