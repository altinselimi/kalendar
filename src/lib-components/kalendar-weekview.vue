<template>
  <div class="calendar-wrap" :style="`--space-between-cols: ${colsSpace}`">
    <div class="sticky-top">
      <ul class="days">
        <li
          class="day-indicator"
          :key="index"
          v-for="({ value }, index) in days || []"
          :class="{ today: _isToday(value), 'is-before': isDayBefore(value) }"
        >
          <div>
            <span class="letters-date">{{
              kalendar_options.formatDayTitle(value)[0]
            }}</span>
            <span class="number-date">{{
              kalendar_options.formatDayTitle(value)[1]
            }}</span>
          </div>
        </li>
      </ul>
      <ul class="all-day">
        <span>All Day</span>
        <li
          :key="index"
          v-for="(date, index) in days || []"
          :class="{ 'all-today': _isToday(date.value), 'is-all-day': false }"
          :style="`height:${kalendar_options.cell_height + 5}px`"
        ></li>
      </ul>
    </div>
    <div class="dummy-row" v-if="false">
      <ul class="dummy-days">
        <li
          :key="index"
          v-for="(day, index) in days || []"
          :style="`height:${kalendar_options.cell_height}px`"
        ></li>
      </ul>
    </div>
    <div class="blocks" v-if="hours">
      <div class="calendar-blocks">
        <ul class="hours">
          <li
            class="hour-row-identifier"
            :key="index"
            v-for="(hour, index) in hoursVisible"
            :style="`height:${hourHeight}px`"
          >
            <span>{{ kalendar_options.formatLeftHours(hour.value) }}</span>
          </li>
        </ul>
        <div
          v-show="kalendar_options.style !== 'material_design'"
          class="hour-indicator-line"
          :style="`top:${passedTime.distance}px`"
        >
          <span class="time-value">{{ passedTime.value }}</span>
          <span class="line"></span>
        </div>
        <kalendar-days
          :day="day"
          class="building-blocks"
          :class="`day-${index + 1}`"
          :key="day.value.slice(0, 10)"
          v-for="(day, index) in days"
          :passed-time="passedTime.distance"
          :ref="day.value.slice(0, 10)"
        >
        </kalendar-days>
      </div>
    </div>
  </div>
</template>
<script>
import KalendarDays from "./kalendar-day.vue";
import myWorker from "@/lib-components/workers";
import {
  isBefore,
  isToday,
  getHourlessDate,
  addTimezoneInfo,
  getLocaleTime,
} from "./utils";

