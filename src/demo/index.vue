<template>
  <div>
    <quick-intro></quick-intro>
    <add-manual-event v-if="adding_manually"
                      @close="adding_manually = false"
                      @done="addManually" />
    <options :data.sync="calendar_settings" />
    <button class="add-manual"
            @click="adding_manually = true">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <div class="calendar-component"
         :class="{'show-slots': outline_slots}">
      <kalendar :configuration.sync="calendar_settings"
                :events.sync="events"
                :key="kalendarRenderId"
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
            <button @click="addEvent(popup_information)">
              Save
            </button>
          </div>
        </div>
      </kalendar>
    </div>
    <how-to></how-to>
  </div>
</template>
<script>
const existing_events = [{
    "from": "2019-06-27T04:00:00.300Z",
    "to": "2019-06-27T04:10:00.300Z",
    "data": {
      "title": "Right now",
      "description": "Lorem ipsum"
    }
  },
  {
    "from": "2019-06-26T10:22:00-07:00",
    "to": "2019-06-26T11:55:00-07:00",
    "data": {
      "title": "Truth",
      "description": "Look."
    }
  },
  {
    "from": "2019-06-26T10:22:00-07:00",
    "to": "2019-06-26T11:20:00-07:00",
    "data": {
      "title": "Side",
      "description": "Look.2"
    }
  },
  {
    "from": "2019-06-26T10:22:00+02:00",
    "to": "2019-06-26T11:20:00+02:00",
    "data": {
      "title": "Europe",
      "description": "Final Countdown"
    }
  }
];

let today = new Date();
let year = today.getFullYear() + '',
  month = ((today.getMonth() + 1) + '').padStart(2, 0),
  day = (today.getDate() + '').padStart(2, 0);

const currentDay = `${year}-${month}-${day}T00:00:00.000Z`;

import Vue from 'vue';

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import Kalendar from '../components/kalendar/kalendar-container.vue';
//import { Kalendar } from 'kalendar-vue';
//import 'kalendar-vue/dist/kalendar-vue.css';

import { DatePicker, TimePicker, Select, Input, TimeSelect, Option, Checkbox, Form } from 'element-ui';
Vue.use(DatePicker, { locale });
Vue.use(TimePicker, { locale });
Vue.use(Select, { locale });
Vue.use(Input, { locale });
Vue.use(TimeSelect, { locale });
Vue.use(Option, { locale });
Vue.use(Checkbox, { locale });
Vue.use(Form, { locale });

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import HowTo from './how-to.vue';
import { DateTime } from 'luxon';

import addManualEvent from './manual-event.vue';

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
    quickIntro: () =>
      import('./quick-intro.vue'),
    HowTo,
    addManualEvent
  },
  computed: {
    kalendarRenderId() {
      let { view_type, scrollToNow, current_day, read_only, day_starts_at, day_ends_at, overlap, hide_dates, hide_days, past_event_creation } = this.calendar_settings;
      let arr = [view_type, scrollToNow, current_day, read_only, day_starts_at, day_ends_at, overlap, hide_dates, hide_days, past_event_creation];
      console.log({arr});
      return arr.join('-');
    },
  },
  data: () => ({
    events: [],
    calendar_settings: {
      view_type: 'week',
      cell_height: 10,
      scrollToNow: false,
      current_day: currentDay,
      style: 'material_design',
      military_time: false,
      read_only: false,
      day_starts_at: 0,
      day_ends_at: 24,
      overlap: true,
      hide_dates: ['2019-10-31'],
      hide_days: [6],
      past_event_creation: true
    },
    outline_slots: false,
    new_appointment: {},
    adding_manually: false,
    input_value: '',
  }),
  methods: {
    getHours(start, end) {
      return `${format(start, 'hh:mm A')} - ${format(end, 'hh:mm A')}`;
    },
    addEvent(popup_info) {
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
    },
    addManually(payload) {
      this.$kalendar.addNewEvent(
        payload,
      );
      this.adding_manually = false;
    },
    removeEvent(kalendarEvent) {
      console.log({kalendarEvent});
      let day = kalendarEvent.start_time.slice(0, 10);
      this.$kalendar.removeEvent({
        day,
        key: kalendarEvent.key,
        id: kalendarEvent.kalendar_id,
      })
    },
  },
};
</script>
<style lang="scss">
$green: #00F0B5;
$red: #F61067;
$blue: #007FFF;
$yellow: #F5D547;
$dark: #3C3C3B;

body {
  margin: 0px;

  * {
    box-sizing: border-box;
  }
}

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
    padding-right: 0px;
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

.add-manual {
  border: none;
  background-color: $blue;
  color: white;

  svg {
    stroke: white;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  z-index: 2;
}

.manual-add {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: rgba(black, .7);

  >form {
    max-width: 540px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    position: relative;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 10px;
    border-bottom: solid 1px whitesmoke;
    padding-bottom: 10px;
  }

  .info {
    font-size: 12px;
    color: grey;
  }

  button.save {
    border: none;
    margin-top: 15px;
    padding: 10px;
    background-color: blue;
    color: white;
    font-size: 16px;
    border-radius: 8px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  button.close {
    border: none;
    outline: none;
    transform: rotate(45deg);
    background: transparent;
    position: absolute;
    top: -25px;
    right: -25px;

    svg {
      stroke: white;
    }
  }

  .el-input,
  textarea {
    font-size: 14px;
    min-width: 160px;
    max-width: 200px;
    margin-left: auto;
  }
}

.show-slots .vue-portal-target {
  outline: dashed 1px red;
  outline-offset: -1px;
}
</style>