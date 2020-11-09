<template>
  <thead>
    <tr class="doc-table__row">
      <td v-for="(item, i) of value" :key="i" class="doc-table__cell">
        <div @click="$emit('input', i)" class="sort">
          <h3 class="title-default">{{ item.name }}</h3>
          <i
            v-if="isDefaultSort(i)"
            class="icon-arrow-drop-down icon default"
          ></i>
          <i v-else :class="`icon-arrow-${getClassIcon} icon active`"></i>
        </div>
      </td>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    value: Object,
    orderBy: String,
    orderDirection: Boolean
  },
  computed: {
    getClassIcon() {
      return this.orderDirection ? "top" : "bottom";
    }
  },
  methods: {
    isDefaultSort(sort) {
      return this.orderBy !== sort;
    }
  }
};
</script>

<style></style>
