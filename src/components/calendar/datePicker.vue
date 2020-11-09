<template>
  <div class="date-piker">
    <div @click="isActive = !isActive" class="form__group">
      <div :class="[{ focus: isActive }, 'form__field', 'date']">
        {{ date }}
      </div>
      <label :class="[{ empty: isEmpty }, 'form__label']">
        Сроки исполнения
      </label>
    </div>
    <slot></slot>
    <calendar-body
      v-if="isActive"
      :interval="interval"
      :visibleMonth="visibleMonth"
      @setDay="setDay($event)"
      class="popup"
    >
      <template #header>
        <calendar-header
          :interval="interval"
          @active="setIntervalActive($event)"
          @back="back()"
          @next="next()"
        />
      </template>
      <template #footer>
        <div class="button-footer">
          <button @click="emitValue()" type="button" class="btn-primary">
            Потвердить
          </button>
          <button
            @click="isActive = false"
            type="button"
            class="btn-primary__error"
          >
            Отмена
          </button>
        </div>
      </template>
    </calendar-body>
    <div
      v-if="isActive"
      @click="isActive = false"
      class="date-picker__backgrount"
    ></div>
  </div>
</template>

<script>
import calendarBody from "@/components/calendar/calendarBody";
import calendarHeader from "@/components/calendar/headerInterval";
import {
  format,
  isAfter,
  subMonths,
  addMonths,
  subDays,
  isEqual,
  isDate
} from "date-fns";
export default {
  components: {
    calendarBody,
    calendarHeader
  },
  data() {
    return {
      isActive: false,
      date: "",
      interval: {
        start: new Date(),
        end: null,
        active: "start"
      },
      visibleMonth: new Date()
    };
  },
  computed: {
    isEmpty() {
      return !this.date && !this.isActive;
    }
  },
  methods: {
    emitValue() {
      if (isDate(this.interval.start) && isDate(this.interval.end)) {
        this.$emit("input", {
          start: format(this.interval.start, "yyyy-MM-dd"),
          end: format(this.interval.end, "yyyy-MM-dd")
        });
        let formStr = "dd/MM/yyyy";
        this.date = isEqual(this.interval.start, this.interval.end)
          ? `${format(this.interval.start, formStr)}`
          : `${format(this.interval.start, formStr)} - ${format(
              this.interval.end,
              formStr
            )}`;
        this.isActive = false;
      }
    },

    setDay(date) {
      switch (this.interval.active) {
        case "start": {
          if (this.isSetStartdate(date)) {
            if (isAfter(date, this.interval.end)) {
              this.interval.end = null;
            }
            this.interval.start = date;
            this.activeDay = date;
            this.interval.active = "end";
          }
          return;
        }

        case "end": {
          if (this.isSetEnddate(date)) {
            if (isAfter(this.interval.start, date)) {
              this.interval.start = null;
              this.interval.active = "start";
            }
            this.interval.end = date;
            this.activeDay = date;
          }
          return;
        }
        default:
          throw new Error("this.interval.active = 'end' || 'start'");
      }
    },

    setIntervalActive(status) {
      this.interval.active = status;
    },

    back() {
      this.visibleMonth = subMonths(this.visibleMonth, 1);
    },

    next() {
      this.visibleMonth = addMonths(this.visibleMonth, 1);
    },

    isSetStartdate(date) {
      return (
        isAfter(date, subDays(new Date(), 1)) ||
        isEqual(date, this.interval.end)
      );
    },

    isSetEnddate(date) {
      return (
        isAfter(date, subDays(new Date(), 1)) ||
        isEqual(date, this.interval.start)
      );
    },
    clearEl() {
      this.$emit("input", "");
      this.isActive = false;
      this.date = "";
      this.interval.start = new Date();
      this.interval.end = null;
      this.interval.active = "start";
      this.visibleMonth = new Date();
    }
  }
};
</script>

<style lang="scss" scoped>
.date {
  height: 41px;
}
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-width: 850px;
}
.date-picker__backgrount {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(41, 41, 41, 0.589);
  left: 0;
  top: 0;
  z-index: 30;
}
.button-footer {
  background-color: $dark;
  display: flex;
  justify-content: flex-end;
  padding: 15px 10px;
  & .btn-primary {
    margin-right: 15px;
  }
}
</style>