export default {
  props: {
    current_day: {
      required: true,
      type: String,
      validator: d => !isNaN(Date.parse(d)),
    }
  },
  components: {
    KalendarDays
  },
  created() {
    this.addHelperMethods();
    setInterval(() => (this.kalendar_options.now = new Date()), 1000 * 60);
    this.constructWeek();
  },
  inject: ["kalendar_options", "kalendar_events"],
  data: () => ({
    hours: null,
    days: []
  }),
  computed: {
    hoursVisible() {
      if (!this.hours) return [];
      return this.hours.filter(x => !!x.visible);
    },
    colsSpace() {
      return this.kalendar_options.style === "flat_design" ? "5px" : "0px";
    },
    hourHeight() {
      return 6 * this.kalendar_options.cell_height;
      //this.kalendar_options.cell_height * (60 / this.kalendar_options.split_value);
      // * this.kalendar_options.hour_parts;
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
    _isToday(day) {
      return isToday(day);
    },
    updateAppointments({ id, data }) {
      this.$emit("update", { id, data });
    },
    deleteAppointment(id) {
      this.$emit("delete", { id });
    },
    clearAppointments() {
      this.$emit("clear");
    },
    isDayBefore(day) {
      let now = new Date(this.kalendar_options.now);
      let formattedNow = getLocaleTime(now.toISOString());
      return isBefore(day, getHourlessDate(formattedNow));
    },
    constructWeek() {
      const date = this.current_day.slice(0, 10);
      const { hide_dates, hide_days, view_type } = this.kalendar_options;
      return Promise.all([
        myWorker
          .send("getDays", {
            day: date,
            options: {
              hide_dates,
              hide_days,
              view_type
            }
          })
          .then(reply => {
            this.days = reply; //.slice(0,1);
          }),
        myWorker
          .send("getHours", {
            hourOptions: {
              start_hour: this.kalendar_options.day_starts_at,
              end_hour: this.kalendar_options.day_ends_at
            }
          })
          .then(reply => {
            // Handle the reply
            this.hours = reply;
          })
      ]);
    },
    addHelperMethods() {
      this.$kalendar.buildWeek = () => {
        this.constructWeek();
      };
      this.$kalendar.addNewEvent = payload => {
        if (!payload) return Promise.reject("No payload");

        let { from, to } = payload;
        if (from.slice(-4) === "000Z") payload.from = addTimezoneInfo(from);
        if (to.slice(-4) === "000Z") payload.to = addTimezoneInfo(to);
        let targetRef = payload.from.slice(0, 10);
        const refObject = this.$refs[targetRef];
        if (refObject && refObject[0]) {
          refObject[0].addEvent(payload);
        } else {
          // appointment is not in this view
          let events = this.$kalendar.getEvents();
          events.push(payload);
          this.$kalendar.updateEvents(events);
        }
      };

      this.$kalendar.removeEvent = options => {
        let { day, key, id } = options;
        if (day.length > 10) {
          day = day.slice(0, 10);
        }
        console.log("Options:", options);
        if (!day) return Promise.reject("Day wasn't provided");
        if (!id) return Promise.reject("No ID was provided");
        if (!key) return Promise.reject("No key was provided in the object");
        let targetRef = day;
        this.$refs[targetRef][0].removeEvent({ id, key });
      };

      this.$kalendar.closePopups = () => {
        let refs = this.days.map(day => day.value.slice(0, 10));
        refs.forEach(ref => {
          this.$refs[ref][0].clearCreatingLeftovers();
        });
      };
    }
  }
};
</script>
<style lang="scss">
$blue: #5fb3f2;
$lblue: #d6eefc;
$dblue: #3d79b4;
$lightgrey: #c7c9d5; //$lightgrey: #F5F4F5;
$grey: #c7c9d5; //#C1C4C8;
$a-grey: #666;
$border-color: transparent;
$theme-color: #e5e5e5;

.calendar-wrap {
  display: flex;
  flex-direction: column;

  ul {
    list-style: none;
    padding: 0px;

    > li {
      display: flex;
    }
  }
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: white;

  .days {
    margin: 0px;
    display: flex;
    margin-left: 55px;

    li {
      display: inline-flex;
      align-items: flex-end;
      padding-top: 10px;
      flex: 1;
      font-size: 1.1rem;
      color: $a-grey;
      font-weight: 300;
      margin-right: var(--space-between-cols);
      border-bottom: solid 1px #e5e5e5;
      padding-bottom: 5px;
      position: relative;
      font-size: 18px;

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

.dummy-row {
  display: flex;
  padding-left: 55px;

  ul {
    display: flex;
    flex: 1;
    margin: 0px;
  }

  li {
    flex: 1;
    height: 15px; //border-right: solid 5px $border-color;
    margin-right: var(--space-between-cols);
    border-bottom: solid 1px #e5e5e5;
  }
}

.blocks {
  display: flex;
  position: relative;
  height: 100%;

  ul {
    margin-top: 0px;
  }

  .building-blocks {
    flex: 1;
    margin-right: var(--space-between-cols);
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
  }

  .calendar-blocks {
    width: 100%;
    display: flex;
    position: relative;
  }
}

.hours {
  display: flex;
  flex-direction: column;
  color: darken($grey, 5);
  font-weight: 500;
  font-size: 0.85rem;
  width: 55px;
  height: 100%;
  margin-bottom: 0px;

  li {
    color: var(--hour-row-color);
    border-bottom: solid 1px $border-color;
    padding-left: 8px;

    span {
      margin-top: -8px;
    }

    &:first-child span {
      visibility: hidden;
    }
  }
}
</style>
