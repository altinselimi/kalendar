import { k as isWeekend, l as isToday, n as cloneObject, h as __vue_normalize__, j as __vue_create_injector__ } from './index-5f6c8367.js';
import 'vue';
import { m as myWorker } from './index-d71cc8ae.js';

//
var script = {
  name: "kalendar-daymonth",
  components: {
    KalendarEvent: function KalendarEvent() {
      return import('./kalendar-event-ad2dadef.js');
    }
  },
  props: ["day", "passedTime"],
  provide: function provide() {
    // provide these methods to children components
    // for easier access
    return {
      kalendarAddEvent: this.addEvent,
      kalendarClearPopups: this.clearCreatingLeftovers
    };
  },
  // inject kalendar options from parent component
  inject: ["kalendar_options"],
  data: function data() {
    return {
      day_events: null
    };
  },
  computed: {
    isWeekend: function isWeekend$1() {
      return isWeekend(this.day);
    },
    isToday: function isToday$1() {
      return isToday(this.day);
    }
  },
  created: function created() {
    // get and render day cells
    // and then render any event
    // on top of them
    this.renderDay();
  },
  methods: {
    renderDay: function renderDay() {
      return this.getDayEvents(this.$kalendar.getEvents());
    },
    getDayEvents: function getDayEvents(events) {
      var _this = this;

      var clonedEvents = events.map(function (event) {
        return cloneObject(event);
      });
      return myWorker.send("constructDayEvents", {
        events: clonedEvents,
        day: this.day
      }).then(function (constructed_events) {
        _this.day_events = constructed_events;
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

  return _c('ul', {
    staticClass: "calendar-day",
    class: {
      'is-weekend': _vm.isWeekend,
      'is-today': _vm.isToday
    }
  }, _vm._l(_vm.day_events, function (event, index) {
    return _vm.day_events && Object.keys(_vm.day_events).length ? _c('li', {
      key: index
    }, [_c('KalendarEvent', {
      style: "z-index: 10",
      attrs: {
        "event": event[0],
        "total": _vm.day_events.length,
        "index": index,
        "overlaps": 0,
        "flat": true
      }
    })], 1) : _vm._e();
  }), 0);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3674cae9_0", {
    source: ".calendar-day[data-v-3674cae9]{border-bottom:solid 1px var(--table-cell-border-color);border-left:solid 1px var(--table-cell-border-color);margin:0;padding:.3rem;height:120px}.calendar-day>li[data-v-3674cae9]{list-style:none;border:none!important;display:block;position:relative}.calendar-day.is-weekend[data-v-3674cae9]{background-color:#f7f7f7}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-3674cae9";
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
