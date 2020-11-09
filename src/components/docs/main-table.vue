<template>
  <tbody>
    <tr class="doc-table__row" v-for="i in lengthList" :key="i">
      <td data-label="Название" class="doc-table__cell title">
        {{ list[i - 1].title }}
      </td>
      <td data-label="Тип документа" class="doc-table__cell">
        {{ list[i - 1].documentType || "_" }}
      </td>
      <td data-label="Файл" class="doc-table__cell">{{ list[i - 1].type }}</td>
      <td data-label="Публикация" class="doc-table__cell">
        {{ list[i - 1].date || "_" }}
      </td>
      <td data-label="Обновление" class="doc-table__cell">
        {{ list[i - 1].update || "_" }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    list: Array,
    countItemDocs: Number
  },
  computed: {
    lengthList() {
      return this.countItemDocs == this.list.length
        ? this.countItemDocs
        : this.list.length;
    }
  }
};
</script>
