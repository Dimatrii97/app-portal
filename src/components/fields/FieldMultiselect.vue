<template>
  <Field-Select v-bind="$attrs" v-on="$listeners" type="multi" noClose>
    <template #selected="{value}">
      <Chips
        v-for="(user, i) in value"
        :close="true"
        :key="i"
        :user="user"
        @delete-chips="sliceValue(i, value)"
      />
    </template>
    <template v-slot:label>
      <slot name="label"></slot>
    </template>
    <template #list="{params, item}">
      <div
        :class="[
          'dropdown__item',
          { active: params.isActive },
          { selected: params.isSelected }
        ]"
      >
        <User-Img :src="item.name" class="dropdown__item-img" />
        <div class="user-info">
          <span>{{ item.name }}</span>
          <p class="user-info__position">{{ item.position }}</p>
        </div>
      </div>
    </template>
  </Field-Select>
</template>

<script>
import Chips from '@/components/chips'
import FieldSelect from './FieldSelect.vue'
import UserImg from '@/components/ImgUser'
export default {
  name: 'FieldMultiselect',
  components: { FieldSelect, Chips, UserImg },
  methods: {
    sliceValue(index, value) {
      let newArray = [...value]
      newArray.splice(index, 1)
      this.$emit('input', newArray)
    }
  }
}
</script>
<style lang="scss" scoped>
//.dropdown__item
::v-deep .dropdown__item {
  display: flex;
  align-items: center;
  background: $bg-gray;
  color: $text-dark;
  padding: 5px 10px;
  border-radius: 10px;
  //.dropdown__item.active
  &.active {
    filter: drop-shadow(2px 7px 6px #00000061);
    transform: translate(0px, -3px);
    border: none;
  }
  //.dropdown__item.selected
  &.selected {
    background: #4f88f1bf;
    color: #ffffffcf;
  }
}
.user-info {
  margin-left: 15px;
  &__position {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
