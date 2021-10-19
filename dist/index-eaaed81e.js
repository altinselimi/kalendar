import Vue from 'vue';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var creators_offset = new Date().getTimezoneOffset() / 60;

if (creators_offset * -1 >= 0) {
  creators_offset *= -1;
  creators_offset = "".concat((creators_offset + "").padStart(2, "0"), ":00");
  creators_offset = "+".concat(creators_offset);
} else {
  creators_offset = "".concat((creators_offset + "").padStart(2, "0"), ":00");
  creators_offset = "-".concat(creators_offset);
}

var getHourlessDate = function getHourlessDate(date_string) {
  var today = date_string ? new Date(date_string) : new Date();
  var year = today.getFullYear() + "",
      month = (today.getMonth() + 1 + "").padStart(2, "0"),
      day = (today.getDate() + "").padStart(2, "0");
  return "".concat(year, "-").concat(month, "-").concat(day, "T00:00:00.000Z");
};

var getTime = function getTime(date) {
  var dateObj = new Date(date);
  var minutes = dateObj.getUTCHours().toString().padStart(2, "0");
  var seconds = dateObj.getUTCMinutes().toString().padStart(2, "0");
  return "".concat(minutes, ":").concat(seconds);
};

var addDays = function addDays(date, days) {
  var dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

var startOfWeek = function startOfWeek(date) {
  var d = new Date(date);
  var day = d.getDay(),
      diff = d.getDate() - day + 1;
  return new Date(d.setDate(diff));
};

var endOfWeek = function endOfWeek(date) {
  var dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);
  var toAdd = 7 - dateObj.getDay();
  return addDays(dateObj, toAdd);
};

var generateUUID = function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

var cloneObject = function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
};

var getLocaleTime = function getLocaleTime(dateString) {
  var _Date$toLocaleString$ = new Date(dateString).toLocaleString("en-GB").split(", "),
      _Date$toLocaleString$2 = _slicedToArray(_Date$toLocaleString$, 2),
      date = _Date$toLocaleString$2[0],
      hour = _Date$toLocaleString$2[1];

  date = date.split("/").reverse().join("-");
  return "".concat(date, "T").concat(hour, ".000Z");
};

var addTimezoneInfo = function addTimezoneInfo(ISOdate) {
  if (new Date(ISOdate).toISOString() !== ISOdate) return;
  return "".concat(ISOdate.slice(0, 19)).concat(creators_offset);
};

var isToday = function isToday(date) {
  if (!date) return;
  var today = getLocaleTime(new Date()).slice(0, 10);
  return date.slice(0, 10) === today;
};

var isBefore = function isBefore(date1, date2) {
  if (!date1 || !date2) return;
  return new Date(date1) < new Date(date2);
};

var isWeekend = function isWeekend(date) {
  if (!date) return;
  var day = new Date(date).getDay();
  return day === 6 || day === 0;
};

var locale = function locale() {
  // If not running in the browser, cannot determine a default, return the code for unknown (blank is invalid)
  if (typeof navigator === "undefined") return "unk"; // Return the browser's language setting, implementation is browser-specific

  return (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language).toLowerCase();
};

var getFormattedWeekDayTime = function getFormattedWeekDayTime(date) {
  var formatter = new Intl.DateTimeFormat(locale(), {
    weekday: 'short'
  });
  return formatter.format(date);
};

var getFormattedMonth = function getFormattedMonth(date) {
  var formatter = new Intl.DateTimeFormat(locale(), {
    day: 'numeric',
    month: 'long'
  });
  return formatter.format(date);
};

var getFormattedTime = function getFormattedTime(date) {
  var formatter = new Intl.DateTimeFormat(locale(), {
    timeStyle: 'short'
  });
  return formatter.format(date);
};

