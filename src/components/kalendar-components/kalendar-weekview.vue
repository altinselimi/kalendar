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
        <div ref="nowIndicator" v-show="calendarOptions.style !== 'material_design'" class="hour-indicator-line" :style="`top:calc(${passedtime.percentage}% - 5px)`">
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
  mounted() {
    if (this.calendarOptions.scrollToNow) {
      let topoffset = this.$refs.nowIndicator.offsetTop;
      window.scroll({ top: topoffset, left: 0, behavior: 'smooth' });
    }
  },
  computed: {
    colsSpace() {
      return this.calendarOptions.style === 'flat_design' ? '5px' : '0px';
    },
    hourHeight() {
      return this.calendarOptions.cell_height * (60 / this.calendarOptions.split_value); // * this.calendarOptions.hour_parts;
    },
    passedtime() {
      let time = format(this.calendarOptions.now, 'HH:mm');
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
      return format(_format, how);
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