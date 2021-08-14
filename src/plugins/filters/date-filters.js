import { format, isDate, getMonth, differenceInCalendarDays } from 'date-fns'
import { dayMonth } from '@/utils/dateType'

import { ru } from 'date-fns/esm/locale'

function tymeBackRu(date) {
  let lastMess = new Date(date)
  let difference = differenceInCalendarDays(new Date(), lastMess)
  switch (true) {
    case difference == 0: {
      return 'Сегодня'
    }

    case difference == 1: {
      return 'Вчера'
    }

    case difference > 30: {
      return dayMonth(lastMess)
    }

    default:
      return difference + 'д. назад'
  }
}

function localRuHMDM(date) {
  return isDate(date) ? format(date, 'H:mm dd MMMM', { locale: ru }) : date
}

function localRuMMYYYY(date) {
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
}

function localRuDM(date) {
  return isDate(date) ? format(date, 'dd MMMM', { locale: ru }) : date
}

function localRu(date) {
  return isDate(date) ? format(date, 'dd', { locale: ru }) : date
}

export default {
  tymeBackRu,
  localRuHMDM,
  localRuMMYYYY,
  localRuDM,
  localRu
}
