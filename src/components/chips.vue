<template>
  <span class="chip">
    <User-Img :src="user.name" class="chip__img esm" />
    <span class="chip__name">{{ user.name }}</span>
    <i
      v-if="close"
      @click.stop="$emit('delete-chips', user.user_id)"
      class="icon-close"
    ></i>
  </span>
</template>

<script>
import UserImg from '@/components/ImgUser.vue'
export default {
  name: 'chip',
  components: {
    UserImg
  },

  props: {
    user: Object,
    close: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.chip {
  margin: 5px 7px 5px 0px;
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 0px 2px 0px 0px;
  background: $bg-gray;
  border-radius: 15px;
  font-size: 0.9rem;
  color: $text-dark;
  white-space: nowrap;
  &:first-child {
    margin-left: 5px;
  }
  &__img {
    position: absolute;
    left: -2px;
    border-radius: 50%;
  }
  &__name {
    margin: 0px 5px 0 24px;
  }
}
</style>
