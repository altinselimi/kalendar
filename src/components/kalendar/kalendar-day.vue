<template>
  <ul style="position: relative;"
      :class="{
      'is-weekend': isWeekend, 
      'is-today': isToday, 
      'creating': creator.creating || creator.status === 'popup-initiated'
    }"
      class="kalendar-day"
      :ref="day.value + '-reference'">
    <kalendar-cell v-for="(cell, index) in day_cells"
                   :constructed-events="day_events"
                   :key="`${index}`"
                   :creator="creator"
                   :cell-data="cell"
                   :index="index"
                   @select="updateCreator"
                   @reset="resetEvents()"
                   @initiatePopup="initiatePopup()"
                   :temporary-event="temporary_event" />
    <div ref="nowIndicator"
         :class="kalendar.preferences.style === 'material_design' ? 'hour-indicator-line' : 'hour-indicator-tooltip'"
         v-if="isToday"
         :style="`top:calc(${passedTime}% - 5px)`">
      <span class="line"
            v-show="kalendar.preferences.style === 'material_design'"></span>
    </div>
  </ul>
</template>
<script>
import isWeekend from 'date-fns/is_weekend';
import isToday from 'date-fns/is_today';
const { cloneObject } = window.kalendarHelpers;

import myWorker from '@/components/kalendar/workers';

