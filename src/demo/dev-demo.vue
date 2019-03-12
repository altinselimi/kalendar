<template>
    <div>
        <input type="text" v-model="input_value">
        <button @click="sendMessageToWorker">CLICK ME</button>
        <kalendar :configuration="calendar_settings" :events="events" class="generate-shadow">
        <div slot="creating-card" slot-scope="{appointment_props}">
            <h4 class="appointment-title" style="text-align: left;">
                New Appointment
            </h4>
            <span class="time">
                {{getHours(appointment_props.start_value.value, appointment_props.end_value.value)}}
            </span>
        </div>
        <div slot="popup-form" slot-scope="{popup_scope}" style="display: flex; flex-direction: column;">
            <h4 style="margin-bottom: 10px">
                New Appointment
            </h4>
            <input v-model="new_appointment['title']" type="text" name="title" placeholder="Title">
            <textarea v-model="new_appointment['description']" type="text" name="description" placeholder="Description" rows="2"></textarea>
            <div class="buttons">
                <button class="cancel" @click="popup_scope.close_popup = true">
                    Cancel
                </button>
                <button @click="completeAppointment(popup_scope, new_appointment)">
                    Save
                </button>
            </div>
        </div>
        <div slot="details-card" slot-scope="{appointment_props}" class="details-card">
            <h4 class="appointment-title">{{appointment_props.data.title}}</h4>
            <small v-show="(appointment_props.end - appointment_props.start) > 2">{{appointment_props.data.description}}</small>
            <span class="time">{{appointment_props.start_value.value | normalizeDate('hh:mm A')}} - {{appointment_props.end_value.value | normalizeDate('hh:mm A')}}</span>
            <button @click="removeAppointment(appointment_props)" class="cancel">
                <svg class="feather feather-x-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1326">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </button>
        </div>
    </kalendar>
    </div>
</template>
<script>

let today_from = new Date();
let today_to = new Date();
today_from.setUTCHours(3,22,0,0);
today_to.setUTCHours(4,55,0,0);

let today_from2 = new Date();
let today_to2 = new Date();
today_from2.setUTCHours(3,22,0,0);
today_to2.setUTCHours(4,20,0,0);


let tomorrow_from = new Date();
tomorrow_from.setDate(tomorrow_from.getDate() + 1);
let tomorrow_to = new Date(tomorrow_from.getTime());
tomorrow_from.setUTCHours(10,17,0,0);
tomorrow_to.setUTCHours(10,19,0,0);


const existing_events = [
  {
    "from": today_from.toISOString(),
    "to": today_to.toISOString(),
    "data": {
      "title": "Barber Checkin",
      "description": "Lorem ipsum dolor sit amet."
    }
  },
  {
    "from": today_from2.toISOString(),
    "to": today_to2.toISOString(),
    "data": {
      "title": "Barber Checkin2",
      "description": "Lorem ipsum dolor sit amet.2"
    }
  },
  {
    "from": tomorrow_from.toISOString(),
    "to": tomorrow_to.toISOString(),
    "data": {
      "title": "Barber Checkin",
      "description": "Lorem ipsum dolor sit amet."
    }
  }
]


import Vue from 'vue';

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import myWorker from '@/components/kalendar/workers';
/* ... */

import format from 'date-fns/format';
import getTime from 'date-fns/get_time';

import Kalendar from '../components/kalendar/kalendar-container.vue';
//import { Kalendar } from 'kalendar-vue';
//import 'kalendar-vue/dist/kalendar-vue.css';

import { DatePicker, TimePicker, Select, Input, TimeSelect, Option, Checkbox } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import HowTo from './how-to.vue';

let new_appointment_model = {
    description: null,
    title: null,
};

let manual_appointment_model = { ...new_appointment_model,
    from: null,
    to: null,
    date: null,
};

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
            //style: 'material_design',
            view_type: 'Month',
            split_value: 20,
            scrollToNow: false,
            current_day: new Date(),
            military_time: false,
            read_only: false
        },
        outline_slots: false,
        new_appointment: JSON.parse(JSON.stringify(new_appointment_model)),
        manual_form: JSON.parse(JSON.stringify(manual_appointment_model)),
        adding_manually: false,
        input_value: '',
    }),
    methods: {
        sendMessageToWorker() {
            myWorker.send(this.input_value)
              .then(reply => {
                // Handle the reply
                console.log('Got a reply:', reply);
              })
        },
        getHours(start, end) {
            return `${format(start, 'hh:mm A')} - ${format(end, 'hh:mm A')}`;
        },
        completeAppointment(popup_data, form_data) {
            let payload = {
                data: {
                    title: form_data.title,
                    description: form_data.description,
                },
                from: popup_data.appointment_props.start_value.value,
                to: popup_data.appointment_props.end_value.value,
                date: format(popup_data.appointment_props.start_value.value, 'YYYY-MM-DD'),
            };
            this.events(payload);
            this.new_appointment = JSON.parse(JSON.stringify(new_appointment_model));
            popup_data.close_popup = true;
        },
        addManually() {
            let { title, description, from, to, date } = this.manual_form;
            from = `${date}T${from}:00`;
            to = `${date}T${to}:00`;
            let payload = {
                data: { title, description },
                from,
                to,
                date: format(from, 'YYYY-MM-DD'),
            };
            this.events(payload);
            this.manual_form = JSON.parse(JSON.stringify(manual_appointment_model));
            this.adding_manually = false;
        },
        removeAppointment(appointment) {
            let index = this.appointments.findIndex(item => item.from === appointment.start_value.value);
            this.appointments.splice(index, 1);
        },
    },
};
</script>