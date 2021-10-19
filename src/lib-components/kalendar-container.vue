<template>
    <div
        class="kalendar-wrapper"
        :class="{
            'no-scroll': !scrollable,
            gstyle: kalendar_options.style === 'material_design',
            'day-view': kalendar_options.view_type === 'day',
        }"
        @touchstart="scrollable = false"
        @touchend="scrollable = true"
    >
        <div class="kalendar-header">
            <div>
                <div class="button-today">
                    <button class="main-button" @click="changeDay(0)">
                        Сегодня
                    </button>
                </div>    
                <div class="week-navigator">
                    <div
                        class="nav-wrapper"
                        v-if="kalendar_options.view_type === 'week'"
                    >
                        <button class="week-navigator-button" @click="changeDay(-7)">
                            <svg
                                style="transform: rotate(180deg)"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="css-i6dzq1"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <div>
                            <span>{{
                                kalendar_options.formatWeekNavigator(current_day)
                            }}</span>
                        </div>
                        <button class="week-navigator-button" @click="changeDay(7)">
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="css-i6dzq1"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div
                        class="nav-wrapper"
                        v-if="kalendar_options.view_type === 'day'"
                    >
                        <button class="week-navigator-button" @click="changeDay(-1)">
                            <svg
                                style="transform: rotate(180deg)"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="css-i6dzq1"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <div>
                            <span>{{
                                kalendar_options.formatDayNavigator(current_day)
                            }}</span>
                        </div>
                        <button class="week-navigator-button" @click="changeDay(1)">
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="css-i6dzq1"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <slot name="workTimeEdit"></slot>
        </div>

        <div class="b-scroll-container" :style="{ height: kalendar_options.height }">
            <scroll-container>
                <kalendar-week-view
                  :kalendar_work_hours="kalendar_work_hours"
                  :current_day="current_day"
                  :kalendar_events="kalendar_events"
                  :isEditing="isEditing"
                  :isShowEditPopup="isShowEditPopup"
                />
            </scroll-container>
        </div>
        
        <portal to="event-creation" class="slotable">
            <div slot-scope="information" class="creating-event">
                <slot name="creating-card" :event_information="information">
                  <h4>
                    Новое занятие
                  </h4>
                  <span class="time">
                    {{ formatDate(information.start_time) }}
                    -
                    {{ formatDate(information.end_time) }}
                  </span>
                </slot>
            </div>
        </portal>
        
        <portal to="event-popup-form" class="slotable">
            <div slot-scope="information" class="popup-event">
                <slot name="popup-form" :popup_information="information">
                  <kalendar-popup-card-slot
                      :popup_information="information"
                      @close="closePopups"
                  />
                </slot>
            </div>
        </portal>
        
        <portal to="event-details" class="slotable">
            <div slot-scope="information" class="created-event">
                <slot name="created-card" :event_information="information">
                  <kalendar-created-card-slot
                      :event_information="information"
                  />
                </slot>
            </div>
        </portal>
        
        <portal to="event-edit-form" class="slotable">
            <div slot-scope="information" class="popup-event">
                <slot name="popup-edit-form" :popup_information="information">
                  <kalendar-popup-edit-form
                      :popup_information="information"
                      @close="closePopups"
                      @removeEvent="removeEvent(information)"
                  />
                </slot>
            </div>
        </portal>
    </div>
</template>
<script>
import Vue from 'vue';
import KalendarCreatedCardSlot from '@/lib-components/kalendar-created-card-slot';
import KalendarPopupCardSlot from '@/lib-components/kalendar-popup-card-slot';
import KalendarPopupEditForm from '@/lib-components/kalendar-popup-edit-form';

import {
    addDays,
    getTime,
    endOfWeek,
    generateUUID,
    addTimezoneInfo,
    getHourlessDate,
    startOfWeek,
    getFormattedWeekDayTime,
    getFormattedMonth,
    getFormattedTime
} from './utils.js';

