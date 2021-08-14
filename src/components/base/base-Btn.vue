<template functional>
  <button
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <span class="btn-content"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'BaseBtn'
}
</script>
<style lang="scss" scoped>
.btn {
  display: inline-block;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1.25rem;
  border-radius: 10px;
}
.btn-content {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
}
.btn-primary {
  color: #fff;
  background-color: $blue;
  border-color: $blue;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.24);
}
.btn-primary:disabled {
  background: $default;
  border-color: $default;
}

.btn-error {
  color: #fff;
  background-color: $red;
  border-color: $red;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.24);
}

.btn-ghost-primary {
  color: $blue;
  border: 1px solid $blue;
}

.btn-ghost-primary :disabled {
  color: $default;
  border: 1px solid $default;
}

.btn-ghost-error {
  color: $red;
  border: 1px solid $red;
}

.btn-square {
  padding: 0;
  width: 35px;
  height: 35px;
}
.icon {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  padding: 0;
  align-self: center;
}

.btn-sm {
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 0.899999rem;
}
</style>
