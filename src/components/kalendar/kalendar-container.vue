<template>
  <div class="kalendar-wrapper"
       :class="{
            'no-scroll': !scrollable, 
            'gstyle': kalendar_options.style === 'material_design', 
            'day-view': kalendar_options.view_type === 'day',
    }"
       @touchstart="scrollable = false"
       @touchend="scrollable = true">
    <div class="week-navigator">
      <div class="nav-wrapper"
           v-if="kalendar_options.view_type === 'week'">
        <button class="week-navigator-button" @click="previousWeek()">
          <svg style="transform: rotate(180deg)" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <div>
          <span>{{ kalendar_options.formatWeekNavigator(kalendar_options.current_day) }}</span>
        </div>
        <button class="week-navigator-button" @click="nextWeek()">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
      <div class="nav-wrapper"
           v-if="kalendar_options.view_type === 'day'">
        <button class="week-navigator-button" @click="previousDay()">
          <svg style="transform: rotate(180deg)" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <div>
          <span>{{ kalendar_options.formatDayNavigator(kalendar_options.current_day) }}</span>
        </div>
        <button class="week-navigator-button" @click="nextDay()">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
    <kalendar-week-view />
    <portal to="event-creation"
            class="slotable">
      <div slot-scope="information"
           class="creating-event">
        <slot name="creating-card"
              :event_information="information">
          <h4 class="appointment-title"
              style="text-align: left;">
            New Appointment
          </h4>
          <span class="time">
            {{getTime(information.start_time)}}
            -
            {{getTime(information.end_time)}}
          </span>
        </slot>
      </div>
    </portal>
    <portal to="event-popup-form"
            class="slotable">
      <div slot-scope="information"
           class="popup-event">
        <slot name="popup-form"
              :popup_information="information">
          <h4 style="margin-bottom: 10px">
            New Appointment
          </h4>
          <input v-model="new_appointment['title']"
                 type="text"
                 name="title"
                 placeholder="Title">
          <textarea v-model="new_appointment['description']"
                    type="text"
                    name="description"
                    placeholder="Description"
                    rows="2"></textarea>
          <div class="buttons">
            <button class="cancel"
                    @click="closePopups()">
              Cancel
            </button>
            <button @click="addAppointment(information)">
              Save
            </button>
          </div>
        </slot>
      </div>
    </portal>
    <portal to="event-details"
            class="slotable">
      <div slot-scope="information"
           class="created-event">
        <slot name="created-card"
              :event_information="information">
          <h4 style="margin-bottom: 5px">{{information.title}}</h4>
          <p>{{information.description}}</p>
        </slot>
      </div>
    </portal>
  </div>
</template>
<script>
import Vue from 'vue';
import PortalVue from 'portal-vue';

import Utils from "./utils.js";
window.kalendarHelpers = {};
for (let util of Object.keys(Utils)) {
  window.kalendarHelpers[util] = Utils[util];
}

Vue.use(PortalVue);

const crypto = window.crypto || window.msCrypto; // IE11 Polyfill

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// we are going to use web workers to do the heavy lifting
// needed for our kalendar component to work and render correctly
import myWorker from '@/components/kalendar/workers';

