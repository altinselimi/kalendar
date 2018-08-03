<template>
  <div class="calendarium wrapping-all" :class="{'dark': !!calendar_options.dark, 'no-scroll': !scrollable, 'is-day-view': calendar_options.view_type === 'Day', 'gstyle': calendar_options.style === 'material_design'}" @touchstart="scrollable = false" @touchend="scrollable=true" @mouseDown="clearPendingPopups()">
    <portal to="week-navigator-place" class="slotable">
      <div class="week-navigator">
        <slot name="navigation-space">
          <div class="nav-wrapper">
            <button @click="previousWeek()" class="chevron left"></button>
            <div v-if="calendar_options.view_type === 'Month' && !!calendar_options.current_week">
              <span>{{startOfWeek(calendar_options.current_week[0].date) | normalizeDate('MMM DD')}}</span>
              <span style="margin:0px 5px;">-</span>
              <span>{{endOfWeek(calendar_options.current_week[0].date) | normalizeDate('MMM DD, YYYY')}}</span>
            </div>
            <div v-else>
              <span>{{ calendar_options.current_day | normalizeDate('DD MMM, YYYY') }}</span>
            </div>
            <button @click="nextWeek()" class="chevron"></button>
          </div>
        </slot>
      </div>
    </portal>
    <kalendar-week-view :days="calendar_options.current_week" :hours="hours"></kalendar-week-view>
    <portal to="calendar-card" class="slotable">
      <div slot-scope="appointment_props" class="new-event">
        <slot name="creating-card" :appointment_props="appointment_props">
          <h4 class="appointment-title">New Appointment</h4>
          <span class="time">{{getHours(appointment_props.start_value.value, appointment_props.end_value.value)}}
          </span>
        </slot>
      </div>
    </portal>
    <portal to="event-popup" class="slotable">
      <div slot-scope="popup_scope" class="event-popup">
        <slot name="popup-form" :popup_scope="popup_scope">
          <h4 style="margin-bottom: 10px">New Appointment</h4>
          <p>Status: {{popup_scope.status || null}}</p>
          <p>Close popup: {{popup_scope.close_popup}}</p>
          <input v-model="new_appointment['title']" type="text" name="title" placeholder="Title">
          <textarea v-model="new_appointment['description']" type="text" name="description" placeholder="Description" rows="2"></textarea>
          <button @click="popup_scope.close_popup = true">COMPLETE</button>
        </slot>
      </div>
    </portal>
    <portal to="calendar-card-details" class="slotable">
      <div slot-scope="appointment_props" class="existing-event">
        <slot name="details-card" :appointment_props="appointment_props">
          <h4 style="margin-bottom: 10px">{{appointment_props.title}}</h4>
          <p>{{appointment_props.description}}</p>
        </slot>
      </div>
    </portal>
  </div>
</template>
<script>
import Vue from 'vue';
import addDays from 'date-fns/add_days';
import addWeeks from 'date-fns/add_weeks';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import getDay from 'date-fns/get_day';
import format from 'date-fns/format';
import getTime from 'date-fns/get_time';
import isValid from 'date-fns/is_valid';
import addMinutes from 'date-fns/add_minutes';
import smoothscroll from 'smoothscroll-polyfill';
import PortalVue from 'portal-vue';

import "./filters";
Vue.use(PortalVue);