export default {
  props: ['day', 'passedTime'],
  created() {
    this.renderDay();
  },
  components: {
    kalendarCell: () =>
      import('./kalendar-cell.vue'),
  },
  provide() {
    return {
      kalendarAddEvent: this.addEvent,
      kalendarClearPopups: this.clearCreatingLeftovers
    };
  },
  inject: ['kalendar_events', 'kalendar_options'],
  mounted() {
    if (this.scrollToNow && this.isToday) this.scrollView();
  },
  computed: {
    isWeekend() {
      return isWeekend(this.day.date);
    },
    isToday() {
      return isToday(this.day.date);
    },
    currentDay() {
      return this.kalendar.preferences.current_day;
    },
  },
  data: () => ({
    creator: {
      creating: false,
      starting_cell: null,
      original_starting_cell: null,
      current_cell: null,
      ending_cell: null,
      status: null,
    },
    temporary_event: null,
    day_cells: [],
    day_events: null,
  }),
  methods: {
    renderDay() {
      myWorker.send('getDayCells', {
        day: this.day.value,
        min_hour: this.kalendar_options.day_starts_at,
        max_hour: this.kalendar_options.day_ends_at
      }).then(reply => {
        console.log('Got day cells:', reply);
        this.day_cells = reply;
        return this.getDayEvents(this.kalendar_events);
      });
    },

    addEvent(payload) {
      //validation
      let validation_message = this.checkEventValidity(payload);
      if (validation_message !== null) {
        return Promise.reject(validation_message);
      }

      return myWorker.send('constructNewEvent', {
        event: payload
      }).then(constructed_event => {
        let { key } = constructed_event;
        if (this.day_events.hasOwnProperty(key)) {
          this.day_events[key].push(constructed_event);
        } else {
          // must use $set since key wasnt present in the object
          // vue will fail to render it
          this.$set(this.day_events, key, [constructed_event]);
        }
        console.log('ID:', constructed_event.id);
        let events = this.kalendar_events.slice(0);
        events.push({
          ...payload,
          id: constructed_event.id
        });
        this.$kalendar.updateEvents(events);
      });
    },
    removeEvent(payload) {
      let index = this.day_events[payload.key]
        .findIndex(event => event.id === payload.id);
      this.day_events[payload.key].splice(index, 1);
      let events = this.kalendar_events.slice(0);
      let eventIndex = events.find(event => event.id === payload.id);
      events.splice(eventIndex, 1);
      this.$kalendar.updateEvents(events);
      return Promise.resolve();
    },
    checkEventValidity(payload) {
      let { from, to } = payload;
      if (!from || !to) return 'No dates were provided in the payload';
      let isoFrom = new Date(from).toISOString();
      let isoTo = new Date(to).toISOString();
      if (isoFrom !== from) {
        return 'From date is not UTC format';
      }
      if (isoTo !== to) {
        return 'To date is not UTC format';
      }
      return null;
    },
    getDayEvents(events) {
      let clonedEvents = events.map(event => cloneObject(event));
      console.log('Events:', clonedEvents);
      return myWorker.send('constructDayEvents', {
        events: clonedEvents,
        day: this.day.value
      }).then(constructed_events => {
        this.day_events = constructed_events;
      })
    },
    clearCreatingLeftovers() {
      for (let key in this.day_events) {
        let hasPending = this.day_events[key].some(event => {
          return event.status === 'popup-initiated' || event.status === 'creating';
        });
        if (hasPending) {
          let completed = this.day_events[key]
            .filter(event => event.status === 'completed');
          this.$set(this.day_events, key, completed);
          if (completed.length === 0) {
            delete this.day_events[key];
          }
        }
      }
      this.resetEvents();
    },
    resetEvents() {
      if (!this.creator.creating && this.creator.status === null) return;
      this.creator = {
        creating: false,
        starting_cell: null,
        original_starting_cell: null,
        current_cell: null,
        ending_cell: null,
        status: null,
        temporary_id: null
      };
      this.temporary_event = null;
    },
    updateCreator(payload) {
      this.creator = this.validateSelection(payload);
      this.selectCell();
    },
    validateSelection(event) {
      let { original_starting_cell, starting_cell, current_cell } = event;
      if (event.direction === 'reverse' &&
        original_starting_cell.index > current_cell.index) {
        return {
          ...event,
          starting_cell: current_cell,
          ending_cell: original_starting_cell
        }
      }
      return event;
    },
    selectCell() {
      if (!this.creator.creating) return;
      let {
        creating,
        ending_cell,
        current_cell,
        starting_cell,
        original_starting_cell
      } = this.creator;

      let real_ending_cell_index = ending_cell.index + 1;
      ending_cell = this.day_cells[real_ending_cell_index];

      const diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);
      const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);
      let startDate = new Date(starting_cell.value);
      let endDate = new Date(ending_cell.value);

      let distance = diffMins + (diffInHrs * 60);
      this.temporary_event = {
        start: {
          masked_value: startDate.toISOString(),
          value: startDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        end: {
          masked_value: endDate.toISOString(),
          value: endDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        distance: distance,
        status: 'creating'
      };
    },
    initiatePopup() {
      this.creator = {
        ...this.creator,
        status: 'popup-initiated',
        creating: false
      };
      let { ending_cell, current_cell, starting_cell, original_starting_cell } = this.creator;
      let real_ending_cell_index = ending_cell.index + 1;
      ending_cell = this.day_cells[real_ending_cell_index];

      const diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);
      const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);
      let startDate = new Date(starting_cell.value);
      let endDate = new Date(ending_cell.value);

      let finalEvent = {
        start: {
          masked_value: startDate.toISOString(),
          value: startDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        end: {
          masked_value: endDate.toISOString(),
          value: endDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        distance: diffMins + (diffInHrs * 60),
        status: 'popup-initiated'
      };

      let updated_events = this.day_events[starting_cell.value];
      if (!updated_events) updated_events = [];
      updated_events.push(finalEvent);

      this.$set(this.day_events, starting_cell.value, updated_events);
      this.temporary_event = null;
    },

    scrollView() {
      let topoffset = this.$refs.nowIndicator.offsetTop;
      setTimeout(() => {
        window.scroll({ top: topoffset, left: 0, behavior: 'smooth' });
      }, 500);
    },
  },
}
</script>
<style lang="scss">
ul.kalendar-day {
  position: relative;
  background-color: white;
  max-width: 400px;

  &.is-weekend {
    background-color: var(--weekend-color);
  }

  &.is-today {
    background-color: var(--current-day-color);
  }

  .clear {
    position: absolute;
    z-index: 1;
    top: -20px;
    right: 0;
    font-size: 10px;
  }

  &.creating {
    z-index: 11;

    .created-event {
      pointer-events: none;
    }
  }
}
</style>