<template>
  <ul
    :class="{
    'is-weekend': isWeekend,
    'is-today': isToday,
    /*creating: creator.creating || creator.status === 'popup-initiated'*/
    }"
    class="calendar-day">
    <li
        v-if="day_events && Object.keys(day_events).length"
        v-for="(event, index) in day_events" :key="index">
      <KalendarEvent
          :style="`z-index: 10`"
          :event="event[0]"
          :total="day_events.length"
          :index="index"
          :overlaps="0"
          :flat="true"
      />
    </li>
  </ul>
</template>

<script>
import { isToday, isWeekend, cloneObject, getLocaleTime } from "./utils";
import myWorker from "@/lib-components/workers";

export default {
  name: "kalendar-daymonth",

  components: {
    KalendarEvent: () => import('./kalendar-event.vue'),
  },

  props: ["day", "passedTime"],

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

  data () {
    return {
      day_events: null
    }
  },

  computed: {
    isWeekend() {
      return isWeekend(this.day);
    },
    isToday() {
      return isToday(this.day);
    }
  },

  created() {
      // get and render day cells
      // and then render any event
      // on top of them
      this.renderDay();
  },

  methods: {
    renderDay() {
      return this.getDayEvents(this.$kalendar.getEvents())
    },

    getDayEvents(events) {
      let clonedEvents = events.map(event => cloneObject(event));
      return myWorker
          .send("constructDayEvents", {
              events: clonedEvents,
              day: this.day
          })
          .then(constructed_events => {
              this.day_events = constructed_events;
          });
    },
  }
}
</script>

<style lang="scss" scoped>
.calendar-day {
  border-bottom: solid 1px var(--table-cell-border-color);
  border-left: solid 1px var(--table-cell-border-color);
  margin: 0;
  padding: .3rem;
  height: 120px;

  &> li {
    list-style: none;
    border: none !important;
    display: block;
    position: relative;
  }

  &.is-weekend {
    background-color: #f7f7f7;
  }
}
</style>