smoothscroll.polyfill();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default {
  components: {
    KalendarWeekView: () =>
      import ('./kalendar-weekview.vue'),
  },
  props: {
    appointments: {
      required: true,
      type: Array,
    },
    configuration: {
      type: Object,
      required: false,
      validator: function(val) {
        return typeof val === 'object';
      },
    },
  },
  data: () => ({
    default_options: {
      dark: false,
      cell_height: 20,
      split_value: 10,
      scrollToNow: false,
      current_week: null,
      currently_working_on_date: null,
      current_day: null,
      view_type: 'Month',
      existing_appointments: {},
      style: 'material_design',
      now: new Date,
    },
    weeks: {},
    hours: [],
    new_appointment: {},
    scrollable: true,
  }),
  computed: {
    hourParts() {
      return (60 / this.calendar_options.split_value) * 24;
    },
    calendar_options: {
      get() {
        let options = this.default_options;
        let provided_props = this.configuration;
        let today = new Date();
        options.current_day = today;
        let conditions = {
          //dark: (val) => typeof val === 'boolean',
          split_value: (val) => 60 % parseInt(val) === 0,
          scrollToNow: (val) => typeof val === 'boolean',
          current_week: (val) => val === null,
          current_day: (val) => isValid(val),
          view_type: (val) => ['Month', 'Day'].includes(val),
          cell_height: (val) => !isNaN(val),
          style: (val) => ['material_design', 'flat_design'].includes(val),
        };
        for (let key in provided_props) {
          if (conditions.hasOwnProperty(key) && conditions[key](provided_props[key])) {
            options[key] = provided_props[key];
          }
        }
        return options;
      },
      set(val) {
        this.configuration = val;
      },
    },
    view_type() {
      return this.calendar_options.view_type;
    },
    split_value() {
      return this.calendar_options.split_value;
    },
    current_day() {
      return this.calendar_options.current_day;
    },
  },
  beforeMount() {
    let visible_hours = [];
    var today = new Date();
    let y = today.getFullYear(),
      m = today.getMonth(),
      d = today.getDate();
    for (let i = 0; i <= 23; i++) {
      visible_hours.push(new Date(y, m, d, i, 0, 0));
    }
    this.hours = visible_hours;
  },
  mounted() {
    this.generateCalendarProperties();
  },
  provide() {
    const provider = {}
    Object.defineProperty(provider, 'calendarOptions', {
      enumerable: true,
      get: () => this.calendar_options,
    })
    console.log('Providers:', provider);
    return provider;
  },
  methods: {
    constructWeek() {
      let filtered_appointments = {};
      let date = new Date(this.calendar_options.current_day);
      date.setHours(0, 0, 0, 0);
      let _days = [];
      let start = this.calendar_options.view_type === 'Month' ? startOfWeek(date) : format(date);
      let num_of_days = this.calendar_options.view_type === 'Month' ? 7 : 1;
      for (let i = 0; i < num_of_days; i++) {
        let _date = addDays(start, i);
        let payload = {
          date: format(_date, 'YYYY-MM-DD'),
        };
        payload.date_hours = new Array(this.hourParts).fill(1).map((hour, index) => {
          return {
            value: index > 0 ? addMinutes(_date, index * this.calendar_options.split_value) : _date,
            selected: false,
            isInBetween: false,
            appointment_id: null,
            index: index,
            starter: false,
          }
        });

        let hasExistingAppointments = this.appointments.filter(appointment => appointment.date === payload.date);
        if (hasExistingAppointments.length > 0) {
          hasExistingAppointments.forEach(appointment => {
            let target_hour_from = payload.date_hours.find(hour => getTime(hour.value) === getTime(appointment.from));
            let target_hour_to = payload.date_hours.find(hour => getTime(hour.value) === getTime(appointment.to));
            if (!target_hour_from || !target_hour_to) return;
            let uuid = this.generateUUID();
            filtered_appointments[uuid] = {
              start: target_hour_from.index,
              end: target_hour_to.index - 1,
              data: appointment.data,
              status: 'completed',
            };
            for (let i = target_hour_from.index; i < target_hour_to.index; i++) {
              payload.date_hours[i] = { ...payload.date_hours[i], ['appointment_id']: uuid };
            }
          });
        }
        _days.push(payload);
      }
      return { filtered_appointments: filtered_appointments, _days: _days };
    },
    formatDate(_format, how) {
      return format(_format, how);
    },
    generateUUID() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    startOfWeek(value) {
      return startOfWeek(value);
    },
    endOfWeek(value) {
      return endOfWeek(value);
    },
    previousWeek() {
      this.calendar_options.current_day = this.calendar_options.view_type === 'Month' ? addWeeks(this.calendar_options.current_day, -1) : addDays(this.calendar_options.current_day, -1);
      this.generateCalendarProperties();
    },
    nextWeek() {
      this.calendar_options.current_day = this.calendar_options.view_type === 'Month' ? addWeeks(this.calendar_options.current_day, 1) : addDays(this.calendar_options.current_day, 1);
      this.generateCalendarProperties();
    },
    generateCalendarProperties() {
      //this.$set(this.calendar_options, 'existing_appointments', null);
      let constructed_week = this.constructWeek();
      let { filtered_appointments, _days } = constructed_week;
      this.$set(this.calendar_options, 'existing_appointments', filtered_appointments);
      this.weeks[_days[0].date] = _days;
      this.$set(this.calendar_options, 'current_week', _days);
    },
    getHours(start, end) {
      return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
    },
  },
  watch: {
    appointments(val) {
      if (val) this.generateCalendarProperties();
    },
    view_type(val) {
      if (['Month', 'Day'].includes(val)) {
        this.generateCalendarProperties();
      }
    },
    split_value(val) {
      if (60 % parseInt(val) === 0) this.generateCalendarProperties();
    },
    current_day(val) {
      if (val) this.generateCalendarProperties();
    }
  },
}
</script>
<style lang="scss" src="./main.scss"></style>