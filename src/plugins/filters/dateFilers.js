import Vue from 'vue'
import { format, isDate, getMonth } from 'date-fns'
import { ru } from 'date-fns/esm/locale'

Vue.filter('localRu', function(date) {
  return isDate(date) ? format(date, 'dd', { locale: ru }) : date
})
Vue.filter('localRuDM', function(date) {
  return isDate(date) ? format(date, 'dd MMMM', { locale: ru }) : date
})
Vue.filter('localRuMMYYYY', function(date) {
  let ending = {
    2: '',
    4: 'й',
    7: ''
  }
  if (isDate(date)) {
    let symbolEnd =
      typeof ending[getMonth(date)] === 'string' ? ending[getMonth(date)] : 'ь'
    let month = format(date, 'MMMM', { locale: ru }).replace(/.$/gi, symbolEnd)
    month = month[0].toUpperCase() + month.slice(1)
    let year = format(date, 'yyyy', { locale: ru })
    return `${month} ${year}`
  }
})

Vue.filter('localRuHMDM', function(date) {
  return isDate(date) ? format(date, 'H:mm dd MMMM', { locale: ru }) : date
})
