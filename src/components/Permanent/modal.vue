<template>
  <div @click.stop="$emit('close')" class="bg">
    <div @click.stop class="modal">
      <div class="modal__title">
        <slot name="header"></slot>
        <div @click="$emit('close')" class="modal__close">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
      <div class="button-left">
        <button @click="$emit('next')" class="btn btn-primary">Отправить</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 30, 30, 0.712);
}
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #fff;
  width: 700px;
  border-radius: 10px;
  min-height: 120px;
  transform: translate(-50%, -50%);
  padding: 20px;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: $title;
  }
  @include _768 {
    width: 300px;
    padding: 5px;
    &__title {
      font-size: 16px;
    }
  }
}
</style>