var script = {
  components: {
    KalendarWeekView: function KalendarWeekView() {
      return import('./kalendar-weekview-23ff0587.js');
    },
    ScrollContainer: function ScrollContainer() {
      return import('./scroll-container-c6da6f29.js');
    }
  },
  props: {
    // this provided array will be kept in sync
    events: {
      required: true,
      type: Array,
      validator: function validator(val) {
        return Array.isArray(val);
      }
    },
    work_time: {
      required: true,
      type: Object,
      validator: function validator(val) {
        return _typeof(val) === "object";
      }
    },
    // use this to enable/disable stuff which
    // are supported by Kalendar itself
    configuration: {
      type: Object,
      required: false,
      validator: function validator(val) {
        return _typeof(val) === 'object';
      }
    }
  },
  data: function data() {
    var _this = this;

    return {
      current_day: getHourlessDate(),
      default_options: {
        cell_height: 10,
        scrollToNow: false,
        height: 'calc(100vh - 100px)',
        start_day: getHourlessDate(),
        view_type: 'week',
        style: 'material_design',
        now: new Date(),
        military_time: true,
        working_hours: true,
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        time_mode: 'relative',
        overlap: true,
        // перекрытие событий
        past_event_creation: true,
        formatLeftHours: function formatLeftHours(date) {
          var isoDate = new Date(addTimezoneInfo(date));
          return getFormattedTime(isoDate);
        },
        formatDayTitle: function formatDayTitle(date) {
          var isoDate = new Date(date);
          var dayName = getFormattedWeekDayTime(isoDate).split(',')[0];
          var dayNumber = isoDate.getUTCDate();
          return [dayName, dayNumber];
        },
        formatWeekNavigator: function formatWeekNavigator(isoDate) {
          var startDate = startOfWeek(isoDate);
          var endDate = endOfWeek(isoDate);
          var startString = getFormattedMonth(startDate);
          var endString = getFormattedMonth(endDate);
          return "".concat(startString, " - ").concat(endString);
        },
        formatDayNavigator: function formatDayNavigator(isoDate) {
          var day = new Date(isoDate);
          return day.toUTCString().slice(5, 11);
        },
        toggleEditing: function toggleEditing() {
          _this.isEditing = !_this.isEditing;
        },
        toggleEditPopup: function toggleEditPopup(value) {
          _this.isShowEditPopup = value;
        }
      },
      kalendar_events: null,
      kalendar_work_hours: {},
      kalendar_work_hours_temp: {},
      new_appointment: {},
      scrollable: true,
      isEditing: false,
      isShowEditPopup: false
    };
  },
  computed: {
    kalendar_options: function kalendar_options() {
      var _this2 = this;

      var options = this.default_options;
      var provided_props = this.configuration;
      var conditions = {
        scrollToNow: function scrollToNow(val) {
          return typeof val === 'boolean';
        },
        start_day: function start_day(val) {
          return !isNaN(Date.parse(val));
        },
        view_type: function view_type(val) {
          return ['week', 'day'].includes(val);
        },
        cell_height: function cell_height(val) {
          return !isNaN(val);
        },
        height: function height(val) {
          return _this2.isString(val);
        },
        style: function style(val) {
          return ['material_design', 'flat_design'].includes(val);
        },
        military_time: function military_time(val) {
          return typeof val === 'boolean';
        },
        working_hours: function working_hours(val) {
          return typeof val === 'boolean';
        },
        read_only: function read_only(val) {
          return typeof val === 'boolean';
        },
        day_starts_at: function day_starts_at(val) {
          return typeof val === 'number' && val >= 0 && val <= 24;
        },
        day_ends_at: function day_ends_at(val) {
          return typeof val === 'number' && val >= 0 && val <= 24;
        },
        hide_dates: function hide_dates(val) {
          return Array.isArray(val);
        },
        hide_days: function hide_days(val) {
          return Array.isArray(val) && !val.find(function (n) {
            return typeof n !== 'number';
          });
        },
        overlap: function overlap(val) {
          return typeof val === 'boolean';
        },
        past_event_creation: function past_event_creation(val) {
          return typeof val === 'boolean';
        }
      };

      for (var key in provided_props) {
        if (conditions.hasOwnProperty(key) && conditions[key](provided_props[key])) {
          options[key] = provided_props[key];
        }
      }

      return options;
    }
  },
  created: function created() {
    var _this3 = this;

    this.current_day = this.kalendar_options.start_day;
    this.kalendar_events = this.events.map(function (event) {
      return _objectSpread2(_objectSpread2({}, event), {}, {
        id: event.id || generateUUID()
      });
    });
    this.kalendar_work_hours = _objectSpread2({}, this.work_time);
    this.kalendar_work_hours_temp = _objectSpread2({}, this.work_time);

    if (!this.$kalendar) {
      Vue.prototype.$kalendar = {};
    }

    this.$kalendar.getEvents = function () {
      return _this3.kalendar_events.slice(0);
    };

    this.$kalendar.updateEvents = function (events) {
      _this3.kalendar_events = events.map(function (event) {
        return _objectSpread2(_objectSpread2({}, event), {}, {
          id: event.id || generateUUID()
        });
      });

      _this3.$emit('update:events', _this3.kalendar_events);
    };

    this.$kalendar.getWorkHours = function () {
      return _objectSpread2({}, _this3.kalendar_work_hours);
    };

    this.$kalendar.updateWorkHours = function (payload) {
      _this3.kalendar_work_hours = _objectSpread2(_objectSpread2({}, _this3.kalendar_work_hours), payload);
    };

    this.$kalendar.saveWorkHours = function () {
      _this3.$emit('update:work_time', _this3.kalendar_work_hours);

      _this3.kalendar_work_hours_temp = _this3.kalendar_work_hours;
    };

    this.$kalendar.removeWorkHours = function (payload) {
      delete _this3.kalendar_work_hours[payload];
    };

    this.$kalendar.resetWorkHours = function () {
      _this3.kalendar_work_hours = {};
      _this3.kalendar_work_hours_temp = _this3.kalendar_work_hours;
    };

    this.$kalendar.cancelWorkHours = function () {
      _this3.kalendar_work_hours = _objectSpread2({}, _this3.work_time);

      _this3.$kalendar.saveWorkHours();
    };

    this.$kalendar.formatLeftHours = this.kalendar_options.formatLeftHours;
    this.$kalendar.toggleEditing = this.kalendar_options.toggleEditing;
    this.$kalendar.toggleEditPopup = this.kalendar_options.toggleEditPopup;
    this.$kalendar.options = this.kalendar_options;
  },
  provide: function provide() {
    var _this4 = this;

    var provider = {};
    Object.defineProperty(provider, 'kalendar_options', {
      enumerable: true,
      get: function get() {
        return _this4.kalendar_options;
      }
    });
    return provider;
  },
  methods: {
    getTime: getTime,
    changeDay: function changeDay(numDays) {
      var _this5 = this;

      if (numDays === 0) {
        this.current_day = new Date().toISOString();
      } else {
        this.current_day = addDays(this.current_day, numDays).toISOString();
      }

      setTimeout(function () {
        return _this5.$kalendar.buildWeek();
      });
    },
    addAppointment: function addAppointment(popup_info) {
      var payload = {
        data: {
          title: this.new_appointment.title,
          description: this.new_appointment.description
        },
        from: popup_info.start_time,
        to: popup_info.end_time
      };
      this.$kalendar.addNewEvent(payload);
      this.$kalendar.closePopups();
      this.clearFormData();
    },
    clearFormData: function clearFormData() {
      this.new_appointment = {
        description: null,
        title: null
      };
    },
    closePopups: function closePopups() {
      this.$kalendar.closePopups();
    },
    isString: function isString(val) {
      return typeof val === "string" || val instanceof String;
    },
    saveAppointment: function saveAppointment(popup_info) {
      this.$kalendar.saveEvent(popup_info);
      this.$kalendar.closePopups();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "kalendar-wrapper",
    class: {
      'no-scroll': !_vm.scrollable,
      gstyle: _vm.kalendar_options.style === 'material_design',
      'day-view': _vm.kalendar_options.view_type === 'day'
    },
    on: {
      "touchstart": function touchstart($event) {
        _vm.scrollable = false;
      },
      "touchend": function touchend($event) {
        _vm.scrollable = true;
      }
    }
  }, [_c('div', {
    staticClass: "kalendar-header"
  }, [_c('div', [_c('div', {
    staticClass: "button-today"
  }, [_c('button', {
    staticClass: "main-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(0);
      }
    }
  }, [_vm._v("\n                    Сегодня\n                ")])]), _vm._v(" "), _c('div', {
    staticClass: "week-navigator"
  }, [_vm.kalendar_options.view_type === 'week' ? _c('div', {
    staticClass: "nav-wrapper"
  }, [_c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(-7);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    staticStyle: {
      "transform": "rotate(180deg)"
    },
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])]), _vm._v(" "), _c('div', [_c('span', [_vm._v(_vm._s(_vm.kalendar_options.formatWeekNavigator(_vm.current_day)))])]), _vm._v(" "), _c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(7);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])])]) : _vm._e(), _vm._v(" "), _vm.kalendar_options.view_type === 'day' ? _c('div', {
    staticClass: "nav-wrapper"
  }, [_c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(-1);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    staticStyle: {
      "transform": "rotate(180deg)"
    },
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])]), _vm._v(" "), _c('div', [_c('span', [_vm._v(_vm._s(_vm.kalendar_options.formatDayNavigator(_vm.current_day)))])]), _vm._v(" "), _c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(1);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])])]) : _vm._e()])]), _vm._v(" "), _vm._t("workTimeEdit")], 2), _vm._v(" "), _c('div', {
    staticClass: "b-scroll-container",
    style: {
      height: _vm.kalendar_options.height
    }
  }, [_c('scroll-container', [_c('kalendar-week-view', {
    attrs: {
      "kalendar_work_hours": _vm.kalendar_work_hours,
      "current_day": _vm.current_day,
      "kalendar_events": _vm.kalendar_events,
      "isEditing": _vm.isEditing,
      "isShowEditPopup": _vm.isShowEditPopup
    }
  })], 1)], 1), _vm._v(" "), _c('portal', {
    staticClass: "slotable",
    attrs: {
      "to": "event-creation"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(information) {
        return _c('div', {
          staticClass: "creating-event"
        }, [_vm._t("creating-card", function () {
          return [_c('h4', {
            staticClass: "appointment-title",
            staticStyle: {
              "text-align": "left"
            }
          }, [_vm._v("\n                    New Appointment\n                ")]), _vm._v(" "), _c('span', {
            staticClass: "time"
          }, [_vm._v("\n                    " + _vm._s(_vm.getTime(information.start_time)) + "\n                    -\n                    " + _vm._s(_vm.getTime(information.end_time)) + "\n                ")])];
        }, {
          "event_information": information
        })], 2);
      }
    }], null, true)
  }), _vm._v(" "), _c('portal', {
    staticClass: "slotable",
    attrs: {
      "to": "event-popup-form"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(information) {
        return _c('div', {
          staticClass: "popup-event"
        }, [_vm._t("popup-form", function () {
          return [_c('h4', {
            staticStyle: {
              "margin-bottom": "10px"
            }
          }, [_vm._v("\n                    New Appointment\n                ")]), _vm._v(" "), _c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.new_appointment['title'],
              expression: "new_appointment['title']"
            }],
            staticStyle: {
              "width": "100%"
            },
            attrs: {
              "type": "text",
              "name": "title",
              "placeholder": "Title"
            },
            domProps: {
              "value": _vm.new_appointment['title']
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) {
                  return;
                }

                _vm.$set(_vm.new_appointment, 'title', $event.target.value);
              }
            }
          }), _vm._v(" "), _c('textarea', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.new_appointment['description'],
              expression: "new_appointment['description']"
            }],
            attrs: {
              "type": "text",
              "name": "description",
              "placeholder": "Description",
              "rows": "2"
            },
            domProps: {
              "value": _vm.new_appointment['description']
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) {
                  return;
                }

                _vm.$set(_vm.new_appointment, 'description', $event.target.value);
              }
            }
          }), _vm._v(" "), _c('div', {
            staticClass: "buttons"
          }, [_c('button', {
            staticClass: "cancel",
            on: {
              "click": function click($event) {
                return _vm.closePopups();
              }
            }
          }, [_vm._v("\n                        Cancel\n                    ")]), _vm._v(" "), _c('button', {
            on: {
              "click": function click($event) {
                return _vm.saveAppointment(information);
              }
            }
          }, [_vm._v("\n                        Save\n                    ")])])];
        }, {
          "popup_information": information
        })], 2);
      }
    }], null, true)
  }), _vm._v(" "), _c('portal', {
    staticClass: "slotable",
    attrs: {
      "to": "event-details"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(information) {
        return _c('div', {
          staticClass: "created-event"
        }, [_vm._t("created-card", function () {
          return [_c('h4', {
            staticStyle: {
              "margin-bottom": "5px"
            }
          }, [_vm._v(_vm._s(information.data))]), _vm._v(" "), _c('p', [_vm._v("\n                    " + _vm._s(information.start_time.substr(11, 5)) + " -\n                    " + _vm._s(information.end_time.substr(11, 5)) + "\n                ")])];
        }, {
          "event_information": information
        })], 2);
      }
    }], null, true)
  }), _vm._v(" "), _c('portal', {
    staticClass: "slotable",
    attrs: {
      "to": "event-edit-form"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(information) {
        return _c('div', {
          staticClass: "popup-event"
        }, [_vm._t("popup-edit-form", function () {
          return [_c('h4', {
            staticStyle: {
              "margin-bottom": "10px"
            }
          }, [_vm._v("\n                    New Appointment\n                ")]), _vm._v(" "), _c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: information.data['title'],
              expression: "information.data['title']"
            }],
            staticStyle: {
              "width": "100%"
            },
            attrs: {
              "type": "text",
              "name": "title",
              "placeholder": "Title"
            },
            domProps: {
              "value": information.data['title']
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) {
                  return;
                }

                _vm.$set(information.data, 'title', $event.target.value);
              }
            }
          }), _vm._v(" "), _c('textarea', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: information.data['description'],
              expression: "information.data['description']"
            }],
            attrs: {
              "type": "text",
              "name": "description",
              "placeholder": "Description",
              "rows": "2"
            },
            domProps: {
              "value": information.data['description']
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) {
                  return;
                }

                _vm.$set(information.data, 'description', $event.target.value);
              }
            }
          }), _vm._v(" "), _c('div', {
            staticClass: "buttons"
          }, [_c('button', {
            staticClass: "cancel",
            on: {
              "click": function click($event) {
                return _vm.closePopups();
              }
            }
          }, [_vm._v("\n                        Cancel\n                    ")]), _vm._v(" "), _c('button', {
            on: {
              "click": function click($event) {
                return _vm.saveAppointment(information);
              }
            }
          }, [_vm._v("\n                        Save\n                    ")])])];
        }, {
          "popup_information": information
        })], 2);
      }
    }], null, true)
  })], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-41b9389b_0", {
    source: "@import url(https://fonts.googleapis.com/css?family=Rubik:wght@400,600&display=swap);*{box-sizing:border-box;font-family:Rubik,Helvetica,Arial,sans-serif}*{box-sizing:border-box;user-select:none}:after,:before{box-sizing:border-box;user-select:none}html{font-size:10px!important}@media only screen and (max-width:1100px){html{font-size:8px!important}}@media only screen and (max-width:768px){html{font-size:10px!important}}.kalendar-wrapper{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--main-color:#ec4d3d;--weekend-color:#f7f7f7;--current-day-color:#7AFFD7;--table-cell-border-color:#e5e5e5;--odd-cell-border-color:#e5e5e5;--hour-row-color:inherit;--dark:#212121;--lightg:#9e9e9e;--card-bgcolor:#04A675;--card-color:white;--max-hours:10;--previous-events:#c6dafc;--previous-text-color:#727d8f;--green:#0abc83;--red:#ec4d3d}.kalendar-wrapper.gstyle{--hour-row-color:#212121;--main-color:#4285f4;--weekend-color:transparent;--table-cell-border-color:#dadada;--odd-cell-border-color:transparent;font-family:\"Google Sans\",Roboto,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Arial,sans-serif}.kalendar-wrapper.gstyle .week-navigator{display:flex;justify-content:space-between;align-items:center;background:#fff;border-bottom:none;padding:20px;color:rgba(0,0,0,.54)}.kalendar-wrapper.gstyle .week-navigator button{color:rgba(0,0,0,.54)}.kalendar-wrapper.gstyle .created-event,.kalendar-wrapper.gstyle .creating-event{background-color:var(--card-bgcolor);color:var(--card-color);text-shadow:none;border-left:none;border-radius:10px;opacity:1;border-bottom:solid 1px rgba(0,0,0,.03);font-size:14px;padding:0 5px;display:flex;justify-content:space-between;align-items:center}.kalendar-wrapper.gstyle .created-event>*,.kalendar-wrapper.gstyle .creating-event>*{text-shadow:none}.kalendar-wrapper.gstyle .creating-event{color:var(--main-color);background-color:#7affd7;font-size:12px;padding:0 20px;border-radius:10px;align-items:flex-start}.kalendar-wrapper.gstyle .creating-event .time{color:var(--main-color);display:flex;align-items:center}.kalendar-wrapper.gstyle .is-past .created-event,.kalendar-wrapper.gstyle .is-past .creating-event{background-color:var(--previous-events);color:var(--previous-text-color)}.kalendar-wrapper.gstyle .created-event{width:100%}.kalendar-wrapper.gstyle .created-event .time{right:2px}.kalendar-wrapper.gstyle .created-event:hover{cursor:pointer;background-color:var(--main-color)}.kalendar-wrapper.gstyle .created-event:hover *{color:#fff}.kalendar-wrapper.gstyle .sticky-top .days{margin-left:0;padding-left:55px}.kalendar-wrapper.gstyle .all-day{display:none}.kalendar-wrapper.gstyle ul.building-blocks.day-1 li.is-an-hour::before{content:\"\";position:absolute;bottom:-1px;left:-10px;width:10px;height:1px;background-color:var(--table-cell-border-color)}.kalendar-wrapper.gstyle .hours,.kalendar-wrapper.gstyle ul.building-blocks li{border-right:solid 1px var(--table-cell-border-color)}.kalendar-wrapper.gstyle .hour-indicator-line>span.line{height:2px;background-color:#db4437}.kalendar-wrapper.gstyle .hour-indicator-line>span.line:before{content:\"\";width:12px;height:12px;display:block;background-color:#db4437;position:absolute;top:-1px;left:0;border-radius:100%}.kalendar-wrapper.gstyle .days{position:relative}.kalendar-wrapper.gstyle .days:before{content:\"\";position:absolute;height:1px;width:55px;left:0;bottom:0}.kalendar-wrapper.gstyle .day-indicator{display:flex;flex-direction:column;align-items:center;color:var(--dark);font-size:13px;padding-left:0;background:#fff}.kalendar-wrapper.gstyle .day-indicator>div{display:flex;flex-direction:column;align-items:center}.kalendar-wrapper.gstyle .day-indicator.is-before{color:#757575}.kalendar-wrapper.gstyle .day-indicator .number-date{margin-left:0;margin-right:0;order:2;font-size:18px;font-weight:600;width:32px;height:32px;border-radius:100%;align-items:center;justify-content:center;display:flex;margin-top:4px}.kalendar-wrapper.gstyle .day-indicator.today{border-bottom-color:var(--table-cell-border-color)}.kalendar-wrapper.gstyle .day-indicator.today:after{display:none}.kalendar-wrapper.gstyle .day-indicator.today .number-date{background-color:var(--main-color);color:#fff}.kalendar-wrapper.gstyle .day-indicator .letters-date{margin-left:0;margin-right:0;font-weight:500;text-transform:uppercase;font-size:11px}.kalendar-wrapper.gstyle .day-indicator:first-child{position:relative}.kalendar-wrapper.gstyle .day-indicator:first-child::before{content:\"\";position:absolute;left:-1px;top:0;width:1px;height:100%}.kalendar-wrapper.gstyle .creating-event{border-radius:10px;box-shadow:0 2px 2px rgba(0,0,0,.25);transition:opacity .1s linear}.kalendar-wrapper.gstyle .popup-wrapper{width:400px;min-height:116px;box-shadow:0 4px 4px rgba(0,0,0,.25);transition:opacity .1s linear}.kalendar-wrapper.non-desktop .building-blocks{pointer-events:none}.kalendar-wrapper.day-view .day-indicator{align-items:flex-start;text-align:center;padding-left:10px}.created-event,.creating-event{padding:4px 6px;cursor:default;word-break:break-word;height:100%;width:100%;font-size:14px}.created-event h4,.creating-event h4{font-weight:400}.creating-event{background-color:#34aadc;opacity:.9}.creating-event>*{text-shadow:0 0 7px rgba(0,0,0,.25)}.created-event{background-color:#bfecff;opacity:.74;border-left:solid 3px #34aadc;color:#1f6570}.week-navigator{display:flex;align-items:center;background:linear-gradient(#fdfdfd,#f9f9f9);border-bottom:solid 1px #ec4d3d;padding:10px 20px}.week-navigator .nav-wrapper{display:flex;align-items:center;justify-content:space-between;font-size:22px}.week-navigator .nav-wrapper span{white-space:nowrap;line-height:1.6;color:#333}.week-navigator button{background:0 0;border:none;display:inline-flex;margin:0 10px;color:#ec4d3d;align-items:center;font-size:14px;cursor:pointer;padding:0}.kalendar-wrapper{background-color:#fff;min-width:300px}.no-scroll{overflow-y:hidden;max-height:100%}.hour-indicator-line{position:absolute;z-index:2;width:100%;height:10px;display:flex;align-items:center;pointer-events:none;user-select:none}.hour-indicator-line>span.line{background-color:var(--main-color);height:1px;display:block;flex:1}.hour-indicator-line>span.time-value{font-size:14px;width:48px;color:var(--main-color);font-weight:600;background-color:#fff}.hour-indicator-tooltip{position:absolute;z-index:0;background-color:var(--main-color);width:10px;height:10px;display:block;border-radius:100%;pointer-events:none;user-select:none}ul.kalendar-day li.kalendar-cell:last-child{display:none}.week-navigator-button{outline:0}.week-navigator-button:active svg,.week-navigator-button:hover svg{stroke:var(--main-color)}.gstyle .week-navigator-button{width:32px;height:32px;display:flex;justify-content:center;align-items:center;border:2px solid var(--main-color);border-radius:100%;transition:all .2s}.gstyle .week-navigator-button svg{position:relative;left:1px;stroke:var(--main-color)}.gstyle .week-navigator-button:hover{border:2px solid #fff;background:var(--main-color)}.gstyle .week-navigator-button:hover svg{stroke:#fff}.kalendar-header{display:flex;justify-content:space-between;align-items:center}.kalendar-header>div{display:flex;justify-content:space-between;align-items:center}.main-button{padding:11px 42px;background:#2089ff;box-shadow:5px 5px 15px rgba(0,0,0,.15);border-radius:10px;margin:0 5px;cursor:pointer;border:none;color:#fff}.main-button:active{box-shadow:inset 5px 5px 15px rgba(0,0,0,.15)}.main-button.--gray{background:var(--green)}.main-button.--red{background:var(--red)}.button-today{margin:0 20px 0 0}",
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

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Kalendar: __vue_component__
});

var install = function installKalendarVue(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
  Vue.prototype.$kalendar = {};
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Default export is library as a whole, registered via Vue.use()

export { __vue_component__ as _, isToday as a, _objectSpread2 as b, cloneObject as c, normalizeComponent as d, createInjector as e, isBefore as f, getLocaleTime as g, getHourlessDate as h, isWeekend as i, addTimezoneInfo as j, getTime as k, plugin as p };
