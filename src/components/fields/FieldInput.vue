<template>
  <div>
    <input
      :id="$attrs.id"
      :type="$attrs.type || 'text'"
      @input="$emit('input', $event.target.value)"
      :class="['form__field', { errors: $attrs.error }]"
    />
    <slot name="label"></slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: false
};
</script>
