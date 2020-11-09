<template>
  <div class="control">
    <button class="btn-ghost__square big" type="button" @click="$emit('back')">
      <i class="icon-arrow-left"></i>
    </button>
    <div class="control__date">
      <div class="control__btn">
        <button
          @click="$emit('active', 'start')"
          type="button"
          :class="[{ active: interval.active === 'start' }, 'btn-radio']"
        >
          Дата начала
        </button>
        <span class="control__text">{{ interval.start | localRuDM }}</span>
      </div>
      <div class="control__btn">
        <button
          @click="$emit('active', 'end')"
          type="button"
          :class="[{ active: interval.active === 'end' }, 'btn-radio']"
        >
          Дата окончания
        </button>
        <span class="control__text">{{ interval.end | localRuDM }}</span>
      </div>
    </div>
    <button class="btn-ghost__square big" type="button" @click="$emit('next')">
      <i class="icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    interval: Object
  }
};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $dark;
  padding: 15px 10px;
  color: rgba(255, 255, 255, 0.815);
  &__date {
    display: flex;
    justify-content: center;
  }
  &__text {
    font-size: 1.3rem;
    white-space: nowrap;
  }
  &__btn:first-child {
    margin-right: 20px;
  }
}

.btn-ghost__square.big {
  width: 45px;
  height: 45px;
  font-size: 1.5rem;
}

.btn-radio {
  padding: 3px 5px;
  color: $text-dark;
  background-color: $bg-gray;
  border-radius: 5px;
  margin-right: 10px;
  white-space: nowrap;
  font-size: 1.3rem;
  &.active {
    color: $blue;
  }
}

.control {
  @include _768 {
    padding: 10px 5px;
    &__text {
      font-size: 1rem;
    }
    &__btn:first-child {
      margin-right: 10px;
    }
    .btn-ghost__square.big {
      width: 20px;
      height: 20px;
      font-size: 1rem;
      border: none;
    }
    .btn-radio {
      padding: 2px 3px;
      margin-right: 5px;
      font-size: 1rem;
    }
  }
  @include _350 {
    padding: 10px 5px;
    &__btn:first-child {
      margin-right: 5px;
    }
    .btn-ghost__square.big {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
