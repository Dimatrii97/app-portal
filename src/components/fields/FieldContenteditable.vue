<template functional>
  <div
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FieldContenteditable'
}
</script>
