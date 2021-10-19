<template>
  <div
      class="b-time-select"
      :class="{ '--error': error }"
  >
    <vue-timepicker
        format="HH:mm"
        v-model="vTime"
        @change="changeTime"
        hide-clear-button
        close-on-complete
        auto-scroll
        :minute-interval="10"
        :hour-range="[hourRange]"
    />
    <span class="b-time-select__arrow">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.811401L5 5.85239L10 0.811401H0Z" fill="#777777"/>
      </svg>
    </span>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

export default {
  name: "BaseTimeSelect",
  components: {
    VueTimepicker
  },
  props: ['time', 'hourRange', 'error'],
  data () {
    return {
      vTime: this.time
    }
  },
  methods: {
    changeTime (value) {
      this.$emit('changeTime', value)
    }
  }
}
</script>

<style lang="scss">
.b-time-select {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(#DADADA,1);
  &__arrow {
    position: relative;
    top: -2px;
  }
  &.--error {
    color: #ec4d3d;
    border-bottom: 1px solid rgba(#ec4d3d,1);
  }
}
.vue__time-picker {
  width: 5rem !important;
}
.vue__time-picker input.display-time {
  width: 5rem !important;
  background-color: white;
  border: none !important;
  margin: 0;

  transition: border-color 0.2s ease;
  cursor: pointer;
  &:active, &:focus {
    border: none;
  }
  .--error & {
    color: #ec4d3d;
  }
}
/* Default override (not using "append-to-body") */
.vue__time-picker .dropdown ul li:not([disabled]).active {
  background: #2089FF !important;
}

/* When using "append-to-body" */
.vue__time-picker-dropdown ul li:not([disabled]).active {
  background: #2089FF !important;
}
</style>