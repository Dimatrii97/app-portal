<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TransitionExpand',
  props: {
    time: {
      default: 1,
      type: Number
    }
  },
  methods: {
    enter(element) {
      const width = getComputedStyle(element).width
      element.style.transition = `height ${this.time}s ease-in-out`
      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0
      getComputedStyle(element).height
      requestAnimationFrame(() => {
        element.style.height = height
      })
    },
    afterEnter(element) {
      element.style.height = 'auto'
      element.style.transition = 'none'
    },
    leave(element) {
      element.style.transition = `height ${this.time / 1.5}s ease-in-out`
      const height = getComputedStyle(element).height

      element.style.height = height

      getComputedStyle(element).height

      requestAnimationFrame(() => {
        element.style.height = 0
      })
    }
  }
}
</script>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
