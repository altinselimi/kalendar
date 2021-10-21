import { b as beginningOfPeriod, a as addDays, i as incrementPeriod, c as beginningOfWeek, e as endOfWeekInMonth, d as dayDiff, f as _toConsumableArray, g as getLocaleTime, h as __vue_normalize__, j as __vue_create_injector__ } from './index-e5ac3211.js';
import 'vue';

var script = {
  name: "kalendar-monthview",
  components: {
    KalendarDay: function KalendarDay() {
      return import('./kalendar-daymonth-8586c50e.js');
    }
  },
  props: {
    current_day: {
      required: true,
      type: String,
      validator: function validator(d) {
        return !isNaN(Date.parse(d));
      }
    }
  },
  data: function data() {
    return {
      dayTitles: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    };
  },
  inject: ["kalendar_options", "kalendar_events"],
  computed: {
    today: function today() {
      return new Date(this.current_day);
    },
    //TODO: add a default date
    periodStart: function periodStart() {
      return beginningOfPeriod(this.today, 'month', 0);
    },
    periodEnd: function periodEnd() {
      return addDays(incrementPeriod(this.periodStart, 'month', 1), 0);
    },
    displayFirstDate: function displayFirstDate() {
      return beginningOfWeek(this.periodStart, 2);
    },
    displayLastDate: function displayLastDate() {
      return endOfWeekInMonth(this.periodEnd, 2);
    },
    weeksOfPeriod: function weeksOfPeriod() {
      var _this = this;

      var numWeeks = Math.floor((dayDiff(this.displayFirstDate, this.displayLastDate) + 1) / 7);
      return _toConsumableArray(Array(numWeeks)).map(function (_, i) {
        return addDays(_this.displayFirstDate, i * 7);
      });
    },
    colsSpace: function colsSpace() {
      return this.kalendar_options.style === "flat_design" ? "5px" : "0px";
    },
    passedTime: function passedTime() {
      var _this$kalendar_option = this.kalendar_options,
          day_starts_at = _this$kalendar_option.day_starts_at,
          day_ends_at = _this$kalendar_option.day_ends_at,
          now = _this$kalendar_option.now;
      var time = getLocaleTime(now);
      var day_starts = "".concat(time.split("T")[0], "T").concat((day_starts_at + "").padStart(2, '0'), ":00:00.000Z");
      var day_ends = "".concat(time.split("T")[0], "T").concat((day_ends_at + "").padStart(2, '0'), ":00:00.000Z");
      var time_obj = new Date(time);
      if (new Date(day_ends) < time_obj || time_obj < new Date(day_starts)) return null;
      var distance = (time_obj - new Date(day_starts)) / 1000 / 60;
      return {
        distance: distance,
        time: time
      };
    }
  },
  methods: {
    daysOfWeek: function daysOfWeek(weekStart) {
      return _toConsumableArray(Array(7)).map(function (_, i) {
        return addDays(weekStart, i).toISOString();
      });
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "calendar-wrap",
    style: "--space-between-cols: " + _vm.colsSpace
  }, [_c('div', {
    staticClass: "sticky-top"
  }, [_c('ul', {
    staticClass: "days"
  }, _vm._l(_vm.dayTitles, function (value, index) {
    return _c('li', {
      key: index,
      staticClass: "day-indicator"
    }, [_c('div', [_c('span', {
      staticClass: "letters-date"
    }, [_vm._v(_vm._s(value))])])]);
  }), 0), _vm._v(" "), _vm._l(_vm.weeksOfPeriod, function (weekStart, weekIndex) {
    return _c('div', {
      key: weekIndex + "-week",
      staticClass: "weeks"
    }, _vm._l(_vm.daysOfWeek(weekStart), function (day, dayIndex) {
      return _c('kalendar-day', {
        key: dayIndex,
        ref: dayIndex,
        refInFor: true,
        staticClass: "building-blocks",
        class: "day-" + (dayIndex + 1),
        attrs: {
          "day": day,
          "passed-time": _vm.passedTime.distance
        }
      });
    }), 1);
  })], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-00f3ff6c_0", {
    source: ".sticky-top[data-v-00f3ff6c]{position:sticky;top:0;z-index:20;background-color:#fff}.sticky-top .days[data-v-00f3ff6c]{margin:0;display:flex;margin-left:55px}.sticky-top .days li[data-v-00f3ff6c]{display:inline-flex;flex:1;font-size:1.1rem;color:#666;font-weight:300;margin-right:var(--space-between-cols);border-bottom:solid 1px #e5e5e5;padding-bottom:5px;position:relative}.sticky-top .days li span[data-v-00f3ff6c]{margin-right:3px}.sticky-top .days li span[data-v-00f3ff6c]:first-child{font-size:20px;font-weight:500}.sticky-top .days .today[data-v-00f3ff6c]{border-bottom-color:var(--main-color);color:var(--main-color)!important}.sticky-top .days .today[data-v-00f3ff6c]::after{content:\"\";position:absolute;height:2px;bottom:0;left:0;width:100%;background-color:var(--main-color)}.sticky-top .all-day[data-v-00f3ff6c]{display:flex;margin-bottom:0;margin-top:0;border-bottom:solid 2px #e5e5e5}.sticky-top .all-day span[data-v-00f3ff6c]{display:flex;align-items:center;padding:0 5px;width:55px;font-weight:500;font-size:.8rem;color:#b8bbca;text-transform:lowercase}.sticky-top .all-day li[data-v-00f3ff6c]{flex:1;margin-right:var(--space-between-cols)}.sticky-top .all-day li.all-today[data-v-00f3ff6c]{background-color:#fef4f4}.weeks[data-v-00f3ff6c]{display:flex;padding-left:54px}.weeks>ul[data-v-00f3ff6c]{flex-grow:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-00f3ff6c";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, __vue_create_injector__, undefined, undefined);

export default __vue_component__;
