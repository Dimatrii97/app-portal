import Vue from 'vue'
import date from './date-filters'
Vue.filter('localRu', date.localRu)
Vue.filter('localRuDM', date.localRuDM)
Vue.filter('localRuMMYYYY', date.localRuMMYYYY)

Vue.filter('localRuHMDM', date.localRuHMDM)
Vue.filter('localRuAfter', date.tymeBackRu)
