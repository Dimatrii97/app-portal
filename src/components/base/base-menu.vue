<template>
  <div @mouseout.capture="reset($event)" class="v-menu">
    <div class="v-menu__activatror">
      <slot name="activator" :on="{ mouseenter: show }"> </slot>
    </div>
    <div class="v-menu__options">
      <div
        v-show="isShow"
        ref="content"
        @mouseenter="show()"
        class="v-menu__content"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils/throttling'

function getTranslate(item) {
  const transArr = []
  if (!window.getComputedStyle) {
    return
  }
  const style = window.getComputedStyle(item)
  const transform = style.transform || style.webkitTransform
  let mat = transform.match(/^matrix3d\((.+)\)$/)
  if (mat) {
    return parseFloat(mat[1].split(', ')[13])
  }
  mat = transform.match(/^matrix\((.+)\)$/)
  mat ? transArr.push(parseInt(mat[1].split(', ')[4], 10)) : transArr.push(0)
  mat ? transArr.push(parseInt(mat[1].split(', ')[5], 10)) : transArr.push(0)

  return transArr
}

export default {
  name: 'BaseMenu',
  props: {
    bottom: Boolean,
    top: [Boolean, Number],
    left: [Boolean, Number],
    right: Boolean,
    offsetX: String,
    offsetY: String
  },
  data() {
    return {
      elOptions: null,
      isShow: true,
      hover: true,
      debounceEvent: debounce(params => (this.isShow = params), 400)
    }
  },
  mounted() {
    if (this.top || this.bottom) {
      let offsetTop = typeof this.top === 'boolean' ? 0 : this.top
      this.setPosition(this.top, ['top', 'bottom'], offsetTop)
    }
    if (this.left || this.right) {
      let offsetLeft = typeof this.left === 'boolean' ? 0 : this.left
      this.setPosition(this.left, ['left', 'right'], offsetLeft)
    }
    if (this.offsetX || this.offsetY) {
      if (this.offsetX && this.offsetY) {
        this.setTransform(`translateX(${this.offsetX})`)
        this.setTransform(`translateY(${this.offsetY})`)
      } else {
        let order = this.offsetX ? 'translateX' : 'translateY'
        let active = this.offsetX || this.offsetY
        this.setTransform(`${order}(${active})`)
      }
    }
    this.isShow = false
  },
  methods: {
    show() {
      this.debounceEvent(true)
    },
    reset($event) {
      if (!this.$el.contains($event.relatedTarget)) {
        this.debounceEvent(false)
      }
    },
    setPosition(a, orentir, ofsset = 0) {
      this.$refs.content.style[a ? orentir[0] : orentir[1]] = ofsset + 'px'
    },
    setTransform(translate) {
      let translateElement = getTranslate(this.$refs.content)
      let order = translate.slice(0, 10)
      let translate2 =
        order === 'translateX'
          ? `translateY(${translateElement[1]}px)`
          : `translateX(${translateElement[0]}px)`
      this.$refs.content.style.transform = `${translate} ${translate2}`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-menu {
  position: relative;
}
.v-menu__activatror {
  cursor: pointer;
}
.v-menu__content {
  position: absolute;
  display: inline-block;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  contain: content;
  will-change: transform;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%);
  border-radius: 4px;
}
</style>
