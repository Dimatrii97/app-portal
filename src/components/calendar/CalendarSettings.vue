<template>
  <div class="date-settings">
    <div>
      <ul class="date-settings__list">
        <li @click="$emit('today')" class="date-settings__item today">
          <span><i class="icon"></i> Сегодня </span>
        </li>
        <li @click="$emit('change', 'start')" class="date-settings__item">
          <span :class="[{ active: interval.active === 'start' }]"
            ><i class="icon"></i> Начало
          </span>
          <span>{{ interval.start | localRuDM }}</span>
        </li>
        <li @click="$emit('change', 'end')" class="date-settings__item">
          <span :class="[{ active: interval.active === 'end' }]"
            ><i class="icon"></i> Конец
          </span>
          <span>{{ interval.end | localRuDM }}</span>
        </li>
      </ul>
      <div class="btn__group">
        <button
          type="button"
          @click="$emit('set')"
          class="btn btn-primary btn-sm"
        >
          Установить
        </button>
        <button
          type="button"
          @click="$emit('close')"
          class="btn btn-error btn-sm"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    interval: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.date-settings {
  padding: 0px 0 0 10px;
  margin: 0 0 0 5px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 1.5px;
    height: 85%;
    transform: translateY(-50%);
    background-color: rgba(55, 45, 204, 0.465);
  }
  &__item {
    margin: 25px 0px;
    font-size: 1.2rem;
    cursor: pointer;
  }
  &__field {
    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
  @include _600 {
    &::before {
      left: 50%;
      top: 10px;
      width: 85%;
      height: 1.5px;
      transform: translateX(-50%);
      background-color: rgba(55, 45, 204, 0.465);
    }
  }
}

.btn__group {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  .btn-sm:first-child {
    margin-right: 5px;
  }
}
.active {
  color: $blue;
}
</style>
