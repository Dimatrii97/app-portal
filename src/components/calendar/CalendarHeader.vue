<template>
  <div class="control">
    <V-Btn
      @click="$emit('back')"
      class="btn btn-ghost-primary btn-square"
      type="button"
    >
      <i class="icon-arrow-left"></i>
    </V-Btn>
    <h3 class="monthName">
      {{ visibleMonth | localRuMMYYYY }}
    </h3>
    <V-Btn
      @click="$emit('next')"
      class="btn btn-ghost-primary btn-square"
      type="button"
    >
      <i class="icon-arrow-right"></i>
    </V-Btn>
  </div>
</template>

<script>
export default {
  name: 'CalendarHeader',
  props: {
    visibleMonth: Date
  }
}
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
