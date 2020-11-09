import Vue from "vue";
import { format, isDate, getMonth } from "date-fns";
import { ru } from "date-fns/esm/locale";

Vue.filter("localRu", function(date) {
  return isDate(date) ? format(date, "dd", { locale: ru }) : date;
});
Vue.filter("localRuDM", function(date) {
  return isDate(date) ? format(date, "dd MMMM", { locale: ru }) : date;
});
Vue.filter("localRuMM", function(date) {
  let ending = {
    2: "",
    4: "й",
    7: ""
  };
  if (isDate(date)) {
    let symbolEnd =
      typeof ending[getMonth(date)] === "string" ? ending[getMonth(date)] : "ь";
    let month = format(date, "MMMM", { locale: ru }).replace(/.$/gi, symbolEnd);
    month = month[0].toUpperCase() + month.slice(1);

    return month;
  }
});

Vue.filter("localRuHMDM", function(date) {
  return isDate(date) ? format(date, "H:mm dd MMMM", { locale: ru }) : date;
});

export function datePostgres(date) {
  return format(date, "yyyy-MM-dd", { locale: ru });
}
export function dM(date) {
  return format(date, "d MMM", { locale: ru });
}
