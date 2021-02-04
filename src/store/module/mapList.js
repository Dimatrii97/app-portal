export default {
  namespaced: true,
  state: {
    mapDocumentTypeSort: {
      Устав: 0,
      Приказ: 1,
      Протокол: 2,
      Журнал: 3,
      Форма: 4,
      Акт: 5,
      Табель: 6,
      '': -1
    },
    mapTypeSort: {
      Exel: 0,
      Word: 1
    },
    theader: {
      name: {
        name: 'Название',
        sort: 'default'
      },
      documentType: {
        name: 'Тип документа',
        sort: 'default'
      },
      type: {
        name: 'Файл',
        sort: 'default'
      },
      date: {
        name: 'Дата публикации',
        sort: 'default'
      },
      update: {
        name: 'Дата изменения',
        sort: 'default'
      }
    }
  },
  getters: {
    getMapTypeDocSort: state => state.mapTypeDocSort,
    getMapTypeSort: state => state.mapTypeSort
  }
}
