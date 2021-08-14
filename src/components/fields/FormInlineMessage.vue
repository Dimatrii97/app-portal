<template functional>
  <div
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    class="form-inline-message"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FormInlineMessage'
}
</script>

<style>
.form-inline-message {
  font-size: smaller;
  color: red;
}
</style>
