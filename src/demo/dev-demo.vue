<template>
  <div>
    <button @click="addManually()">addManually</button>
    <kalendar :configuration.sync="calendar_settings"
              :events.sync="events"
              class="generate-shadow">
      <!-- CREATED CARD SLOT -->
      <div slot="created-card"
           slot-scope="{ event_information }"
           class="details-card">
        <h4 class="appointment-title">{{event_information.data.title}}</h4>
        <small>
          {{event_information.data.description}}
        </small>
        <span class="time">{{event_information.start_time | formatToHours}} - {{event_information.end_time |
          formatToHours}}</span>
        <button @click="removeEvent(event_information)"
                class="remove">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1326">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
      </div>
      <!-- CREATING CARD SLOT -->
      <div slot="creating-card"
           slot-scope="{ event_information }">
        <h4 class="appointment-title"
            style="text-align: left;">
          New Appointment
        </h4>
        <span class="time">
          {{event_information.start_time | formatToHours}}
          -
          {{event_information.end_time | formatToHours}}
        </span>
      </div>
      <!-- POPUP CARD SLOT -->
      <div slot="popup-form"
           slot-scope="{ popup_information }"
           style="display: flex; flex-direction: column;">
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
          <button @click="addAppointment(popup_information)">
            Save
          </button>
        </div>
      </div>
    </kalendar>
  </div>
</template>
<script>
import Utils from '../components/kalendar/utils.js';

const existing_events = [{
  "from": "2019-07-30T04:00:00.300Z",
  "to": "2019-07-30T04:10:00.300Z",
  "data":
  {
    "title": "Right now",
    "description": "Lorem ipsum"
  }
},
{
  "from": "2019-07-31T10:22:00-07:00",
  "to": "2019-07-31T11:55:00-07:00",
  "data":
  {
    "title": "Truth",
    "description": "Look."
  }
},
{
  "from": "2019-07-31T10:22:00-07:00",
  "to": "2019-07-31T11:20:00-07:00",
  "data":
  {
    "title": "Side",
    "description": "Look.2"
  }
},
{
  "from": "2019-07-31T10:22:00+02:00",
  "to": "2019-07-31T11:20:00+02:00",
  "data":
  {
    "title": "Europe",
    "description": "Final Countdown"
  }
}];

let today = new Date();
let year = today.getFullYear() + '',
  month = ((today.getMonth() + 1) + '').padStart(2, 0),
  day = (today.getDate() + '').padStart(2, 0);

const currentDay = `${year}-${month}-${day}T00:00:00.000Z`;

import Vue from 'vue';

import Kalendar from '../components/kalendar/kalendar-container.vue';
import { DateTime } from 'luxon';

export default {
  created() {
    Vue.filter('formatToHours', (value, how) => {
      let dt = DateTime.fromISO(value);
      return dt.toLocaleString(DateTime.TIME_24_SIMPLE);
    });
  },
  components: {
    Kalendar,
    options: () =>
      import('./options.vue'),
  },
  data() {
    return {
      events: existing_events,
      calendar_settings: {
        view_type: 'week',
        cell_height: 10,
        scrollToNow: false,
        current_day: currentDay,
        military_time: false,
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: true,
        hide_dates: ['2019-08-09'],
        hide_days: [5,6],
        past_event_creation: true
      },
      outline_slots: false,
      new_appointment: {},
      manual_form: {},
      adding_manually: false,
      input_value: '',
    };
  },
  methods: {
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
    closePopups() {
      this.$kalendar.closePopups();
    },
    clearFormData() {
      this.new_appointment = {
        description: null,
        title: null,
      };
      this.manual_appointment = { ...this.new_appointment,
        from: null,
        to: null,
        date: null,
      };
    },
    addManually() {
      let title = 'New one';
      let description = 'Lorem dsr';
      let from = "2019-08-01T10:22:00+02:00";
      let to = "2019-08-02T11:20:00+02:00";
      let payload = {
        data: { title, description },
        from,
        to
      };
      this.$kalendar.addNewEvent(
        payload,
      );
    },
    removeEvent(kalendarEvent) {
      console.log('KalendarEvent', kalendarEvent);
      let day = kalendarEvent.start_time.slice(0, 10);
      this.$kalendar.removeEvent({
        day,
        key: kalendarEvent.key,
        id: kalendarEvent.kalendar_id,
      })
      console.log('Event:', kalendarEvent);
    },
  },
};
</script>
<style lang="scss">
$green: #00F0B5;
$red: #F61067;

.details-card {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;

  button {
    margin: 0;
    border: none;
    color: #4c4b4b;
    position: absolute;
    padding-right:0px;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background: transparent;

    svg {
      width: 18px;
      height: 18px;
      fill: white;
    }
  }

  .remove {
    opacity: 0;
    transition: opacity .15s;
  }

  &:hover .remove {
    opacity: 1;
  }
}

.popup-event .buttons {
  display: flex;
  justify-content: space-between;
}

.popup-event .buttons button {
  border: none;
  color: #29771c;
  background-color: rgba($green, .04);
  padding: 5px 10px;

  &.cancel {
    background-color: rgba($red, .04);
    color: $red;
  }
}
</style>