<template>
  <button
    v-on="$listeners"
    @click="$emit('change')"
    type="button"
    class="nav__toggle__button"
  >
    <div :class="['menu-btn', { open: value }]">
      <div class="menu-btn__burger "></div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'BurgerMenu',
  model: {
    event: 'change'
  },
  props: { value: Boolean }
}
</script>

<style lang="scss" scoped>
.menu-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  border: 3px solid $text-color;
}
.menu-btn__burger {
  width: 25px;
  height: 3px;
  background-color: $text-color;
  border-radius: 1px;
  transition: all 0.5s ease-in-out;
}
.menu-btn__burger::before,
.menu-btn__burger::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: $text-color;
  border-radius: 1px;
  transition: all 0.5s ease-in-out;
}
.menu-btn__burger::before {
  transform: translate(-12px, -8px);
}
.menu-btn__burger::after {
  transform: translate(-12px, 8px);
}
.menu-btn.open .menu-btn__burger {
  transform: translateX(-50px);
  background: transparent;
}
.menu-btn.open .menu-btn__burger:before {
  transform: rotate(45deg) translate(27px, -27px);
}
.menu-btn.open .menu-btn__burger::after {
  transform: rotate(-45deg) translate(26px, 26px);
}
</style>
