<template>
  <div class="control">
    <button class="btn-ghost__square" type="button" @click="$emit('back')">
      <i class="icon-arrow-left"></i>
    </button>
    <h3 class="monthName">
      {{ visibleMonth | localRuMM }}
    </h3>
    <button class="btn-ghost__square" type="button" @click="$emit('next')">
      <i class="icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    visibleMonth: Date
  }
};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  align-items: center;
  justify-content: center;
}
.monthName {
  color: $title;
  font-size: 1.5rem;
  margin: 0 auto;
}
</style>
