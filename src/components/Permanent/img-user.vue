/* Комопнент отоброжение аватарки пользователя */
<template>
  <figure :class="['img-user', className]">
    <div v-if="srcParse.defaulName" alt="user avatar" class="name-user">
      {{ srcParse.name }}
    </div>
    <img v-else :src="src.img" class="img-user__circle" alt="" />
  </figure>
</template>

<script>
export default {
  props: {
    src: {
      type: Object,
      required: true,
      default: () => {
        return {
          name: "",
          img: "default"
        };
      }
    },
    className: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    srcParse() {
      if (this.src.img === "default") {
        let name = this.src.name
          ? this.src.name
              .split(" ")
              .map(el => el[0])
              .join(" ")
              .toUpperCase()
          : "";
        return { name, defaulName: true };
      }
      return { src: this.src.img, defaulName: false };
    }
  }
};
</script>

<style lang="scss" scoped>
.img-user {
  width: 50px;
  height: 50px;
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
    color: rgba(255, 255, 255, 0.904);
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    word-spacing: -2px;
  }
}
</style>
