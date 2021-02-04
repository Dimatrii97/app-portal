<template>
  <div
    :class="[
      'dropdown__item',
      { active: params.isActive },
      { selected: params.isSelected }
    ]"
  >
    <User-Img
      :src="{ img: item.img, name: item.name }"
      class="dropdown__item-img"
      alt=""
    />
    <div class="user-info">
      <span>{{ item.name }}</span>
      <p class="user-info__position">{{ item.position }}</p>
    </div>
  </div>
</template>

<script>
import UserImg from '@/components/ImgUser'
export default {
  props: {
    item: {
      default: () => {},
      type: [Object]
    },
    params: {
      default: () => {},
      type: [Object, Array]
    }
  },
  components: {
    UserImg
  }
}
</script>
<style lang="scss" scoped>
//.dropdown__item
.dropdown__item {
  &-img.img-user {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 15px;
  }
  //.dropdown__item.active
  &.active {
    filter: drop-shadow(2px 7px 6px #00000061);
    transform: translate(0px, -3px);
  }
  //.dropdown__item.selected
  &.selected {
    background: #4f88f1bf;
    color: #ffffffcf;
  }
}
.user-info {
  &__position {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
