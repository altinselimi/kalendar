import { g as getLocaleTime, o as isBefore, m as _objectSpread2, r as addTimezoneInfo, h as __vue_normalize__, j as __vue_create_injector__ } from './index-5f6c8367.js';
import 'vue';

var script = {
  props: ['event', 'total', 'index', 'overlaps', 'kalendar_events', 'isShowEditPopup', 'day_events', 'flat' // for month view
  ],
  created: function created() {},
  inject: ['kalendar_options'],
  data: function data() {
    return {
      editing: false
    };
  },
  watch: {
    isShowEditPopup: function isShowEditPopup(value) {
      if (!value) {
        this.closeEditFormEvent();
      }
    }
  },
  computed: {
    isPast: function isPast() {
      var now = getLocaleTime(new Date().toISOString());
      return isBefore(this.event.start.value, now);
    },
    width_value: function width_value() {
      return "".concat(100 / this.total, "% - ").concat(this.overlaps * 50 / this.total, "px");
    },
    left_offset: function left_offset() {
      return "(".concat(this.index, " * (").concat(this.width_value, ")) + ").concat(this.overlaps * 50, "px");
    },
    top_offset: function top_offset() {
      return this.event.start.round_offset ? "".concat(this.event.start.round_offset, "px") : "0px";
    },
    distance: function distance() {
      if (!this.event) return;
      if (this.flat) return "auto";
      var multiplier = this.kalendar_options.cell_height / 30; // 0.5 * multiplier for an offset so next cell is easily selected

      return "".concat(this.event.distance * multiplier - 0.2 * multiplier, "px");
    },
    status: function status() {
      return this.event && this.event.status || this.editing;
    },
    information: function information() {
      var _this$event = _objectSpread2({}, this.event),
          start = _this$event.start,
          end = _this$event.end,
          data = _this$event.data,
          id = _this$event.id,
          key = _this$event.key;

      var payload = {
        start_time: addTimezoneInfo(start.value),
        end_time: addTimezoneInfo(end.value),
        id: id,
        key: key,
        data: data,
        day_events: this.day_events
      };
      return payload;
    }
  },
  methods: {
    editEvent: function editEvent() {
      this.$kalendar.toggleEditPopup(true);
      this.editing = true;
    },
    closeEditFormEvent: function closeEditFormEvent() {
      this.editing = false;
      this.$kalendar.closePopups();
      this.$kalendar.toggleEditPopup(false);
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
    ref: "" + _vm.event.id,
    staticClass: "event-card",
    class: {
      'editing': _vm.editing,
      'is-flat': _vm.flat,
      'is-past': _vm.isPast,
      overlaps: _vm.overlaps > 1,
      'two-in-one': _vm.total > 1,
      'event-card__mini': _vm.event.distance <= 30,
      'event-card__small': _vm.event.distance > 30 && _vm.event.distance < 60 || _vm.overlaps > 1
    },
    style: "\n          height: " + _vm.distance + ";\n          width: calc(" + _vm.width_value + ");\n          left: calc(" + _vm.left_offset + ");\n          top: " + _vm.top_offset + ";\n        "
  }, [_vm.status === 'creating' || _vm.status === 'popup-initiated' ? _c('div', {
    on: {
      "click": _vm.editEvent
    }
  }, [_c('portal-target', {
    attrs: {
      "slot-props": _vm.information,
      "name": "event-creation",
      "slim": ""
    }
  })], 1) : _c('div', {
    on: {
      "click": _vm.editEvent
    }
  }, [_c('portal-target', {
    attrs: {
      "name": "event-details",
      "slot-props": _vm.information,
      "slim": ""
    }
  })], 1), _vm._v(" "), _vm.status === 'popup-initiated' ? _c('div', {
    staticClass: "popup-wrapper"
  }, [_c('portal-target', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.closeEditFormEvent,
      expression: "closeEditFormEvent"
    }],
    attrs: {
      "name": "event-popup-form",
      "slim": "",
      "slot-props": _vm.information
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.editing && _vm.status !== 'popup-initiated' ? _c('div', {
    staticClass: "popup-wrapper"
  }, [_c('portal-target', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.closeEditFormEvent,
      expression: "closeEditFormEvent"
    }],
    attrs: {
      "name": "event-edit-form",
      "slot-props": _vm.information,
      "slim": ""
    }
  })], 1) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1803549c_0", {
    source: ".event-card{display:flex;flex-direction:column;height:100%;width:100%;z-index:5;color:#fff;user-select:none;will-change:height}.event-card h4,.event-card p{margin:0}.event-card>*{flex:1;position:relative}.event-card.editing{z-index:10}.event-card.creating{z-index:-1}.event-card.overlaps>*{border:solid 1px #fff!important}.event-card__mini .created-event>div>.details-card small{display:none}.event-card__mini .appointment-title,.event-card__mini .time{position:absolute;top:0;font-size:9px;line-height:1;z-index:1;overflow:visible;height:100%}.event-card__small .appointment-title{font-size:80%}.event-card__small .time{font-size:70%}.event-card.two-in-one .details-card>*{font-size:60%}.event-card.is-flat{margin-bottom:3px}.event-card.is-flat .details-card>small{display:none}.event-card.is-flat .remove{top:1px}.event-card:not(.is-flat){position:absolute;pointer-events:none;top:0;left:0;right:0;bottom:0}.event-card h1,.event-card h2,.event-card h3,.event-card h4,.event-card h5,.event-card h6,.event-card p{margin:0}.time{position:absolute;bottom:0;right:0;font-size:11px}.popup-wrapper{text-shadow:none;color:#000;z-index:10;position:absolute;top:0;left:calc(100% + 5px);display:flex;flex-direction:column;pointer-events:all;user-select:none;background-color:#fff;border:solid 1px rgba(0,0,0,.08);border-radius:4px;box-shadow:0 2px 12px -3px rgba(0,0,0,.3);padding:10px}.popup-wrapper h4{color:#000;font-weight:400}.popup-wrapper input,.popup-wrapper textarea{border:none;background-color:#ebebeb;color:#030303;border-radius:4px;padding:5px 8px;margin-bottom:5px}.created-event{pointer-events:all;position:relative}.created-event>.details-card{max-width:100%;width:100%}.created-event>.details-card h2,.created-event>.details-card h3,.created-event>.details-card h4,.created-event>.details-card p,.created-event>.details-card small,.created-event>.details-card span,.created-event>.details-card strong,.created-event>.details-card>h1{text-overflow:ellipsis;overflow:hidden;display:block}ul:nth-last-child(-n+3) .popup-wrapper{left:auto;right:100%;margin-right:10px}.day-view ul .popup-wrapper{left:auto;right:auto;width:calc(100% - 10px);top:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
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
