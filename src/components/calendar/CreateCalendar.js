// import {
//   endOfMonth,
//   startOfMonth,
//   lastDayOfISOWeek,
//   startOfISOWeek,
//   subMonths,
//   eachDayOfInterval,
//   differenceInCalendarDays,
//   areIntervalsOverlapping,
//   getDaysInMonth,
//   isToday,
//   isEqual,
//   isDate
// } from "date-fns";
import {
  endOfMonth,
  startOfMonth,
  lastDayOfISOWeek,
  startOfISOWeek,
  subMonths,
  eachDayOfInterval,
  differenceInCalendarDays,
  areIntervalsOverlapping,
  getDaysInMonth
} from "date-fns";

export class Month {
  static createMonth(...args) {
    return new Month(...args).createMonth();
  }

  constructor(currentDate) {
    // this.visibleMonth
    this.currentDate = currentDate;
    this.firstDay = startOfISOWeek(endOfMonth(subMonths(currentDate, 1)));
    this.lastDay = lastDayOfISOWeek(endOfMonth(currentDate));
  }

  createMonth() {
    this.month = eachDayOfInterval({
      start: this.firstDay,
      end: this.lastDay
    }).map(day => ({ day }));

    this._backNextMonthProperty();
    return this;
  }

  getMonth() {
    return this.month;
  }

  setTasks(tasks = []) {
    tasks.forEach(task => {
      let interval = this._getInterval(task.startdate, task.deadline);
      if (interval.length) this._setTask(...interval, task);
    });
    return this;
  }

  setInterval({ start, end }) {
    if (start && end) {
      const [findIndex, countDay] = this._getInterval(start, end);
      for (let i = findIndex; i < countDay + findIndex + 1; i++) {
        this.month[i].interval = true;
      }
    }
    if ((start && !end) || (!start && end)) {
      let findIndex = differenceInCalendarDays(
        new Date(start || end),
        this.firstDay
      );
      if (findIndex >= 0 && findIndex <= this.month.length)
        this.month[findIndex].interval = true;
    }
    return this;
  }

  _setTask(findIndex = 0, intervalTask = 0, task) {
    for (let i = findIndex; i < intervalTask + findIndex + 1; i++) {
      if (!this.month[i].tasks) {
        this.month[i].tasks = [];
      }
      if (i === findIndex) {
        this.month[i].showNew = !task.scanned;
      }
      this.month[i].tasks.push(task);
    }
  }

  _backNextMonthProperty() {
    let intervalFistDayMonth = differenceInCalendarDays(
      startOfMonth(this.currentDate),
      this.firstDay
    );
    let intervalLastDayMonth = differenceInCalendarDays(
      this.lastDay,
      endOfMonth(this.currentDate)
    );
    let monthDayCount = getDaysInMonth(this.currentDate);
    for (let i = 0; i < intervalFistDayMonth + intervalLastDayMonth; i++) {
      intervalFistDayMonth > i
        ? (this.month[i].backMonth = true)
        : (this.month[i + monthDayCount].nextMonth = true);
    }
  }

  _getInterval(start, end) {
    let intersection = areIntervalsOverlapping(
      { start: new Date(start), end: new Date(end) },
      { start: new Date(this.firstDay), end: new Date(this.lastDay) }
    );

    if (intersection) {
      let countDay = differenceInCalendarDays(new Date(end), new Date(start));
      let intervalMonth = differenceInCalendarDays(
        new Date(this.lastDay),
        new Date(this.firstDay)
      );
      let findIndex = differenceInCalendarDays(new Date(start), this.firstDay);

      if (findIndex + countDay > intervalMonth) {
        countDay = intervalMonth - findIndex;
      }

      if (findIndex < 0) {
        countDay += findIndex;
        findIndex = 0;
      }

      return [findIndex, countDay];
    }
    return [];
  }
}
