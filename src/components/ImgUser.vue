<template>
  <figure class="img-user" v-bind="$attrs" v-on="$listeners">
    <div v-if="test" alt="user avatar" class="name-user">
      {{ getName }}
    </div>
    <img v-else :src="src" class="img-user__circle" alt="user" />
  </figure>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    src: {
      type: String,
      default: ' '
    }
  },
  computed: {
    test() {
      // eslint-disable-next-line no-useless-escape
      return !/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi.test(
        this.src
      )
    },
    getName() {
      return this.src
        ? this.src
            .split(' ')
            .map(el => el[0])
            .join(' ')
            .toUpperCase()
        : ' '
    }
  }
}
</script>

<style lang="scss" scoped>
.img-user {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #518cf7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @include _480 {
    width: 40px;
    height: 40px;
  }
  .name-user {
    color: rgba(255, 255, 255, 0.904);
    font-size: 21px;
    font-weight: 400;
    text-align: center;
    word-spacing: -2px;
  }
  .img-user__circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.img-user.sm {
  width: 32px;
  height: 32px;
  @include _480 {
    width: 25px;
    height: 25px;
  }

  .name-user {
    font-size: 14px;
  }
}
.img-user.esm {
  width: 24px;
  height: 24px;
  @include _480 {
    width: 20px;
    height: 20px;
  }
  .name-user {
    font-size: 12px;
    font-weight: 900;
  }
}
</style>
