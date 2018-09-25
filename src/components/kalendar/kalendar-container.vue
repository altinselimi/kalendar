<template>
  <div class="calendarium wrapping-all" :class="{'dark': !!calendar_options.dark, 'no-scroll': !scrollable, 'is-day-view': calendar_options.view_type === 'Day', 'gstyle': calendar_options.style === 'material_design', 'non-desktop': isMobile}" @touchstart="scrollable = false" @touchend="scrollable=true" @mouseDown="clearPendingPopups()">
    <portal to="week-navigator-place" class="slotable">
      <div class="week-navigator">
        <slot name="navigation-space">
          <div class="nav-wrapper">
            <button @click="previousWeek()" class="chevron left"></button>
            <div v-if="calendar_options.view_type === 'Month' && !!calendar_options.current_week">
              <slot name="first-date" :date="startOfWeek(calendar_options.current_week[0].date)">
                <span>{{ calendar_options.current_week[0].date | normalizeDate('MMM DD') }}</span>
              </slot>
              <span syle="margin:0px 5px;">-</span>
              <slot name="last-date" :date="endOfWeek(calendar_options.current_week[0].date)">
                <span>{{ calendar_options.current_week[0].date | normalizeDate('MMM DD, YYYY') }}</span>
              </slot>
            </div>
            <div v-else>
              <slot name="current-date" :date="calendar_options.current_day">
                <span>{{ calendar_options.current_day | normalizeDate('DD MMM, YYYY') }}</span>
              </slot>
            </div>
            <button @click="nextWeek()" class="chevron"></button>
          </div>
        </slot>
      </div>
    </portal>
    <portal to="number-date" class="slotable">
      <span slot-scope="{ date }" class="number-date">
        <slot name="number-date" :date="date">{{ formatDate(date, 'D') }}</slot>
      </span>
    </portal>
    <portal to="letters-date" class="slotable">
      <span slot-scope="{ date }" class="letters-date">
        <slot name="letters-date" :date="date">{{ formatDate(date, 'ddd') }}</slot>
      </span>
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
const crypto = window.crypto || window.msCrypto; // IE11 Polyfill

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
      military_time: true,
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
        if (this.isMobile) provided_props.view_type = 'Day';
        let conditions = {
          //dark: (val) => typeof val === 'boolean',
          split_value: (val) => 60 % parseInt(val) === 0,
          scrollToNow: (val) => typeof val === 'boolean',
          current_week: (val) => val === null,
          current_day: (val) => isValid(val),
          view_type: (val) => ['Month', 'Day'].includes(val),
          cell_height: (val) => !isNaN(val),
          style: (val) => ['material_design', 'flat_design'].includes(val),
          military_time: (val) => typeof val === 'boolean',
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
    isMobile() {
      let check = false;
      (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
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