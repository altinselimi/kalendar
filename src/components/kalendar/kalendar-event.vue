<template>
	<div class="event-card" :style="`height: ${distance}px; width: ${card_width}%; left: ${index * card_width}%`">
    <portal-target v-if="status === 'creating' || status === 'popup-initiated'"
      name="event-creation"
      :slot-props="event"></portal-target>
		<portal-target v-else name="event-details" :slot-props="event_data" slim>
  	</portal-target>
	</div>
</template>
<script>
export default {
  props: ['event', 'total', 'index'],
  computed: {
  	card_width() {
  		return 100/this.total;
  	},
    distance() {
      return this.event && this.event.distance;
    },
    status() {
      return this.event && this.event.status;
    },
    event_data() {
      return this.event.data;
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

  >* {
    flex: 1;
  }

  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; //z-index: 20!important;
  //background-color: rgba($creator-bg, .85);
  color: $creator-content;
  width: 100%;
  user-select: none;
  will-change: height; //padding: 4px 6px;
  h1,h2,h3,h4,h5,h6, p {
  	margin: 0px;
  }
}

.time {
  position: absolute;
  bottom: 4px;
  right: 6px;
  font-size: 11px;
}
</style>