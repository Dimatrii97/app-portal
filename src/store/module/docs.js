import * as sort_functions from '../utils/sort'

export default {
  namespaced: true,
  state: {
    textSearch: '',
    documentType: '',
    hasMap: null,
    countItemDocs: 10,
    activePage: 1,
    orderBy: 'name',
    name_sort_functions: 'name',
    orderDirection: true,
    docs: [
      {
        title: 'Протокол общего собрания учредителей от 01.09.20',
        documentType: 'Протокол',
        type: 'Word',
        date: '2020-09-01'
      },
      {
        title: 'Приказ от 17.03.20 о повышении премиальных выплат',
        documentType: 'Приказ',
        type: 'Word',
        date: '2020-02-01',
        update: '2020-03-12'
      },
      {
        title: 'Устав общества с ограниченной ответственностью',
        documentType: 'Устав',
        type: 'Word',
        date: '2020-08-22',
        update: '2020-08-23'
      },
      {
        title: 'Журнал регистрации приказов по личному составу',
        documentType: 'Журнал',
        type: 'Exel',
        date: '2020-01-12',
        update: '2020-06-23'
      },
      {
        title: 'Правила внутреннего трудового распорядка',
        documentType: '',
        type: 'Word',
        date: '2020-03-14'
      },
      {
        title: 'Приказ о проведении инвентаризации',
        documentType: 'Приказ',
        type: 'Exel',
        date: '2020-08-15'
      },
      {
        title: 'Приказ об утверждении штатного расписания',
        documentType: 'Приказ',
        type: 'Word',
        date: '2020-08-23'
      },
      {
        title: 'Приказ о выводе из эксплуатации котла',
        documentType: 'Приказ',
        type: 'Word',
        date: '2020-08-23',
        update: '2020-08-23'
      },
      {
        title: 'Приказ о внесении изменений в график отпусков',
        documentType: 'Приказ',
        type: 'Exel',
        date: '2020-08-23'
      },
      {
        title:
          'Устав закрытого акционерного общества, созданного в результате выделения',
        documentType: 'Устав',
        type: 'Word',
        date: '2020-08-23'
      },
      {
        title: 'Устав союза работодателей',
        documentType: 'Устав',
        type: 'Word',
        date: '2020-08-23'
      },
      {
        title: 'Устав федерального государственного учреждения',
        documentType: 'Устав',
        type: 'Word',
        date: '2020-02-26'
      },
      {
        title: 'Приказ о внесении изменений в график отпусков',
        documentType: 'Приказ',
        type: 'Word',
        date: '2020-05-21'
      },
      {
        title: 'Приказ о внесении изменений в график отпусков',
        documentType: 'Приказ',
        type: 'Word',
        date: '2020-02-23'
      },
      {
        title: 'Протокол совещаний руководителй структурных подразделений',
        documentType: 'Протокол',
        type: 'Word',
        date: '2020-03-23'
      },
      {
        title: 'Форма № Т-2. Личная карточка работника Сергеев А.Е.',
        documentType: 'Форма',
        type: 'Exel',
        date: '2018-03-23'
      },
      {
        title: 'Форма № Т-2. Личная карточка работника Мерзоев Д.Г.',
        documentType: 'Форма',
        type: 'Exel',
        date: '2018-05-17'
      },
      {
        title: 'Приказ о приеме на работу работника Сергеева А.Е.',
        documentType: 'Приказ',
        type: 'Word',
        date: '2018-03-23'
      },
      {
        title: 'Приказ о приеме на работу работника Мерзоева Д.Г.',
        documentType: 'Приказ',
        type: 'Word',
        date: '2018-05-17'
      },
      {
        title: 'Акт о приеме работ, выполненных по срочному трудовому договору',
        documentType: 'Акт',
        type: 'Word',
        date: '2020-01-23'
      },
      {
        title: 'Табель учета рабочего времени структурных подразделений К-1',
        documentType: 'Табель',
        type: 'Exel',
        date: '2019-05-23',
        update: '2019-08-23'
      },
      {
        title: 'Протокол совещаний руководителей структурных подразделений',
        documentType: 'Протокол',
        type: 'Word',
        date: '2020-09-23'
      },
      {
        title: 'Уведомление о расторжении договора',
        documentType: '',
        type: 'Word',
        date: '2020-05-11'
      },
      {
        title: 'Табель учета рабочего времени структурных подразделений К-2',
        documentType: 'Табель',
        type: 'Exel',
        date: '2019-05-23',
        update: '2019-08-23'
      },
      {
        title: 'Протокол совещаний руководителй структурных подразделений',
        documentType: 'Протокол',
        type: 'Word',
        date: '2020-09-12'
      },
      {
        title: 'Распорещение о проведении внеплановых работ',
        documentType: '',
        type: 'Word',
        date: '2020-01-23'
      }
    ]
  },
  getters: {
    getSearchText: state =>
      state.docs.filter(
        document =>
          document.title
            .toLowerCase()
            .includes(state.textSearch.toLowerCase()) &&
          document.documentType.includes(state.documentType)
      ),
    getOrderSearchDocs(state, getters, rootState) {
      let map = state.hasMap ? rootState.mapList[state.hasMap] : null
      return [...getters.getSearchText].sort(
        sort_functions[state.name_sort_functions](
          state.orderDirection,
          state.orderBy,
          map
        )
      )
    }
  },
  mutations: {
    SET_ORDER_BY(state, value) {
      let name_sort_functions = value.replace(/type/i, 'map').match(/map|date/i)
      let nameState = `map${value[0].toUpperCase()}${value.slice(1)}Sort`
      if (this.state.mapList[nameState]) state.hasMap = nameState
      if (state.orderBy === value) state.orderDirection = !state.orderDirection
      state.name_sort_functions = Array.isArray(name_sort_functions)
        ? name_sort_functions[0]
        : value
      state.orderBy = value
    },
    SET_TEXT_SEARCH(state, value) {
      state.textSearch = value
    },
    SET_DOCUMENT_TYPE(state, type) {
      state.documentType = type
    },
    SET_ACTIVE_PAGE(state, newPage) {
      state.activePage = newPage
    }
  },
  actions: {},
  modules: {}
}
