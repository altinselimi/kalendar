<template>
  <ul
    style="position: relative;"
    :class="{
      'is-weekend': isWeekend,
      'is-today': isToday,
      creating: creator.creating || creator.status === 'popup-initiated'
    }"
    class="kalendar-day"
    :ref="day.value + '-reference'"
  >
    <div
      ref="nowIndicator"
      :class="
        kalendar_options.style === 'material_design'
          ? 'hour-indicator-line'
          : 'hour-indicator-tooltip'
      "
      v-if="isToday"
      :style="`top:${passedTime}px`"
    >
      <span
        class="line"
        v-show="kalendar_options.style === 'material_design'"
      ></span>
    </div>
    <kalendar-cell
      v-for="(cell, index) in day_cells"
      :constructed-events="day_events"
      :key="`cell-${index}`"
      :creator="creator"
      :cell-data="cell"
      :index="index"
      @select="updateCreator"
      @reset="resetEvents()"
      @initiatePopup="initiatePopup()"
      :temporary-event="temporary_event"
    />
  </ul>
</template>
<script>
import { isToday, isWeekend, cloneObject, getLocaleTime } from "./utils";

import myWorker from "@/lib-components/workers";

export default {
  props: ["day", "passedTime"],
  created() {
    // get and render day cells
    // and then render any event
    // on top of them
    this.renderDay();
  },
  components: {
    kalendarCell: () => import("./kalendar-cell.vue")
  },
  provide() {
    // provide these methods to children components
    // for easier access
    return {
      kalendarAddEvent: this.addEvent,
      kalendarClearPopups: this.clearCreatingLeftovers
    };
  },
  // inject kalendar options from parent component
  inject: ["kalendar_options"],
  mounted() {
    if (this.kalendar_options.scrollToNow && this.isToday) this.scrollView();
  },
  computed: {
    isWeekend() {
      return isWeekend(this.day.value);
    },
    isToday() {
      return isToday(this.day.value);
    }
  },
  data: () => ({
    // this is the main object
    // we use to make selections
    // and control their flows
    creator: {
      creating: false,
      starting_cell: null,
      original_starting_cell: null,
      current_cell: null,
      ending_cell: null,
      status: null
    },
    // temporary event is an object
    // that holds values of creator
    // when the popup is initiated
    temporary_event: null,

    // day cells and events are used for rendering purposes
    day_cells: [],
    day_events: null
  }),
  methods: {
    renderDay() {
      myWorker
        .send("getDayCells", {
          day: this.day.value,
          hourOptions: {
            start_hour: this.kalendar_options.day_starts_at,
            end_hour: this.kalendar_options.day_ends_at
          }
        })
        .then(reply => {
          this.day_cells = reply;
          return this.getDayEvents(this.$kalendar.getEvents());
        });
    },

    addEvent(payload) {
      // validation
      let validation_message = this.checkEventValidity(payload);
      if (validation_message !== null) {
        return Promise.reject(validation_message);
      }

      // use web worker to generate event
      // and then render it in the day_events objects
      let { from, to } = payload;
      from = getLocaleTime(from);
      to = getLocaleTime(to);
      return myWorker
        .send("constructNewEvent", {
          event: {
            ...payload,
            from,
            to
          }
        })
        .then(constructed_event => {
          let { key } = constructed_event;
          if (this.day_events.hasOwnProperty(key)) {
            this.day_events[key].push(constructed_event);
          } else {
            // must use $set since key wasnt present in the object
            // vue will fail to render it
            this.$set(this.day_events, key, [constructed_event]);
          }
          let events = this.$kalendar.getEvents();
          console.log("Adding event to kalendar", payload);
          events.push({
            ...payload,
            id: constructed_event.id
          });
          this.$kalendar.updateEvents(events);
        });
    },

    // this is not called inside this component
    // but rather from the kalendar-weekview component
    // which targets it using $refs object.
    removeEvent(payload) {
      let events = this.$kalendar.getEvents();
      let eventIndex = events.findIndex(event => event.id === payload.id);
      if (eventIndex < 0) return;
      events.splice(eventIndex, 1);
      let index = this.day_events[payload.key].findIndex(
        event => event.id === payload.id
      );
      this.day_events[payload.key].splice(index, 1);
      this.$kalendar.updateEvents(events);
      return Promise.resolve();
    },
    checkEventValidity(payload) {
      let { from, to } = payload;
      if (!from || !to) return "No dates were provided in the payload";
      /*if (isoFrom !== from) {
        return 'From date is not ISO format';
      }
      if (isoTo !== to) {
        return 'To date is not ISO format';
      }*/
      return null;
    },
    getDayEvents(events) {
      let clonedEvents = events.map(event => cloneObject(event));
      return myWorker
        .send("constructDayEvents", {
          events: clonedEvents,
          day: this.day.value
        })
        .then(constructed_events => {
          this.day_events = constructed_events;
        });
    },
    clearCreatingLeftovers() {
      for (let key in this.day_events) {
        let hasPending = this.day_events[key].some(event => {
          return (
            event.status === "popup-initiated" || event.status === "creating"
          );
        });
        if (hasPending) {
          let completed = this.day_events[key].filter(
            event => event.status === "completed"
          );
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

    // this method is what we use
    // to start the flow of selecting a new cell
    // while the creator is enabled
    updateCreator(payload) {
      this.creator = {
        ...this.validateSelection(payload),
        status: "creating"
      };
      if (
        this.kalendar_options.overlap === false &&
        Object.keys(this.day_events).length > 0
      ) {
        let fixedOverlap = this.overlapPolice(payload);
        if (fixedOverlap) {
          this.creator = this.validateSelection(fixedOverlap);
          this.selectCell();
          this.initiatePopup();
          return;
        }
      }
      this.selectCell();
    },

    // when the direction is reversed,
    // the ending cell is actually the originally selected cell
    validateSelection(event) {
      let { original_starting_cell, starting_cell, current_cell } = event;
      if (
        event.direction === "reverse" &&
        original_starting_cell.index > current_cell.index
      ) {
        return {
          ...event,
          starting_cell: current_cell,
          ending_cell: original_starting_cell
        };
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

      const diffInMs =
        new Date(ending_cell.value) - new Date(starting_cell.value);
      const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);
      const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);
      let startDate = new Date(starting_cell.value);
      let endDate = new Date(ending_cell.value);

      let distance = diffMins + diffInHrs * 60;

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
        status: "creating"
      };
    },
    initiatePopup() {
      if (this.creating && this.creator.status !== "creating") return;
      this.creator = {
        ...this.creator,
        status: "popup-initiated",
        creating: false
      };
      let {
        ending_cell,
        current_cell,
        starting_cell,
        original_starting_cell
      } = this.creator;
      let real_ending_cell_index = ending_cell.index + 1;
      ending_cell = this.day_cells[real_ending_cell_index];

      const diffInMs =
        new Date(ending_cell.value) - new Date(starting_cell.value);
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
        distance: diffMins + diffInHrs * 60,
        status: "popup-initiated"
      };

      let updated_events = this.day_events[starting_cell.value];
      if (!updated_events) updated_events = [];
      updated_events.push(finalEvent);

      this.$set(this.day_events, starting_cell.value, updated_events);
      this.temporary_event = null;
    },
    overlapPolice(payload) {
      if (!payload.current_cell) return;
      let overlapped = Object.keys(this.day_events)
        .map(evKey => {
          return this.day_events[evKey];
        })
        .flat()
        .filter(event => {
          let cellStart = new Date(payload.starting_cell.value);
          let cellEnd = new Date(payload.ending_cell.value);
          let eventStarts = new Date(event.start.value);
          let eventEnds = new Date(event.end.value);
          return (
            (cellEnd > eventStarts && cellEnd < eventEnds) ||
            (cellStart < eventStarts && cellEnd > eventStarts)
          );
        });
      if (!overlapped || overlapped.length === 0) {
        return;
      }
      let newPayload = payload;
      if (payload.direction === "reverse") {
        let needed_cell = overlapped[0].end;
        let event_cell = this.day_cells.find(
          c => c.value === needed_cell.masked_value
        );
        let cell = this.day_cells[event_cell.index];
        newPayload.starting_cell = {
          value: cell.value,
          index: cell.index
        };
        newPayload.current_cell = {
          value: cell.value,
          index: cell.index
        };
      } else {
        let needed_cell = overlapped[0].start;
        let event_cell = this.day_cells.find(
          c => c.value === needed_cell.masked_value
        );
        let cell = this.day_cells[event_cell.index - 1];
        newPayload.ending_cell = {
          value: cell.value,
          index: cell.index
        };
      }
      return newPayload;
    },
    scrollView() {
      let topoffset = this.$refs.nowIndicator.offsetTop;
      console.log("Scrolling to :", topoffset);
      setTimeout(() => {
        window.scroll({ top: topoffset, left: 0, behavior: "smooth" });
      }, 500);
    }
  }
};
</script>
<style lang="scss">
ul.kalendar-day {
  position: relative;
  background-color: white;

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