export default {
    components: {
      KalendarWeekView: () => import('./kalendar-weekview.vue'),
      ScrollContainer: () => import('./scroll-container.vue'),
      KalendarCreatedCardSlot,
      KalendarPopupCardSlot,
      KalendarPopupEditForm
    },
    props: {
        // this provided array will be kept in sync
        events: {
            required: true,
            type: Array,
            validator: function(val) {
                return Array.isArray(val);
            },
        },
        work_time: {
            required: true,
            type: Object,
            validator: function(val) {
                return typeof val === "object"
            },
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
        return {
            current_day: getHourlessDate(),
            default_options: {
                cell_height: 10,
                scrollToNow: false,
                height: 'calc(100vh - 100px)',
                start_day: getHourlessDate(),
                view_type: 'week',
                style: 'material_design',
                now: new Date(),
                military_time: true,
                working_hours: true,
                read_only: false,
                day_starts_at: 0,
                day_ends_at: 24,
                time_mode: 'relative',
                overlap: true, // перекрытие событий
                past_event_creation: true,
                formatLeftHours: date => {
                    let isoDate = new Date(addTimezoneInfo(date));
                    return getFormattedTime(isoDate)
                },
                formatDayTitle: date => {
                    let isoDate = new Date(date);
                    let dayName = getFormattedWeekDayTime( isoDate).split(',')[0];
                    let dayNumber = isoDate.getUTCDate();
                    return [dayName, dayNumber];
                },
                formatWeekNavigator: isoDate => {
                    let startDate = startOfWeek(isoDate);
                    let endDate = endOfWeek(isoDate);
                    let startString = getFormattedMonth(startDate);
                    let endString = getFormattedMonth(endDate);
                    
                    return `${startString} - ${endString}`;
                },
                formatDayNavigator: isoDate => {
                    let day = new Date(isoDate);
                    return day.toUTCString().slice(5, 11);
                },
                toggleEditing: () => {
                  this.isEditing = !this.isEditing
                },
                toggleEditPopup: (value) => {
                  this.isShowEditPopup = value
                }
            },
            kalendar_events: null,
            kalendar_work_hours: {},
            kalendar_work_hours_temp: {},
            new_appointment: {},
            scrollable: true,
            isEditing: false,
            isShowEditPopup: false,
        };
    },
    computed: {
        kalendar_options() {
            let options = this.default_options;
            let provided_props = this.configuration;

            let conditions = {
                scrollToNow: val => typeof val === 'boolean',
                start_day: val => !isNaN(Date.parse(val)),
                view_type: val => ['week', 'day'].includes(val),
                cell_height: val => !isNaN(val),
                height: val => this.isString(val),
                style: val => ['material_design', 'flat_design'].includes(val),
                military_time: val => typeof val === 'boolean',
                working_hours: val => typeof val === 'boolean',
                read_only: val => typeof val === 'boolean',
                day_starts_at: val =>
                    typeof val === 'number' && val >= 0 && val <= 24,
                day_ends_at: val =>
                    typeof val === 'number' && val >= 0 && val <= 24,
                hide_dates: val => Array.isArray(val),
                hide_days: val =>
                    Array.isArray(val) && !val.find(n => typeof n !== 'number'),
                overlap: val => typeof val === 'boolean',
                past_event_creation: val => typeof val === 'boolean',
            };
            for (let key in provided_props) {
                if (
                    conditions.hasOwnProperty(key) &&
                    conditions[key](provided_props[key])
                ) {
                    options[key] = provided_props[key];
                }
            }
            return options;
        },
    },
    created() {
        this.current_day = this.kalendar_options.start_day;
        this.kalendar_events = this.events.map(event => {
          return {
            ...event,
            id: event.id || generateUUID(),
          }
        });
        
        this.kalendar_work_hours = {...this.work_time};
        this.kalendar_work_hours_temp = {...this.work_time};

        if (!this.$kalendar) {
            Vue.prototype.$kalendar = {};
        }

        this.$kalendar.getEvents = () => {
            return this.kalendar_events.slice(0);
        }
        
        this.$kalendar.updateEvents = events => {
            this.kalendar_events = events.map(event => ({
                ...event,
                id: event.id || generateUUID()
            }));
            this.$emit(
                'update:events',
              this.kalendar_events
            );
        };

        this.$kalendar.getWorkHours = () => {
            return {...this.kalendar_work_hours}
        };
        
        this.$kalendar.updateWorkHours = payload => {
            this.kalendar_work_hours = {
                ...this.kalendar_work_hours,
                ...payload
            };
        };
        
        this.$kalendar.saveWorkHours = () => {
            this.$emit(
              'update:work_time',
              this.kalendar_work_hours
            );
            this.kalendar_work_hours_temp = this.kalendar_work_hours
        };
        
        this.$kalendar.removeWorkHours = payload => {
            delete this.kalendar_work_hours[payload]
        };
        
        this.$kalendar.resetWorkHours = () => {
            this.kalendar_work_hours = {};
            this.kalendar_work_hours_temp = this.kalendar_work_hours
        };
        
        this.$kalendar.cancelWorkHours = () => {
            this.kalendar_work_hours = {...this.work_time};
            this.$kalendar.saveWorkHours()
        };
        
        this.$kalendar.formatLeftHours = this.kalendar_options.formatLeftHours;
        this.$kalendar.toggleEditing = this.kalendar_options.toggleEditing;
        this.$kalendar.toggleEditPopup = this.kalendar_options.toggleEditPopup;
        this.$kalendar.options = this.kalendar_options;
    },
    provide() {
        const provider = {};
        Object.defineProperty(provider, 'kalendar_options', {
            enumerable: true,
            get: () => this.kalendar_options,
        });
        return provider;
    },
    methods: {
        getTime,
        changeDay(numDays) {
            if (numDays === 0) {
                this.current_day = new Date().toISOString();
            } else {
                this.current_day = addDays(this.current_day, numDays).toISOString();
            }
            setTimeout(() => this.$kalendar.buildWeek());
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

            this.$kalendar.addNewEvent(payload);
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
        isString(val) {
            return (typeof val === "string" || val instanceof String);
        },
        formatDate (date) {
          let isoDate = new Date(date);
          return getFormattedTime(isoDate)
        },
        removeEvent(kalendarEvent) {
          let day = kalendarEvent.start_time.slice(0, 10);
          this.$kalendar.removeEvent({
            day,
            key: kalendarEvent.key,
            id: kalendarEvent.id,
          });
        },
    },
};
</script>
<style lang="scss">
    @import "./main.scss";
</style>
