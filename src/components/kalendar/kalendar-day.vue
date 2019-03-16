<template>
  <ul style="position: relative;" :class="{'is-weekend': isWeekend, 'is-today': isToday, 'creating': kalendar_options.currently_working_on_date === day.date}" class="kalendar-day">
    <kalendar-cell v-for="(cell, index) in day_cells" :constructed-events="day_events" :key="`${index}`" :creator="creator" :cell-data="cell" :index="index" @select="updateCreator" @reset="resetEvents()" @initiatePopup="initiatePopup()" :temporary-event="temporary_event"/>
    <div ref="nowIndicator" :class="kalendar_options.style === 'material_design' ? 'hour-indicator-line' : 'hour-indicator-tooltip'" v-if="isToday" :style="`top:calc(${passedTime}% - 5px)`">
      <span class="line" v-show="kalendar_options.style === 'material_design'"></span>
    </div>
  </ul>
</template>
<script>
import isWeekend from 'date-fns/is_weekend';
import isToday from 'date-fns/is_today';
import format from 'date-fns/format';
import addMinutes from 'date-fns/add_minutes';
const { cloneObject } = window.kalendarHelpers;

import myWorker from '@/components/kalendar/workers';

export default {
  props: ['day', 'passedTime'],
  created() {
    myWorker.send('getDayCells', {
      day: this.day.value
    }).then(reply => {
      console.log('Got day cells:', reply);
      this.day_cells = reply;
      return this.getDayEvents(this.events);
    });
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
  inject: ['kalendar_options', 'events', 'updateEvents'],
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
      return this.kalendar_options.current_day;
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
    addEvent(payload) {
      let validation_message = this.checkEventValidity(payload);
      if (validation_message !== null) {
        return Promise.reject(validation_message);
      }
      let cloned_events = this.events.slice(0);
      cloned_events.push(payload);
      return this.getDayEvents(cloned_events)
        .then(res => {
          this.updateEvents(cloned_events);
        });
    },
    checkEventValidity(payload) {
      let { from, to } = payload;
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
      if(event.direction === 'reverse'
        && original_starting_cell.index > current_cell.index) {
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
      let { creating, 
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
      let { creating, ending_cell, current_cell, starting_cell, original_starting_cell } = this.creator;
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
      if(!updated_events) updated_events = [];
      updated_events.push(finalEvent);

      this.$set(this.day_events, starting_cell.value, updated_events);
      this.resetEvents();
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

  .creating {
    z-index: 3;
  }
}
</style>