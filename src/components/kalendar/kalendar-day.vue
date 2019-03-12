<template>
  <ul style="position: relative;" @mouseleave="clearCreatingLeftovers" :class="{'is-weekend': isWeekend, 'is-today': isToday, 'creating': calendar_options.currently_working_on_date === day.date}" class="kalendar-day">
    <kalendar-cell v-for="(cell, index) in day_cells" 
      :constructed-events="day_events" 
      :key="`${index}`" 
      :creator="creator" 
      :cell-data="cell" 
      :temporary-event="temporary_events[cell.value]"
      :index="index" 
      @select="updateCreator" 
      @reset="resetEvents()" 
      @initiatePopup="initiatePopup()" />
    <div ref="nowIndicator" :class="calendar_options.style === 'material_design' ? 'hour-indicator-line' : 'hour-indicator-tooltip'" v-if="isToday" :style="`top:calc(${passedTime}% - 5px)`">
      <span class="line" v-show="calendar_options.style === 'material_design'"></span>
    </div>
  </ul>
</template>
<script>
import isWeekend from 'date-fns/is_weekend';
import isToday from 'date-fns/is_today';
import format from 'date-fns/format';
import addMinutes from 'date-fns/add_minutes';

import myWorker from '@/components/kalendar/workers';

export default {
  props: ['day', 'passedTime'],
  created() {
    myWorker.send('getDayCells', {
      day: this.day.value
    }).then(reply => {
      console.log('Got day cells:', reply);
      this.day_cells = reply;
      return this.getDayEvents();
    });
  },
  components: {
    kalendarCell: () =>
      import('./kalendar-cell.vue'),
  },
  inject: ['calendar_options', 'events'],
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
      return this.calendar_options.current_day;
    },
  },
  data: () => ({
    creator: {
      creating: false,
      starting_cell: null,
      current_cell: null,
      ending_cell: null,
      status: null,
    },
    day_cells: [],
    day_events: null,
    temporary_events: {}
  }),
  methods: {
    getDayEvents() {
      return myWorker.send('constructDayEvents', {
          events: this.events,
          day: this.day.value
      }).then(constructed_events => {
        console.log('Constructed events:', constructed_events);
        this.day_events = constructed_events;
      })
    },
    resetEvents() {
      if (!this.creator.creating && this.creator.status === null) return;
      this.creator = {
        creating: false,
        starting_cell: null,
        current_cell: null,
        ending_cell: null,
        status: null,
      };
    },
    clearCreatingLeftovers() {
      // should be done in a web worker
      this.temporary_events = {};
    },
    updateCreator(payload) {
      console.log('Updated creator:', payload);
      this.creator = payload;
      this.selectCell(payload);
    },
    selectCell(status = 'creating') {
      if (!this.creator.creating) return;
      let { creating, ending_cell, current_cell, starting_cell } = this.creator;

      const diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);
      const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);
      let startDate = new Date(starting_cell.value);
      let endDate = new Date(ending_cell.value);

      let constructedEvent = {
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
        status
      };
      this.$set(this.day_events, starting_cell.value, [constructedEvent]); 
      //this.temporary_events[starting_cell.value] = payload;

/*
      if (creating) {
        this.day_cells.forEach((hour, index) => {
          let is_in_range = hour.index >= starting_cell_index && hour.index <= _ending_index;
          if (is_in_range) {
            this.day_cells[index] = { ...hour, ['appointment_id']: appointment_id };
          } else if (hour['appointment_id'] === appointment_id && !is_in_range) {
            this.day_cells[index] = { ...hour, ['appointment_id']: null };
          }
        });
      }*/
    },
    initiatePopup() {
      let { creating, ending_cell, current_cell, starting_cell } = this.creator;
      const diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);
      const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);
      let startDate = new Date(starting_cell.value);
      let endDate = new Date(ending_cell.value);

      let constructedEvent = {
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
      this.$set(this.day_events, starting_cell.value, [constructedEvent]); 
      //this.temporary_events[starting_cell.value] = payload;
      this.creator = { ...this.creator, ['creating']: false };
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