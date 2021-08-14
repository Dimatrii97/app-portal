<template>
  <router-link
    :class="[{ aside: main }, 'message']"
    :to="'/chat/messanger/' + message.interlocutor.id"
  >
    <User-Img :src="message.interlocutor.name" class="message__img" />
    <div class="message__info">
      <div class="message__header">
        <span class="message__header-name">
          {{ message.interlocutor.name }}</span
        >
        <span v-if="'text' in message && !main" class="message__time">
          {{ message.date | localRuAfter }}
        </span>
      </div>
      <div
        v-if="'text' in message"
        :class="['message__last', { check: !message.scanned }]"
      >
        <div class="message__user">
          <slot> </slot>
          <p class="message__text">
            {{ message.text }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import UserImg from '@/components/ImgUser.vue'
export default {
  // TODO: перемеинование
  name: 'message-item',
  props: {
    message: {
      required: true,
      type: Object
    },
    main: Boolean
  },
  components: {
    UserImg
  }
}
</script>

<style lang="scss" scoped>
.message {
  // .message__link

  display: flex;
  align-items: center;
  margin: 20px 0;
  color: $title;

  // .message__img
  &__img {
    margin-right: 20px;
  }
  // .message__last
  &__last {
    font-size: 1rem;
    color: $text-color;
  }
  // .message__info
  &__info {
    flex: 1 0;
    padding: 5px 0;
    border-bottom: 1px solid $text-color;
  }
  // .message__header
  &__header {
    font-size: 1.1rem;
    line-height: 1.4;
    display: flex;
    justify-content: space-between;
  }
  // .message__time
  &__time {
    font-size: 0.95rem;
    color: $text-color;
  }
  // .message__user
  &__user {
    display: flex;
    align-items: center;
    height: 32px;
  }
  &__text {
    position: absolute;
    margin-left: 35px;
    text-overflow: ellipsis;
    width: 55%;
    white-space: nowrap;
    overflow: hidden;
  }
  @include _979 {
    &.aside {
      & .message__info {
        display: none;
      }
      & .message__img {
        margin: 0;
      }
    }
  }
  @include _768 {
  }
  @include _600 {
  }
  @include _480 {
  }

  @include _350 {
  }
}
</style>
