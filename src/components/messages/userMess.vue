<template>
  <ul class="messages__list">
    <router-link
      v-for="(messInfo, i) in filterSearch"
      :key="i"
      :to="'/message/' + messInfo.id"
      tag="li"
      class="message__link"
    >
      <user-img
        :src="{ img: messInfo.img, name: messInfo.name }"
        class="message__img"
      ></user-img>
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
import userImg from "@/components/Permanent/img-user";
export default {
  props: {
    filterSearch: Array,
    showListUser: Boolean
  },
  components: {
    userImg
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/pages/message";
</style>
