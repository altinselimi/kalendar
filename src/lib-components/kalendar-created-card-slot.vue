<template>
  <div class="details-card">
    <h4 class="appointment-title">
      {{ studentList }}
    </h4>
    <small v-if="false">
      {{ event_information.data.description }}
    </small>
    <span class="time"
    >
      {{ formatDate(event_information.start_time) }}
      -
			{{ formatDate(event_information.end_time) }}
    </span
    >
  </div>
</template>

<script>
import mixFormatToHours from '../lib-components/mixins/formatToHours';
import {
  addTimezoneInfo,
  getFormattedTime
} from './utils.js';
export default {
  name: "kalendar-created-card-slot",
  props: ['event_information'],
  mixins: [
    mixFormatToHours
  ],
  computed: {
    studentList () {
      return this.event_information.data.students.map(s => {
        return s.name
      }).join(", ")
    }
  },
  methods: {
    formatDate (date) {
      let isoDate = new Date(date);
      return getFormattedTime(isoDate)
    }
  }
}
</script>

<style lang="scss">
.details-card {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;
}
</style>