<template>
  <div class="smile">
    <div class="smile__content">
      <div v-for="(smiles, i) in getArray" :key="i" class="smile__group">
        <div class="smile__group-name">{{ i }}</div>
        <div class="smile__list">
          <span
            v-for="(smile, k) in smiles"
            :key="k"
            @click="$emit('input', smile)"
            v-html="smile"
            class="smile__item"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import smileArray from './smile'
export default {
  name: 'BaseSmile',
  computed: {
    getArray() {
      return smileArray
    }
  }
}
</script>

<style lang="scss" scoped>
.smile {
  border-radius: 10px;
  background-color: #fff;
  padding: 15px 5px;
  overflow: hidden;
  position: relative;
  // .smile__content
  &__content {
    min-width: 300px;
    max-height: 250px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.568);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 15px;
    }

    &::-webkit-scrollbar-track-piece:start {
      margin-top: 15px;
    }
  }

  // .smile__group-name
  &__group-name {
    position: sticky;
    top: 0;
    padding-bottom: 5px;
    font-size: 1.3rem;
    background-color: #fff;
    box-shadow: 0px 4px 6px 1px #fff;
  }
  // .smile__list
  &__list {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
  }
  // .smile__item
  &__item {
    padding: 5px 0px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: rgba(41, 45, 253, 0.328);
    }
  }
}
</style>
