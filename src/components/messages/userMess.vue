<template>
  <ul class="messages__list">
    <router-link
      v-for="(messInfo, i) in filterSearch"
      :key="i"
      :to="'/message/' + messInfo.id"
      tag="li"
      class="message__link"
    >
      <User-Img
        :src="{ img: messInfo.img, name: messInfo.name }"
        class="message__img"
      />
      <div class="message__info">
        <div class="message__header">
          <span class="message__header-name"> {{ messInfo.name }}</span>
          <slot :date="messInfo.mess || ''" name="date-last-mess"></slot>
        </div>
        <slot :lastMess="messInfo.mess" name="text-message"></slot>
      </div>
    </router-link>
  </ul>
</template>

<script>
import UserImg from '@/components/ImgUser.vue'
export default {
  props: {
    filterSearch: Array,
    showListUser: Boolean
  },
  components: {
    UserImg
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/pages/message';
</style>
