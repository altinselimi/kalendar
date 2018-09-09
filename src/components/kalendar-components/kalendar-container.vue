<template>
  <div class="calendarium wrapping-all" :class="{'dark': !!calendar_options.dark, 'no-scroll': !scrollable, 'is-day-view': calendar_options.view_type === 'Day', 'gstyle': calendar_options.style === 'material_design', 'non-desktop': isMobile}" @touchstart="scrollable = false" @touchend="scrollable=true" @mouseDown="clearPendingPopups()">
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
          <div slot="popup-form" slot-scope="{popup_scope}" style="display: flex; flex-direction: column;">
            <!-- This is the popup that is displayed when user has finished dragging(selecting) appointment start and end values. -->
            <!-- You can use the popup_scope variable to access various fields, such as: appointment_data (similar to appointment_props) and close. -->
            <!-- There is a listener attached to the close field. Whenever it gets a false value, the popup closes. -->
            <!-- You can add as many fields as you want. When saving them, make sure to insert them in the data field of the payload for appointments array. In that way you can access them even in the *details-card* slot.-->
            <h4 style="margin-bottom: 10px">New Appointment</h4>
            <input v-model="new_appointment['title']" type="text" name="title" placeholder="Title">
            <textarea v-model="new_appointment['description']" type="text" name="description" placeholder="Description" rows="2"></textarea>
            <div class="buttons">
              <button class="cancel" @click="popup_scope.close_popup = true">Cancel</button>
              <button @click="completeAppointment(popup_scope, new_appointment)">Save</button>
            </div>
          </div>
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

//date fns functions
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

import utils from './utils';
import "./filters";
Vue.use(PortalVue);

smoothscroll.polyfill();
const crypto = window.crypto || window.msCrypto; // IE11 Polyfill

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
      cell_height: 10,
      split_value: 5,
      scrollToNow: false,
      current_week: null,
      currently_working_on_date: null,
      current_day: null,
      view_type: 'Month',
      existing_appointments: {},
      style: 'material_design',
      now: new Date,
      military_time: true,
    },
    new_appointment: {},
    scrollable: true,
  }),
  computed: {
    hourParts() {
      return (60 / this.calendar_options.split_value) * 24;
    },
    week_days() {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      let { view_type, current_day } = this.calendar_options;
      let date = new Date(current_day);
      date.setHours(0, 0, 0, 0);
      let start = startOfWeek(date);
      let num_of_days = 7;
      if (view_type === 'Day') {
        start = format(date);
        num_of_days = 1;
      }
      return days.map((day, index) => addDays(start, index));
    },
    hours() {
      return utils.getDayHours();
    },
    calendar_options: {
      get() {
        let options = this.default_options;
        let provided_props = this.configuration;
        let today = new Date();
        options.current_day = today;
        if (this.isMobile) provided_props.view_type = 'Day';
        let conditions = {
          //dark: (val) => typeof val === 'boolean',
          //split_value: (val) => 60 % parseInt(val) === 0,
          scrollToNow: (val) => typeof val === 'boolean',
          current_week: (val) => val === null,
          current_day: (val) => isValid(val),
          view_type: (val) => ['Month', 'Day'].includes(val),
          cell_height: (val) => !isNaN(val),
          style: (val) => ['material_design', 'flat_design'].includes(val),
          military_time: (val) => typeof val === 'boolean',
        };
        for (let key in provided_props) {
          let prop_value = provided_props[key];
          if (conditions.hasOwnProperty(key) && conditions[key](prop_value)) {
            options[key] = prop_value;
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
    isMobile() {
      return utils.isMobile();
    },
  },
  provide() {
    const provider = {}
    Object.defineProperty(provider, 'calendarOptions', {
      enumerable: true,
      get: () => this.calendar_options,
    })
    return provider;
  },
  filters: {
    formatDate(value, how) {
      if(!value) return;
      return format(value, how);
    }
  },
  methods: {
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
      this.$set(this.calendar_options, 'current_week', _days);
    },
    getHours(start, end) {
      return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
    },
  },
}
</script>
<style lang="scss" src="./main.scss"></style>