export default {
  components: {
    KalendarWeekView: () =>
      import('./kalendar-weekview.vue'),
  },
  props: {
    // this provided array will be kept in sync
    events: {
      required: true,
      type: Array,
      validator: function(val) {
        return Array.isArray(val);
      }
    },
    // use this to enable/disable stuff which
    // are supported by Kalendar itself
    configuration: {
      type: Object,
      required: false,
      validator: function(val) {
        return typeof val === 'object';
      },
    },
  },
  data() {
    let today = kalendarHelpers.getHourlessDate();
    return {
      default_options: {
        dark: false,
        cell_height: 10,
        scrollToNow: false,
        current_day: today,
        view_type: 'week',
        style: 'material_design',
        now: new Date,
        military_time: true,
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        time_mode: 'relative',
        overlap: true,
        past_event_creation: true,
        formatLeftHours: (date) => {
          return Utils.getDatelessHour(date, this.configuration.military_time);
        },
        formatDayTitle: (date) => {
          let isoDate = new Date(date);
          let dayName = isoDate.toUTCString().slice(0, 3);
          let dayNumber = isoDate.getUTCDate();
          return [dayName, dayNumber];
        },
        formatWeekNavigator: (isoDate) => {
          let startDate = Utils.startOfWeek(isoDate);
          let endDate = Utils.endOfWeek(isoDate);
          let startString = startDate.toUTCString().slice(5, 11);
          let endString = endDate.toUTCString().slice(5, 11);
          return `${startString} - ${endString}`;
        },
        formatDayNavigator: (isoDate) => {
          let day = new Date(isoDate);
          return day.toUTCString().slice(5, 11);
        }
      },
      kalendar_events: null,
      new_appointment: {},
      scrollable: true,
    }
  },
  computed: {
    kalendar_options() {
      let options = this.default_options;
      let provided_props = this.configuration;

      let conditions = {
        //dark: (val) => typeof val === 'boolean',
        scrollToNow: (val) => typeof val === 'boolean',
        current_week: (val) => val === null,
        current_day: (val) => !isNaN(Date.parse(val)),
        view_type: (val) => ['week', 'day'].includes(val),
        cell_height: (val) => !isNaN(val),
        style: (val) => ['material_design', 'flat_design'].includes(val),
        military_time: (val) => typeof val === 'boolean',
        read_only: (val) => typeof val === 'boolean',
        day_starts_at: (val) => {
          return typeof val === 'number' &&
            val >= 0 &&
            val <= 24;
        },
        day_ends_at: (val) => {
          return typeof val === 'number' &&
            val >= 0 &&
            val <= 24;
        },
        hide_dates: val => Array.isArray(val),
        hide_days: val => Array.isArray(val) && !val.find(n => typeof n !== 'number'),
        overlap: val => typeof val === 'boolean',
        past_event_creation: val => typeof val === 'boolean',
      };
      for (let key in provided_props) {
        if (conditions.hasOwnProperty(key) && conditions[key](provided_props[key])) {
          options[key] = provided_props[key];
        }
      }
      return options;
    }
  },
  created() {
    this.kalendar_events = this.events.map(event => ({
      ...event,
      id: event.id || kalendarHelpers.generateUUID()
    }));

    this.$kalendar.getEvents = () => {
      return this.kalendar_events.slice(0);
    }

    this.$kalendar.updateEvents = (payload) => {
      this.kalendar_events = payload.map(event => ({
        ...event,
        id: event.id || kalendarHelpers.generateUUID()
      }));
      this.$emit('update:events', payload.map(event => ({
        from: event.from,
        to: event.to,
        data: event.data
      })));
    };
  },
  provide() {
    const provider = {}
    Object.defineProperty(provider, 'kalendar_options', {
      enumerable: true,
      get: () => this.kalendar_options,
    });
    Object.defineProperty(provider, 'kalendar_events', {
      enumerable: true,
      get: () => this.kalendar_events,
    });
    return provider;
  },
  methods: {
    previousDay() {
      let { current_day } = this.kalendar_options;
      let target_day = kalendarHelpers.addDays(current_day, -1);
      let config = kalendarHelpers.cloneObject(this.configuration);
      config = {
        ...config,
        current_day: target_day.toISOString()
      };
      this.$emit('update:configuration', config);
      setTimeout(() => {
        this.$kalendar.buildWeek();
      });
    },
    nextDay() {
      let { current_day } = this.kalendar_options;
      let target_day = kalendarHelpers.addDays(current_day, 1);
      let config = kalendarHelpers.cloneObject(this.configuration);
      config = {
        ...config,
        current_day: target_day.toISOString()
      };
      this.$emit('update:configuration', config);
      setTimeout(() => {
        this.$kalendar.buildWeek();
      });
    },
    previousWeek() {
      let { current_day } = this.kalendar_options;
      let nextWeek = new Date(current_day);
      nextWeek.setDate(nextWeek.getDate() - 7);
      nextWeek.setUTCHours(0, 0, 0, 0);

      let config = kalendarHelpers.cloneObject(this.configuration);
      config = {
        ...config,
        current_day: nextWeek.toISOString()
      };

      this.$emit('update:configuration', config);
      setTimeout(() => {
        this.$kalendar.buildWeek();
      });
    },
    nextWeek() {
      let { current_day } = this.kalendar_options;
      let nextWeek = new Date(current_day);
      nextWeek.setDate(nextWeek.getDate() + 7);
      nextWeek.setUTCHours(0, 0, 0, 0);

      let config = kalendarHelpers.cloneObject(this.configuration);
      config = {
        ...config,
        current_day: nextWeek.toISOString()
      };

      this.$emit('update:configuration', config);
      setTimeout(() => {
        this.$kalendar.buildWeek();
      });
    },
    getTime(date) {
      let dateObj = new Date(date);
      let minutes = dateObj.getUTCHours().toString().padStart(2, 0);
      let seconds = dateObj.getUTCMinutes().toString().padStart(2, 0);
      return `${minutes}:${seconds}`;
    },
    addAppointment(popup_info) {
      let payload = {
        data: {
          title: this.new_appointment.title,
          description: this.new_appointment.description,
        },
        from: popup_info.start_time,
        to: popup_info.end_time,
      };

      this.$kalendar.addNewEvent(
        payload,
      );
      this.$kalendar.closePopups();
      this.clearFormData();
    },
    clearFormData() {
      this.new_appointment = {
        description: null,
        title: null,
      };
    },
    closePopups() {
      this.$kalendar.closePopups();
    },
  }
}
</script>
<style lang="scss"
       src="./main.scss"></style>