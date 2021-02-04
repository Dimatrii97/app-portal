import { format } from 'date-fns'
import { ru } from 'date-fns/esm/locale'
export function datePostgres(date) {
  return format(date, 'yyyy-MM-dd', { locale: ru })
}
export function dayMonth(date) {
  return format(date, 'd MMM', { locale: ru })
}
