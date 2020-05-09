<template>
    <div>
        <quick-intro></quick-intro>
        <add-manual-event
            v-if="adding_manually"
            @close="adding_manually = false"
            @done="addManually"
        />
        <options :data.sync="calendar_settings" />
        <button class="add-manual" @click="adding_manually = true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-plus"
            >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </button>
        <div
            class="calendar-component"
            :class="{ 'show-slots': outline_slots }"
        >
            <kalendar
                :configuration="calendar_settings"
                :events.sync="events"
                class="generate-shadow"
                :key="kalendarKey"
            >
                <!-- CREATED CARD SLOT -->
                <div
                    slot="created-card"
                    slot-scope="{ event_information }"
                    class="details-card"
                >
                    <h4 class="appointment-title">
                        {{ event_information.data.title }}
                    </h4>
                    <small>
                        {{ event_information.data.description }}
                    </small>
                    <span class="time"
                        >{{ event_information.start_time | formatToHours }} -
                        {{ event_information.end_time | formatToHours }}</span
                    >
                    <button
                        @click="removeEvent(event_information)"
                        class="remove"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                            data-reactid="1326"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    </button>
                </div>
            </kalendar>
        </div>
        <how-to></how-to>
    </div>
</template>
<script>
import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
Vue.use(VueHighlightJS);

import { Kalendar } from '@/lib-components';
import { DateTime } from 'luxon';

import {
    DatePicker,
    TimePicker,
    Select,
    Input,
    TimeSelect,
    Option,
    Checkbox,
    Form,
} from 'element-ui';
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
import 'element-ui/lib/theme-chalk/index.css';

locale.use(lang);

import HowTo from './how-to.vue';
import addManualEvent from './manual-event.vue';

const _existing_events = [
    {
        from: '2019-07-10T04:00:00',
        to: '2019-07-10T04:24:00',
        data: {
            title: 'Wake Up',
            description: 'Or snooze as usual.',
        },
    },
    {
        from: '2019-07-11T10:22:00-07:00',
        to: '2019-07-11T11:55:00-07:00',
        data: {
            title: 'Eat an IceCream',
            description: 'Not more than 2. 10:22 SF Time.',
        },
    },
    {
        from: '2019-07-11T10:22:00-07:00',
        to: '2019-07-11T11:20:00-07:00',
        data: {
            title: 'Brunch with Friends - SF Time',
            description: 'Discuss existential crisis. 10:22 SF Time.',
        },
    },
    {
        from: '2019-07-11T16:22:00+02:00',
        to: '2019-07-11T17:20:00+02:00',
        data: {
            title: 'Running',
            description: 'Final Countdown',
        },
    },
];

let today = new Date();

function getCurrentDay() {
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today.toISOString();
}

// change the dates on _existing events to this week
const startDate = new Date(_existing_events[0].from).getUTCDate();

function makeNow(dateString) {
    const d = new Date(dateString);
    d.setYear(today.getUTCFullYear());
    d.setMonth(today.getUTCMonth());
    d.setDate(today.getUTCDate() + (d.getUTCDate() - startDate));
    return d.toISOString();
}
const existing_events = _existing_events.map(ev => ({
    ...ev,
    from: makeNow(ev.from),
    to: makeNow(ev.to),
}));

export default {
    created() {
        Vue.filter('formatToHours', (value, how) => {
            let dt = DateTime.fromISO(value);
            return dt.toLocaleString(DateTime.TIME_24_SIMPLE);
        });
    },
    components: {
        Kalendar,
        options: () => import('./options.vue'),
        quickIntro: () => import('./quick-intro.vue'),
        HowTo,
        addManualEvent,
    },
    data() {
        return {
            events: existing_events,
            calendar_settings: {
                view_type: 'week',
                style: 'material_design',
                cell_height: 10,
                scrollToNow: false,
                //start_day: getCurrentDay(),
                military_time: false,
                read_only: false,
                day_starts_at: 0,
                day_ends_at: 24,
                overlap: true,
                hide_dates: ['2019-08-09'],
                hide_days: [],
                past_event_creation: true,
            },
            new_appointment: {},
            outline_slots: false,
            adding_manually: false,
            kalendarKey: false,
        };
    },
    watch: {
        calendar_settings: {
            handler(newValue) {
                this.kalendarKey = new Date().valueOf();
            },
            deep: true,
        },
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

            this.$kalendar.addNewEvent(payload);
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
        addManually() {
            let title = 'New one';
            let description = 'Lorem dsr';
            let from = makeNow('2019-07-12T10:22:00+02:00');
            let to = makeNow('2019-07-13T11:20:00+02:00');
            let payload = {
                data: { title, description },
                from,
                to,
            };
            this.$kalendar.addNewEvent(payload);
        },
        removeEvent(kalendarEvent) {
            let day = kalendarEvent.start_time.slice(0, 10);
            this.$kalendar.removeEvent({
                day,
                key: kalendarEvent.key,
                id: kalendarEvent.kalendar_id,
            });
        },
    },
};
</script>
<style lang="scss">
$green: #00f0b5;
$red: #f61067;
$blue: #007fff;
$yellow: #f5d547;
$dark: #3c3c3b;

body {
    margin: 0px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
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
        transition: opacity 0.15s;
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
    background-color: rgba($green, 0.04);
    padding: 5px 10px;

    &.cancel {
        background-color: rgba($red, 0.04);
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
    background-color: rgba(black, 0.7);

    > form {
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
