<template functional>
  <figure
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
  >
    <img v-bind="data.attrs" v-on="listeners" />
  </figure>
</template>

<script>
export default {
  name:'BaseImg'
}
</script>
