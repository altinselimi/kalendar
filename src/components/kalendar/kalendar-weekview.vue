<template>
  <div class="calendar-wrap" :style="`--space-between-cols: ${colsSpace}`">
    <div class="sticky-top">
      <portal-target name="week-navigator-place"></portal-target>
      <ul class="days">
        <li class="day-indicator" :key="index" v-for="({value}, index) in (days || [])" :class="{'today': _isToday(value), 'is-before': isBefore(value)}">
          <span class="letters-date">{{value | formatDate('ddd')}}</span>
          <span class="number-date">{{value | formatDate('DD')}}</span>
        </li>
      </ul>
      <ul class="all-day">
        <span>All Day</span>
        <li :key="index" v-for="(date, index) in (days || [])" :class="{'all-today': _isToday(date), 'is-all-day': false}" :style="`height:${kalendar_options.cell_height + 5}px`"></li>
      </ul>
    </div>
    <div class="dummy-row" v-if="false">
      <ul class="dummy-days">
        <li :key="index" v-for="(day, index) in (days || [])" :style="`height:${kalendar_options.cell_height}px`"></li>
      </ul>
    </div>
    <div class="blocks" v-if="hours">
      <div class="calendar-blocks">
        <ul class="hours">
          <li class="hour-row-identifier" :key="index" v-for="(hour, index) in (hours || [])" :style="`height:${hourHeight}px`">
            <span>{{hour.value | formatUTCDate(hour_format)}}</span>
          </li>
        </ul>
        <div v-show="kalendar_options.style !== 'material_design'" class="hour-indicator-line" :style="`top:calc(${passedtime.percentage}% - 5px)`">
          <span class="time-value">{{passedtime.value}}</span>
          <span class="line"></span>
        </div>
        <kalendar-days :day="day" class="building-blocks" :key="index" v-for="(day, index) in days" :passed-time="passedtime.percentage">
        </kalendar-days>
      </div>
    </div>
  </div>
</template>
<script>
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import KalendarDays from './kalendar-day.vue';
import isBefore from 'date-fns/is_before';

import myWorker from '@/components/kalendar/workers';

export default {
  components: {
    KalendarDays,
  },
  inject: ['kalendar_options'],
  created() {
    setInterval(() => this.kalendar_options.now = new Date, 1000 * 60);
    const date = format(this.kalendar_options.current_day, 'YYYY-MM-DD');
    myWorker.send('getDays', {
      day: date
    }).then(reply => {
      console.log('Got days:', reply);
      this.days = reply;//.slice(0,1);
    });
    myWorker.send('getHours').then(reply => {
      // Handle the reply
      console.log('Got hours:', reply);
      this.hours = reply;
    });
  },
  data: () => ({
    hours: null,
    days: []
  }),
  computed: {
    colsSpace() {
      return this.kalendar_options.style === 'flat_design' ? '5px' : '0px';
    },
    hourHeight() {
      return 6 * this.kalendar_options.cell_height;
      //this.kalendar_options.cell_height * (60 / this.kalendar_options.split_value); 
      // * this.kalendar_options.hour_parts;
    },
    passedtime() {
      let time = format(this.kalendar_options.now, 'HH:mm');
      let hours_minutes = time.split(':');
      let minutes = hours_minutes[1],
        oret = hours_minutes[0];
      let mintosec = parseInt(minutes) * 60,
        htosec = parseInt(oret) * 3600;
      let seconds = mintosec + htosec;
      let x = seconds / 864;
      return { percentage: x, value: time };
    },
    hour_format() {
      return this.kalendar_options.military_time ? 'HH:mm' : 'h A';
    }
  },
  methods: {
    _isToday(day) {
      return isToday(day);
    },
    updateAppointments({ id, data }) {
      this.$emit('update', { id, data });
    },
    deleteAppointment(id) {
      this.$emit('delete', { id });
    },
    clearAppointments() {
      this.$emit('clear');
    },
    isBefore(day) {
      return isBefore(day, this.kalendar_options.now);
    },
  },
};
</script>
<style lang="scss">
$blue: #5FB3F2;
$lblue: #D6EEFC;
$dblue: #3D79B4;
$lightgrey: #c7c9d5; //$lightgrey: #F5F4F5;
$grey: #c7c9d5; //#C1C4C8;
$a-grey: #666;
$border-color: transparent;
$theme-color: #e5e5e5;

.calendar-wrap {
  display: flex;
  flex-direction: column;

  ul {
    list-style: none;
    padding: 0px;

    >li {
      display: flex;
    }
  }
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;

  .days {
    margin: 0px;
    display: flex;
    margin-left: 50px;

    li {
      display: inline-flex;
      align-items: flex-end;
      padding-top: 10px;
      flex: 1;
      font-size: 1.1rem;
      color: $a-grey;
      font-weight: 300;
      margin-right: var(--space-between-cols);
      border-bottom: solid 1px #e5e5e5;
      padding-bottom: 5px;
      position: relative;
      font-size: 18px;

      span {
        margin-right: 3px;
      }

      span:first-child {
        font-size: 20px;
        font-weight: 500;
      }
    }

    .today {
      border-bottom-color: var(--main-color);
      color: var(--main-color) !important;
    }

    .today::after {
      content: '';
      position: absolute;
      height: 2px;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: var(--main-color);
    }
  }

  .all-day {
    display: flex;
    margin-bottom: 0px; //border-top: solid 1px #e5e5e5;
    margin-top: 0px;
    border-bottom: solid 2px #e5e5e5;

    span {
      display: flex;
      align-items: center;
      padding: 0px 5px;
      width: 50px;
      font-weight: 500;
      font-size: .8rem;
      color: darken($grey, 5);
      text-transform: lowercase;
    }

    li {
      flex: 1; //border-right: solid 5px $border-color;
      margin-right: var(--space-between-cols);

      &.all-today {
        background-color: #FEF4F4;
      }
    }
  }
}

.dummy-row {
  display: flex;
  padding-left: 50px;

  ul {
    display: flex;
    flex: 1;
    margin: 0px;
  }

  li {
    flex: 1;
    height: 15px; //border-right: solid 5px $border-color;
    margin-right: var(--space-between-cols);
    border-bottom: solid 1px #e5e5e5;
  }
}

.blocks {
  display: flex;
  position: relative;
  height: 100%;

  ul {
    margin-top: 0px;
  }

  .building-blocks {
    flex: 1;
    margin-right: var(--space-between-cols);
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
  }

  .calendar-blocks {
    width: 100%;
    display: flex;
    position: relative;
  }
}

.hours {
  display: flex;
  flex-direction: column;
  color: darken($grey, 5);
  font-weight: 500;
  font-size: .85rem;
  width: 50px;
  height: 100%;
  margin-bottom: 0px;

  li {
    color: var(--hour-row-color);
    border-bottom: solid 1px $border-color;
    padding-left: 8px;

    span {
      margin-top: -10px;
    }

    &:first-child span {
      visibility: hidden;
    }
  }
}
</style>