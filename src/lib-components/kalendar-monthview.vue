<template>
  <div class="calendar-wrap" :style="`--space-between-cols: ${colsSpace}`">
    <div class="sticky-top">
      <ul class="days">
        <li
          class="day-indicator"
          :key="index"
          v-for="(value, index) in dayTitles">
          <div>
            <span class="letters-date">{{value}}</span>
          </div>
        </li>
      </ul>

      <div class="weeks" v-for="(weekStart, weekIndex) in weeksOfPeriod" :key="`${weekIndex}-week`">
        <kalendar-day
            v-for="(day, dayIndex) in daysOfWeek(weekStart)"
            :day="day"
            class="building-blocks"
            :class="`day-${dayIndex + 1}`"
            :key="dayIndex"
            :passed-time="passedTime.distance"
            :ref="dayIndex"
        >
        </kalendar-day>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getHourlessDate,
  incrementPeriod,
  beginningOfMonth,
  addDays,
  beginningOfWeek,
  endOfWeekInMonth,
  dayDiff,
  beginningOfPeriod, getLocaleTime
} from './utils'
import KalendarDay from "./kalendar-daymonth";

export default {
  name: "kalendar-monthview",

  components: {
      KalendarDay
  },

  props: {
    current_day: {
      required: true,
      type: String,
      validator: d => !isNaN(Date.parse(d)),
    }
  },

  data () {
    return {
      dayTitles: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    }
  },

  inject: ["kalendar_options", "kalendar_events"],

  computed: {
      today () {
          return new Date(this.current_day)
      },

      //TODO: add a default date
      periodStart () {
          return beginningOfPeriod(this.today, 'month', 0)
      },

      periodEnd () {
          return addDays(incrementPeriod(this.periodStart, 'month', 1), 0)
      },

      displayFirstDate() {
          return beginningOfWeek(this.periodStart, 2)
      },

      displayLastDate() {
          return endOfWeekInMonth(this.periodEnd, 2)
      },

      weeksOfPeriod() {
          const numWeeks = Math.floor((dayDiff(this.displayFirstDate, this.displayLastDate) + 1) / 7)
          return [...Array(numWeeks)].map((_, i) => addDays(this.displayFirstDate, i * 7))
      },

      colsSpace() {
          return this.kalendar_options.style === "flat_design" ? "5px" : "0px";
      },

      passedTime() {
          let { day_starts_at, day_ends_at, now } = this.kalendar_options;
          let time = getLocaleTime(now);
          let day_starts = `${time.split("T")[0]}T${(day_starts_at + "").padStart(2, '0')}:00:00.000Z`;
          let day_ends = `${time.split("T")[0]}T${(day_ends_at + "").padStart(2, '0')}:00:00.000Z`;
          let time_obj = new Date(time);

          if(new Date(day_ends) < time_obj || time_obj < new Date(day_starts)) return null;

          let distance = (time_obj - new Date(day_starts)) / 1000 / 60;
          return {distance, time};
      }
  },

  methods: {
      daysOfWeek(weekStart) {
          return [...Array(7)].map((_, i) => addDays(weekStart, i).toISOString())
      }
  }
}
</script>

<style lang="scss" scoped>
$blue: #5fb3f2;
$lblue: #d6eefc;
$dblue: #3d79b4;
$lightgrey: #c7c9d5; //$lightgrey: #F5F4F5;
$grey: #c7c9d5; //#C1C4C8;
$a-grey: #666;
$border-color: transparent;
$theme-color: #e5e5e5;

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: white;

  .days {
    margin: 0;
    display: flex;
    margin-left: 55px;

    li {
      display: inline-flex;
      flex: 1;
      font-size: 1.1rem;
      color: $a-grey;
      font-weight: 300;
      margin-right: var(--space-between-cols);
      border-bottom: solid 1px #e5e5e5;
      padding-bottom: 5px;
      position: relative;

      span {
        margin-right: 3px;
      }

      span:first-child {
        font-size: 20px;
        font-weight: 500;
      }
    }

    .today {
      border-bottom-color: var(--main-color);
      color: var(--main-color) !important;
    }

    .today::after {
      content: "";
      position: absolute;
      height: 2px;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: var(--main-color);
    }
  }

  .all-day {
    display: flex;
    margin-bottom: 0px; //border-top: solid 1px #e5e5e5;
    margin-top: 0px;
    border-bottom: solid 2px #e5e5e5;

    span {
      display: flex;
      align-items: center;
      padding: 0px 5px;
      width: 55px;
      font-weight: 500;
      font-size: 0.8rem;
      color: darken($grey, 5);
      text-transform: lowercase;
    }

    li {
      flex: 1; //border-right: solid 5px $border-color;
      margin-right: var(--space-between-cols);

      &.all-today {
        background-color: #fef4f4;
      }
    }
  }
}

.weeks {
  display: flex;
  padding-left: 54px;

  &>ul {
    flex-grow: 1;
  }
}
</style>