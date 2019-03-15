<template>
  <li @mouseover.self="mouseMove($event)" 
      @mousedown.self="mouseDown()" 
      @mouseup.self="mouseUp()" 
      :class="{
			'selected': selected, 
			'is-an-hour': (index+1)%(60/10) === 0,
      'has-events': cell_events && cell_events.length > 0
			}" :style="`height: ${kalendar_options.cell_height}px`">
    <div class="created-events" v-if="cell_events">
    	<KalendarEvent v-for="(event, index) in cell_events" 
	    	:event="event" 
	    	:key="index" 
	    	:total="cell_events.length"
	    	:index="index"
	  	/>
    </div>
  </li>
</template>
<script>
const crypto = window.crypto || window.msCrypto; // IE11 Polyfill
const { cloneObject } = window.kalendarHelpers;

export default {
  props: ['creator', 'index', 'cellData', 'constructedEvents'],
  inject: ['kalendar_options', 'events'],
  components: {
    kalendarEventpopup: () =>
      import('./kalendar-eventpopup.vue'),
    KalendarEvent: () => import('./kalendar-event.vue'),
  },
  computed: {
    cell_events() {
      return !!this.constructedEvents &&
        this.constructedEvents.hasOwnProperty(this.cellData.value) &&
        this.constructedEvents[this.cellData.value];
    },
    selected() {
      return this.cell_events && this.cell_events.length > 0;
    }
  },
  methods: {
    mouseDown() {
      if (this.kalendar_options.read_only) return;
      // this.clearPopups('popup-initiated');
      // this.kalendar_options.currently_working_on_date = this.cellData.value;

      let payload = {
        creating: true,
        starting_cell: cloneObject(this.cellData),
        current_cell: cloneObject(this.cellData),
        ending_cell: cloneObject(this.cellData),
        event_id: this.cellData.value,
      };
      this.$emit('select', payload);
    },
    mouseMove(event) {
      if (this.kalendar_options.read_only) return;
      if (this.creator && !this.creator.creating) return;
            console.log('Moving on', this.cellData.value);

      let { starting_cell, ending_cell, creating } = cloneObject(this.creator);
      if (this.cellData.index < starting_cell.index) {
        ending_cell = starting_cell;
        starting_cell = cloneObject(this.cellData);
      }
      if (creating) {
        let payload = { ...this.creator,
          current_cell: cloneObject(this.cellData),
          starting_cell: starting_cell,
          ending_cell: cloneObject(this.cellData),
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
    generateUUID() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
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

ul.building-blocks {
  li {
    z-index: 0;
    border-bottom: dotted 1px var(--odd-cell-border-color);

    &.first_of_appointment {
      z-index: 1;
      opacity: 1; //z-index:0;
    }

    &.is-active {
      z-index: 3;
    }

    &.is-an-hour {
      border-bottom: solid 1px var(--table-cell-border-color);
    }

    &.has-events {
      z-index: 2;
    }
  }
}
div.creator_block {

  h4,
  p,
  span {
    margin: 0px;
  }
}
</style>