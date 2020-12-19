<template>
  <p class="select__header">{{ value }}</p>
</template>

<script>
export default {
  props: {
    value: [Number, String]
  }
};
</script>
<style lang="scss" scoped>
.select__header {
  height: 41px;
  flex: 1;
  display: flex;
  align-items: center;
  color: $title;
  font-size: 1.3rem;
}
</style>
