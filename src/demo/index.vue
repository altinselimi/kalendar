<template>
  <div class="calendarium">
    <quick-intro></quick-intro>
    <button class="add-manual"
            @click="adding_manually = true">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round"
           class="feather feather-plus">
        <line x1="12"
              y1="5"
              x2="12"
              y2="19"></line>
        <line x1="5"
              y1="12"
              x2="19"
              y2="12"></line>
      </svg>
    </button>
    <div class="manual-add"
         v-show="adding_manually">
      <form name="manual-form">
        <label>Title
          <el-input v-model="manual_form['title']"
                    name="title"
                    placeholder="Title" />
        </label>
        <label>Description
          <el-input v-model="manual_form['description']"
                    type="textarea"
                    name="description"
                    placeholder="Description"
                    rows="2"></el-input>
        </label>
        <label>Date
          <el-date-picker v-model="manual_form['date']"
                          type="date"
                          placeholder="Pick a day"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </label>
        <label>
          From
          <el-time-select :picker-options="{ start: '00:00',step: '00:15',end: '24:00'}"
                          v-model="manual_form['from']"
                          placeholder="Start time">
          </el-time-select>
        </label>
        <label>
          To
          <el-time-select :picker-options="{ start: '00:00',step: '00:15',end: '24:00'}"
                          v-model="manual_form['to']"
                          placeholder="End time">
          </el-time-select>
        </label>
        <span class="info">Date format must be a valid one. For example:
          <strong>2018-08-09T01:50:00</strong>.</span>
        <button type="button"
                @click="addManually()"
                class="save">Add Event</button>
        <button type="button"
                class="close"
                @click="adding_manually = false">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
               class="feather feather-plus">
            <line x1="12"
                  y1="5"
                  x2="12"
                  y2="19"></line>
            <line x1="5"
                  y1="12"
                  x2="19"
                  y2="12"></line>
          </svg>
        </button>
      </form>
    </div>
    <options>
      <label>Style
        <el-select v-model="calendar_settings['style']"
                   placeholder="Style"
                   size="small">
          <el-option value="material_design"
                     label="Material Design"></el-option>
          <el-option value="flat_design"
                     label="Flat Design"></el-option>
        </el-select>
      </label>
      <label>View Type
        <el-select v-model="calendar_settings['view_type']"
                   placeholder="View Type"
                   size="small">
          <el-option value="Day"></el-option>
          <el-option value="Month"></el-option>
        </el-select>
      </label>
      <label>Hour Base
        <el-select v-model.number="calendar_settings['split_value']"
                   placeholder="Hour Base"
                   size="small">
          <el-option value="5"
                     label="5 minutes"></el-option>
          <el-option value="10"
                     label="10 minutes"></el-option>
          <el-option value="15"
                     label="15 minutes"></el-option>
          <el-option value="20"
                     label="20 minutes"></el-option>
          <el-option value="30"
                     label="30 minutes"></el-option>
        </el-select>
      </label>
      <label>Military Time
        <el-checkbox size="small"
                     v-model="calendar_settings['military_time']"></el-checkbox>
      </label>
      <label>Cell Height
        <el-input size="small"
                  type="number"
                  name="cell-height"
                  v-model.number="calendar_settings['cell_height']" />
      </label>
      <label>Day
        <el-date-picker size="small"
                        v-model="calendar_settings['current_day']"
                        type="date"
                        placeholder="Pick a day"
                        format="yyyy-MM-dd">
        </el-date-picker>
      </label>
      <label>Scroll to now
        <el-checkbox size="small"
                     v-model="calendar_settings['scrollToNow']"></el-checkbox>
      </label>
      <label>Outline slots
        <el-checkbox size="small"
                     v-model="outline_slots"></el-checkbox>
      </label>
      <label>Read only
        <el-checkbox size="small"
                     v-model="calendar_settings['read_only']"></el-checkbox>
      </label>
    </options>
    <div class="calendar-component"
         :class="{'show-slots': outline_slots}">
      <kalendar :configuration.sync="calendar_settings"
                :events.sync="events"
                class="generate-shadow">
        <!-- CREATED CARD SLOT -->
        <div slot="details-card"
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
    <how-to></how-to>
  </div>
</template>
<script>
import Vue from 'vue';

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import Kalendar from '../components/kalendar/kalendar-container.vue';
//import { Kalendar } from 'kalendar-vue';
//import 'kalendar-vue/dist/kalendar-vue.css';

import { DatePicker, TimePicker, Select, Input, TimeSelect, Option, Checkbox } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import HowTo from './how-to.vue';

export default {
  components: {
    Kalendar,
    options: () =>
      import('./options.vue'),
    quickIntro: () =>
      import('./quick-intro.vue'),
    elInput: Input,
    elSelect: Select,
    elTimePicker: TimePicker,
    elDatePicker: DatePicker,
    elTimeSelect: TimeSelect,
    elOption: Option,
    elCheckbox: Checkbox,
    HowTo,
  },
  data: () => ({
    events: existing_events,
    calendar_settings: {
      view_type: 'Month',
      cell_height: 10,
      scrollToNow: false,
      current_day: new Date(),
      military_time: false,
      read_only: false,
      day_starts_at: 0,
      day_ends_at: 24,
      overlap: true,
      hide_dates: ['2019-08-09'],
      hide_days: [6],
      past_event_creation: false
    },
    outline_slots: false,
    new_appointment: {},
    manual_form: {},
    adding_manually: false,
    input_value: '',
  }),
  methods: {
    getHours(start, end) {
      return `${format(start, 'hh:mm A')} - ${format(end, 'hh:mm A')}`;
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
      const { title, description } = this.manual_form;
      let { date, from, to } = this.manual_form;
      let formattedFrom = `${date}T${from}:00.000Z`;
      let formattedTo = `${date}T${to}:00.000Z`;
      let payload = {
        data: { title, description },
        from: formattedFrom,
        to: formattedTo
      };
      this.$kalendar.addNewEvent(
        payload,
      );
      this.adding_manually = false;
    },
    removeEvent(kalendarEvent) {
      let day = kalendarEvent.start_time.toISOString().slice(0, 10);
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
$blue: #007FFF;
$yellow: #F5D547;
$dark: #3C3C3B;

body {
  margin: 0px;

  * {
    box-sizing: border-box;
  }
}

.calendar-component {
  //padding: 50px 0px;
  position: relative;
  z-index: 1;

  .details-card {
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100%;

    button {
      margin: 0;
      border: none;
      background-color: transparent;
      //color: $red;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}

.event-popup {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.event-popup .buttons {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}

.event-popup .buttons button {
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
  z-index: 11;
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