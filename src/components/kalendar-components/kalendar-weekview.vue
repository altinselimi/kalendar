<template>
  <div class="calendar-wrap" :style="`--space-between-cols: ${colsSpace}`">
    <div class="sticky-top">
      <portal-target name="week-navigator-place"></portal-target>
      <ul class="days">
        <li class="day-indicator" v-for="{date} in (days || [])" :class="{'today': _isToday(date), 'is-before': isBefore(date)}">
          <span class="number-date">{{formatDate(date, 'D')}}</span>
          <span class="letters-date">{{formatDate(date,'ddd')}}</span>
        </li>
      </ul>
      <ul class="all-day">
        <span>All Day</span>
        <li v-for="date in (days || [])" :class="{'all-today': _isToday(date), 'is-all-day': false}" :style="`height:${calendarOptions.cell_height + 5}px`"></li>
      </ul>
    </div>
    <div class="dummy-row" v-if="false">
      <ul class="dummy-days">
        <li v-for="day in (days || [])" :style="`height:${calendarOptions.cell_height}px`"></li>
      </ul>
    </div>
    <div class="blocks">
      <div class="calendar-blocks">
        <ul class="hours">
          <li class="hour-row-identifier" v-for="hour in (hours || [])" :style="`height:${hourHeight}px`">
            <span>{{formatDate(hour, 'H A')}}</span>
          </li>
        </ul>
        <div v-show="calendarOptions.style !== 'material_design'" class="hour-indicator-line" :style="`top:calc(${passedtime.percentage}% - 5px)`">
          <span class="time-value">{{passedtime.value}}</span>
          <span class="line"></span>
        </div>
        <kalendar-days :day="day" class="building-blocks" v-for="day in days" :appointments="appointments" :passed-time="passedtime.percentage" @updateAppointments="updateAppointments" @deleteAppointment="deleteAppointment">
        </kalendar-days>
      </div>
    </div>
  </div>
</template>
<script>
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import KalendarDays from './kalendar-day.vue';
import isBefore from 'date-fns/is_before';

export default {
  components: {
    KalendarDays,
  },
  props: ['days', 'hours'],
  inject: ['calendarOptions'],
  created() {
    setInterval(() => this.calendarOptions.now = new Date, 1000 * 60);
  },
  computed: {
    colsSpace() {
      return this.calendarOptions.style === 'flat_design' ? '5px' : '0px';
    },
    hourHeight() {
      return this.calendarOptions.cell_height * (60 / this.calendarOptions.split_value); // * this.calendarOptions.hour_parts;
    },
    passedtime() {
      let time = this.formatDate(this.calendarOptions.now, 'HH:mm');
      let hours_minutes = time.split(':');
      let minutat = hours_minutes[1],
        oret = hours_minutes[0];
      let mintosec = parseInt(minutat) * 60,
        htosec = parseInt(oret) * 3600;
      let sekondat = mintosec + htosec;
      let x = sekondat / 864;
      return { percentage: x, value: time };
    },
    existing_appointments() {
      return this.calendarOptions.existing_appointments;
    },
    appointments: {
      set(val) {
        this.existing_appointments = val;
      },
      get(val) {
        return this.existing_appointments || {};
      },
    },
  },
  methods: {
    formatDate(_format, how) {
      return format(_format, how, { locale: this.calendarOptions.locale });
    },
    _isToday(day) {
      return isToday(day);
    },
    updateAppointments({ id, data }) {
      this.$set(this.appointments, id, data);
    },
    deleteAppointment(appointment_id) {
      this.$delete(this.appointments, appointment_id);
    },
    clearAppointments() {
      this.appointments = {};
    },
    isBefore(day) {
      return isBefore(day, this.calendarOptions.now);
    },
  },
};
</script>
<style lang="scss">
$blue: #5FB3F2;
$lblue: #D6EEFC;
$dblue: #3D79B4;
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
    >li {
      display: flex;
    }
  }
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  .days {
    margin: 0px;
    display: flex;
    margin-left: 50px;
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
      color: var(--main-color)!important;
    }
    .today::after {
      content: '';
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
      width: 50px;
      font-weight: 500;
      font-size: .8rem;
      color: darken($grey, 5);
      text-transform: lowercase;
    }
    li {
      flex: 1; //border-right: solid 5px $border-color;
      margin-right: var(--space-between-cols);
      &.all-today {
        background-color: #FEF4F4;
      }
    }
  }
}

.dummy-row {
  display: flex;
  padding-left: 50px;
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
  font-size: .85rem;
  width: 50px;
  height: 100%;
  margin-bottom: 0px;
  li {
    color: var(--hour-row-color);
    border-bottom: solid 1px $border-color;
    padding-left: 8px;
    span {
      margin-top: -10px;
    }
    &:first-child span {
      visibility: hidden;
    }
  }
}
</style>