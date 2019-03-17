<template>
  <div class="event-card" 
    :style="`
      height: ${distance}px; width: ${card_width}%; 
      left: calc(${index * card_width}% + ${overlaps * 5}px)
    `" 
    :class="{'overlaps': overlaps > 0}"
  >
    <portal-target v-if="status === 'creating' || status === 'popup-initiated'" :slot-props="information" name="event-creation" slim></portal-target>
    <portal-target v-else name="event-details" :slot-props="information" slim>
    </portal-target>
    <div v-if="status === 'popup-initiated'" class="popup-wrapper">
      <portal-target name="event-popup-form" slim :slot-props="getPopupProps()">
      </portal-target>
    </div>
  </div>
</template>
<script>
export default {
  props: ['event', 'total', 'index', 'overlaps'],
  inject: ['kalendarAddEvent', 'kalendarClearPopups', 'kalendar_options'],
  computed: {
    card_width() {
      return 100 / this.total;
    },
    distance() {
      if (!this.event) return;
      let multiplier = this.kalendar_options.cell_height / 10;
      // 0.5 * multiplier for an offset so next cell is easily selected
      return (this.event.distance * multiplier) - (0.5 * multiplier);
    },
    status() {
      return this.event && this.event.status;
    },
    information() {
      let { start, end, data } = this.event;
      return {
        start_time: start.value,
        end_time: end.value,
        start_index: start.index,
        end_index: end.index,
        data
      }
    },
  },
  methods: {
    saveEvent(payload) {
      if (this.event.data) {
        return this.kalendarAddEvent(payload);
      } else {
        return this.kalendarAddEvent(payload);
      }
    },
    closePopup() {
      return this.kalendarClearPopups();
    },
    getPopupProps() {
      const events = {
        saveEvent: this.saveEvent,
        closePopup: this.closePopup,
        status: 'hello'
      };

      const information = this.information;
      return {
        events,
        information
      }
    }
  }
}
</script>
<style lang="scss">
$creator-bg: #34aadc;
$creator-content: white;

.event-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  >* {
    flex: 1;
  }

  &.creating {
    z-index: -1;
  }

  &.overlaps > * {
    border: solid 1px white !important;
  }

  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; //z-index: 20!important;
  //background-color: rgba($creator-bg, .85);
  color: $creator-content;
  user-select: none;
  will-change: height; //padding: 4px 6px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0px;
  }
}

.time {
  position: absolute;
  bottom: 4px;
  right: 6px;
  font-size: 11px;
}

.popup-wrapper {
  text-shadow: none;
  color: black;
  z-index: 10;
  position: absolute;
  top: 0;
  left: calc(100% + 5px);
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  user-select: none;
  background-color: white;
  border: solid 1px rgba(black, .08);
  border-radius: 4px;
  box-shadow: 0px 2px 12px -3px rgba(black, .3);
  padding: 10px;

  h4 {
    color: black;
    font-weight: 400;
  }

  input,
  textarea {
    border: none;
    background-color: darken(white, 8);
    color: lighten(black, 1);
    border-radius: 4px;
    padding: 5px 8px;
    margin-bottom: 5px;
  }
}

ul:last-child .popup-wrapper {
  left: auto;
  right: 100%;
  margin-right: 10px;
}

.is-day-view ul .popup-wrapper {
  left: auto;
  right: auto;
  width: 100%;
}
</style>