<template>
  <div class="kalendar-wrapper" :class="{
            'no-scroll': !scrollable, 
            'is-day-view': kalendar_options.view_type === 'Day', 
            'gstyle': kalendar_options.style === 'material_design', 
    }" @touchstart="scrollable = false" @touchend="scrollable = true">
    <div class="week-navigator">
      <div class="nav-wrapper">
        <button @click="previousWeek()">PREV</button>
        <div>
          <span>{{ kalendar_options.current_day | startOfWeek | formatDate('MMM DD') }}</span>
          <span syle="margin:0px 5px;">-</span>
          <span>{{ kalendar_options.current_day | endOfWeek | formatDate('MMM DD, YYYY') }}</span>
        </div>
        <button @click="nextWeek()">NEXT</button>
      </div>
    </div>
    <kalendar-week-view />
    <portal to="event-creation" class="slotable">
      <div slot-scope="information" class="creating-event">
        <slot name="creating-card" :event_information="information">
        </slot>
      </div>
    </portal>
    <portal to="event-popup-form" class="slotable">
      <div slot-scope="{ events, information }" class="popup-event">
        <slot name="popup-form" :popup_events="events" :popup_information="information">
          <input type="text" placeholder="Event Name">
          <textarea></textarea>
        </slot>
      </div>
    </portal>
    <portal to="event-details" class="slotable">
      <div slot-scope="information" class="created-event">
        <slot name="details-card" :event_information="information">
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

import myWorker from '@/components/kalendar/workers';

export default {
  components: {
    KalendarWeekView: () =>
      import('./kalendar-weekview.vue'),
  },
  props: {
    events: {
      required: true,
      type: Array,
      validator: function(val) {
        return Array.isArray(val);
      }
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
      scrollToNow: false,
      currently_working_on_date: null,
      current_day: null,
      view_type: 'Month',
      style: 'material_design',
      now: new Date,
      military_time: true,
      read_only: false,
      day_starts_at: '0000',
      day_ends_at: '2400'
    },
    kalendar_events: null,
    new_appointment: {},
    scrollable: true,
  }),
  computed: {
    kalendar_options() {
      let options = this.default_options;
      let provided_props = this.configuration;
      if (!isNaN(Date.parse(provided_props.current_day))) {
        provided_props.current_day.setUTCHours(0, 0, 0, 0);
      }
      let today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      options.current_day = today;
      let conditions = {
        //dark: (val) => typeof val === 'boolean',
        scrollToNow: (val) => typeof val === 'boolean',
        current_week: (val) => val === null,
        current_day: (val) => !isNaN(Date.parse(val)),
        view_type: (val) => ['Month', 'Day'].includes(val),
        cell_height: (val) => !isNaN(val),
        style: (val) => ['material_design', 'flat_design'].includes(val),
        military_time: (val) => typeof val === 'boolean',
        read_only: (val) => typeof val === 'boolean',
        day_starts_at: (val) => {
          return typeof val === 'string' &&
            val.length === 4 &&
            !isNaN(val)
        },
        day_ends_at: (val) => {
          return typeof val === 'string' &&
            val.length === 4 &&
            !isNaN(val)
        }
      };
      for (let key in provided_props) {
        if (conditions.hasOwnProperty(key) && conditions[key](provided_props[key])) {
          options[key] = provided_props[key];
        }
      }
      return options;
    },
  },
  created() {
    this.kalendar_events = this.events.map(event => ({
      ...event,
      id: event.id || kalendarHelpers.generateUUID()
    }));
  },
  provide() {
    const provider = {}
    Object.defineProperty(provider, 'kalendar_options', {
      enumerable: true,
      get: () => this.kalendar_options,
    });
    Object.defineProperty(provider, 'kalendar_events', {
      enumerable: true,
      get: () => this.kalendar_events
    });
    provider.updateEvents = (payload) => {
      this.kalendar_events = payload;
      this.$emit('update:events', payload.map(event => ({
        from: event.from,
        to: event.to,
        data: event.data
      })));
    }
    return provider;
  },
  methods: {
    previousWeek() {},
    nextWeek() {}
  }
}
</script>
<style lang="scss" src="./main.scss"></style>