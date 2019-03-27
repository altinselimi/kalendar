<template>
  <li 
    @mouseover.self="mouseMove()" 
    @mousedown.self="mouseDown()" 
    @mouseup="mouseUp()"
    class="kalendar-cell" 
    :class="{
      'selected': selected, 
      'is-an-hour': (index+1)%(60/10) === 0,
      'has-events': cell_events && cell_events.length > 0,
      'being-created': !!beingCreated
    }" 
    :style="`
      height: ${kalendar_options.cell_height}px;
    `"
  >
    <KalendarEvent
        :style="`z-index: 100`"
        v-if="cell_events && cell_events.length"
        v-for="(event, eventIndex) in cell_events"
        :event="event" 
        :key="eventIndex" 
        :total="cell_events.length" 
        :index="eventIndex" 
        :overlaps="overlappingEvents.length"
      />
  </li>
</template>
<script>
const crypto = window.crypto || window.msCrypto; // IE11 Polyfill
const { cloneObject } = window.kalendarHelpers;
import { generateUUID } from './utils';

export default {
  props: ['creator', 'index', 'cellData', 'constructedEvents', 'temporaryEvent'],
  inject: ['kalendar_options', 'kalendar_events'],
  components: {
    KalendarEvent: () => import('./kalendar-event.vue'),
  },
  computed: {
    cell_events() {
      let all_events = [];
      if (this.completedEvents) {
        all_events = all_events.concat(this.completedEvents);
      }
      if (this.beingCreated) {
        all_events = all_events.concat(this.beingCreated);
      }
      return all_events;
    },
    completedEvents() {
      return this.constructedEvents &&
        this.constructedEvents.hasOwnProperty(this.cellData.value) &&
        this.constructedEvents[this.cellData.value];
    },
    beingCreated() {
      return this.temporaryEvent &&
        this.temporaryEvent.start.value === this.cellData.value &&
        this.temporaryEvent;
    },
    overlappingEvents() {
      if (!this.constructedEvents || this.cell_events.length < 1) return [];
      return Object.keys(this.constructedEvents)
        .map(evKey => {
          return this.constructedEvents[evKey]
        })
        .flat()
        .filter(event => {
          let cellDate = new Date(this.cellData.value);
          let eventStarts = new Date(event.start.value);
          let eventEnds = new Date(event.end.value);
          return eventStarts < cellDate && eventEnds > cellDate;
        });

    },
    selected() {
      return this.cell_events && this.cell_events.length > 0;
    }
  },
  methods: {
    mouseDown() {
      if (this.kalendar_options.read_only) return;
      this.$kalendar.closePopups();

      let payload = {
        creating: true,
        original_starting_cell: cloneObject(this.cellData),
        starting_cell: cloneObject(this.cellData),
        current_cell: cloneObject(this.cellData),
        ending_cell: cloneObject(this.cellData)
      };
      this.$emit('select', payload);
    },
    mouseMove() {
      if (this.kalendar_options.read_only) return;
      if (this.creator && !this.creator.creating) return;
      let { starting_cell, original_starting_cell, creating } = this.creator;
      let going_down = this.cellData.index >= starting_cell.index &&
        starting_cell.index === original_starting_cell.index;
        
      if (creating) {
        let payload = {
          ...this.creator,
          current_cell: this.cellData,
          ending_cell: this.cellData,
          direction: going_down ? 'normal' : 'reverse'
        };
        this.$emit('select', payload);
      }
    },
    mouseUp() {
      if (this.kalendar_options.read_only) return;
      if (this.creator.creating) {
        this.$emit('initiatePopup');
      }
    },
    resetCreator() {
      this.$emit('reset');
    },
    clearPopups(status) {
      this.kalendar_options.currently_working_on_date = null;
      let { existing_appointments } = this.kalendar_options;
      for (let key in existing_appointments) {
        if (existing_appointments[key]['status'] === 'popup-initiated') {
          this.$delete(existing_appointments, key);
        }
      }
    },
  },
}
</script>
<style lang="scss">
$creator-bg: #34aadc;
$creator-content: white;

li {
  font-size: 13px;
  position: relative;
}

.created-events {
  //width: 100%;
  height: 100%;
}

.kalendar-cell:last-child {
  display: none;
}

ul.building-blocks {
  li {
    z-index: 0;
    border-bottom: dotted 1px var(--odd-cell-border-color);

    &.first_of_appointment {
      z-index: 1;
      opacity: 1; //z-index:0;
    }

    &.is-an-hour {
      border-bottom: solid 1px var(--table-cell-border-color);
    }

    &.has-events {
      z-index: unset;
    }

    &.being-created {
      z-index: 3;
    }
  }
}
</style>