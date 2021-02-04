<template>
  <div class="chips-group">
    <V-Chip
      v-for="(user, i) in value"
      @delete-chips="clickItem(user, i)"
      :close="true"
      :key="i"
      :user="user"
    />
  </div>
</template>

<script>
import VChip from '@/components/chips'
export default {
  inject: ['clickItem'],
  components: { VChip },
  props: {
    value: {
      type: [Object, Array],
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.chips-group {
  display: contents;
  flex-wrap: wrap;
}
</style>
