<template>
  <div class="paganation">
    <V-Btn
      @click="emit(activePage - 1)"
      :disabled="previousClick"
      class="btn btn-primary"
    >
      Назад
    </V-Btn>
    <ul class="paganation__list">
      <li
        v-for="(item, i) of getList"
        @click="emit(item)"
        :key="i"
        :class="['paganation__item', { active: item == activePage }]"
      >
        {{ item }}
      </li>
    </ul>
    <V-Btn
      @click="emit(activePage + 1)"
      :disabled="nextClick"
      class="btn btn-primary"
    >
      Далее
    </V-Btn>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    activePage: Number,
    MaxButtonPagination: {
      type: Number,
      default: 5
    }
  },
  computed: {
    getList() {
      if (this.value < this.MaxButtonPagination) {
        return this.generateList(1)
      }
      if (this.activePage + 2 > this.value) {
        return this.generateList(this.value - (this.MaxButtonPagination - 1))
      }
      if (this.activePage > 3) {
        return this.generateList(this.activePage - 2)
      }
      return this.generateList(1)
    },
    lengthPagination() {
      if (this.value > 5) return 5
      return this.value
    },
    nextClick() {
      return this.activePage === this.value
    },
    previousClick() {
      return this.activePage === 1
    }
  },
  methods: {
    generateList(firstCount) {
      return Array.from(
        { length: this.lengthPagination },
        (_, i) => i + firstCount
      )
    },
    emit(numPage) {
      this.$emit('input', numPage)
    }
  }
}
</script>

<style lang="scss">
.paganation {
  display: flex;
  align-items: center;
  &__list {
    display: flex;
  }
  &__item {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    color: $text-dark;
    border: 1.5px solid #5062fe;
    border-radius: 5px;
  }
  &__item.active {
    background-color: #5062fe;
    color: #fff;
  }
}
</style>
