import { subMonths, addMonths } from 'date-fns'

const mixin = {
  data() {
    return {
      visibleMonth: new Date()
    }
  },
  methods: {
    m_back(count = 1) {
      this.visibleMonth = subMonths(this.visibleMonth, count)
    },

    m_next(count = 1) {
      this.visibleMonth = addMonths(this.visibleMonth, count)
    }
  }
}
export default mixin
