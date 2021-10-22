'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var Vue=_interopDefault(require('vue')),selectable=_interopDefault(require('vue-selectable'));function ownKeys(object, enumerableOnly) {
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var creators_offset = new Date().getTimezoneOffset() / 60;

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
  if (new Date(ISOdate).toISOString() !== ISOdate && ISOdate.indexOf('000Z') !== -1) return;
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

var getTimeRemaining = function getTimeRemaining(endTime) {
  var total = Date.parse(endTime) - Date.parse(new Date());
  var seconds = Math.floor(total / 1000 % 60);
  var minutes = Math.floor(total / 1000 / 60 % 60);
  var hours = Math.floor(total / (1000 * 60 * 60) % 24);
  var days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    total: total,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
};

var beginningOfWeek = function beginningOfWeek(d, startDow) {
  return addDays(d, (startDow - d.getDay() - 7) % -7);
};

var endOfWeekInMonth = function endOfWeekInMonth(d, startDow) {
  return addDays(beginningOfWeek(d, startDow), 7);
};

var incrementPeriod = function incrementPeriod(d, uom, count) {
  return new Date(d.getFullYear() + (uom === "year" ? count : 0), d.getMonth() + (uom === "month" ? count : 0), d.getDate() + (uom === "week" ? count * 7 : 0));
}; // Number of whole days between two dates. If present, time of day is ignored.
// Treats dates as UTC to avoid DST changes within the perioud leading to incorrect
// answers.


var dayDiff = function dayDiff(d1, d2) {
  var endDate = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()),
      startDate = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  return (endDate - startDate) / 86400000;
};

var beginningOfPeriod = function beginningOfPeriod(d, periodUom, startDow) {
  switch (periodUom) {
    case "year":
      return new Date(d.getFullYear(), 0);

    case "month":
      return new Date(d.getFullYear(), d.getMonth());

    case "week":
      return beginningOfWeek(d, startDow);

    default:
      return d;
  }
};//
var script = {
  name: "kalendar-created-card-slot",
  props: ['event_information'],
  computed: {
    studentList: function studentList() {
      return this.event_information.data.students.map(function (s) {
        return s.name;
      }).join(", ");
    }
  },
  methods: {
    formatDate: function formatDate(date) {
      var isoDate = new Date(date);
      return getFormattedTime(isoDate);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}const isOldIE = typeof navigator !== 'undefined' &&
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "details-card"
  }, [_c('h4', {
    staticClass: "appointment-title"
  }, [_vm._v("\n      " + _vm._s(_vm.studentList) + "\n    ")]), _vm._v(" "),  _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v("\n      " + _vm._s(_vm.formatDate(_vm.event_information.start_time)) + "\n      -\n\t\t\t" + _vm._s(_vm.formatDate(_vm.event_information.end_time)) + "\n    ")])]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e595e128_0", {
    source: ".details-card{display:flex;flex-direction:column;width:100px;height:100%}",
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
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);//
//
//
//
//
//
//
//
var script$1 = {
  name: "kalendar-x-button"
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "x-button"
  }, [_c('svg', {
    attrs: {
      "width": "14",
      "height": "14",
      "viewBox": "0 0 14 14",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z",
      "fill": "#777777"
    }
  })])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-87f04e36_0", {
    source: ".x-button{width:24px;height:24px;cursor:pointer;border-radius:100%;display:flex;justify-content:center;align-items:center;transition:all .3s;border:2px solid #fff}.x-button:hover{transform:rotate(90deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);var script$2 = {
  props: {
    styling: {
      type: Object
    },
    backgroundBar: {
      type: String,
      default: '#C4C4C4'
    }
  },
  computed: {
    cssProps: function cssProps() {
      return {
        '--bg-color': this.backgroundBar
      };
    }
  },
  mounted: function mounted() {
    var vb = this.$refs.vueBar;
    var el = vb.querySelector('.vb-content');
    var sel = el.querySelector('.selected');
    var top = null;
    var h = null;

    if (sel) {
      top = sel.offsetTop;
      h = el.offsetHeight / 2; // half height .vb-content
    }

    if (top !== null && top > h) el.scrollTop = top - h;
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "bar",
      rawName: "v-bar",
      value: {
        preventParentScroll: true,
        scrollThrottle: 30
      },
      expression: "{\n    preventParentScroll:\n    true, scrollThrottle: 30\n  }"
    }],
    ref: "vueBar",
    staticClass: "vuebar-element",
    style: [_vm.styling, _vm.cssProps]
  }, [_c('div', [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-eecef4de_0", {
    source: ".vue-scrollbar__wrapper{background:0 0}.vue-scrollbar__scrollbar-vertical{width:.2rem;height:92%;top:.4rem;bottom:.4rem;right:.4rem}.vue-scrollbar__scrollbar-vertical .scrollbar{width:.2rem;border-radius:.2rem}.b-scroll-bar{background-color:var(--bg-color)}.b-scroll-bar .scrollbar{background-color:var(--bg-color)}.vuebar-element{height:100%;width:100%}.vb>.vb-dragger{z-index:5;width:10px;right:0}.vb>.vb-dragger>.vb-dragger-styler{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:rotate3d(0,0,0,0);transform:rotate3d(0,0,0,0);-webkit-transition:background-color .1s ease-out,margin .1s ease-out,height .1s ease-out;transition:background-color .1s ease-out,margin .1s ease-out,height .1s ease-out;background-color:var(--bg-color);opacity:.5;margin:5px 5px 5px 0;border-radius:20px;height:calc(100% - 10px);min-height:2px;display:block}.vb-invisible>.vb-dragger>.vb-dragger-styler{display:none}.vb.vb-scrolling-phantom>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);opacity:.3}.vb>.vb-dragger:hover>.vb-dragger-styler{background-color:var(--bg-color);margin:0;height:100%;opacity:.5}.vb.vb-dragging>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);margin:0;height:100%;opacity:.5}.vb.vb-dragging-phantom>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);opacity:.5}.vb-content::-webkit-scrollbar{display:none;scrollbar-width:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);var script$3 = {
  components: {
    BaseScrollContainer: __vue_component__$2
  },
  props: {
    /* options */
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    /* value */
    value: {
      type: Object,
      default: function _default() {}
    },
    label: {
      type: String
    },
    defaultText: {
      type: String,
      default: 'Select...'
    },
    search: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '16'
    },
    typeItems: {
      default: 'text',
      type: String,
      validator: function validator(value) {
        var values = ['text', 'class'];
        return values.indexOf(value) !== -1;
      }
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      showOptions: false,
      valueSearch: ''
    };
  },
  computed: {
    colorFill: function colorFill() {
      return this.showOptions ? '#C6C6C6' : '#C6C6C6';
    },
    filteredOptions: function filteredOptions() {
      var _this = this;

      return this.valueSearch ? this.options.filter(function (option) {
        return ~option.name.toLowerCase().indexOf(_this.valueSearch.toLowerCase());
      }) : this.options;
    },
    marginTop: function marginTop() {
      return this.search ? 4 : 0;
    }
  },
  methods: {
    selectOption: function selectOption(option) {
      this.showOptions = !this.showOptions;
      this.$emit('input', option);
    },
    onClickOutside: function onClickOutside(e, el) {
      this.showOptions = false;
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.onClickOutside,
      expression: "onClickOutside"
    }],
    staticClass: "l-pth-base-select"
  }, [_vm.label ? _c('base-label', {
    on: {
      "click": function click($event) {
        _vm.showOptions = !_vm.showOptions;
      }
    }
  }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "b-pth-base-select",
    class: {
      '--error': _vm.error
    }
  }, [_c('div', {
    staticClass: "b-pth-base-select__container",
    on: {
      "click": function click($event) {
        _vm.showOptions = !_vm.showOptions;
      }
    }
  }, [_vm.typeItems === 'text' ? _c('span', {
    staticClass: "b-pth-base-select__name"
  }, [_vm._v("\n        " + _vm._s(_vm.value && _vm.value.name ? _vm.value.name : _vm.defaultText) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm.typeItems === 'class' ? _c('span', {
    staticClass: "b-pth-base-select__name"
  }, [_c('i', {
    class: "b-pth-base-select__name-icon b-pth-base-select__name-icon-" + _vm.value.name
  })]) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "b-pth-base-select__arrow"
  }, [_c('svg', {
    attrs: {
      "width": "10",
      "height": "6",
      "viewBox": "0 0 10 6",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0 0.811401L5 5.85239L10 0.811401H0Z",
      "fill": "#777777"
    }
  })])])]), _vm._v(" "), _vm.showOptions ? _c('div', {
    staticClass: "b-pth-base-select__dropdown"
  }, [_vm.search ? _c('div', {
    staticClass: "b-pth-base-select__options-item _fixed"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.valueSearch,
      expression: "valueSearch"
    }],
    domProps: {
      "value": _vm.valueSearch
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.valueSearch = $event.target.value;
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('BaseScrollContainer', {
    staticClass: "b-pth-base-select__scrollbar",
    attrs: {
      "styling": {
        width: '100%',
        height: +_vm.height - +_vm.marginTop + "0px"
      },
      "backgroundBar": "#474747"
    }
  }, [_c('ul', {
    staticClass: "b-pth-base-select__options"
  }, _vm._l(_vm.filteredOptions, function (option, index) {
    return _c('li', {
      key: index,
      staticClass: "b-pth-base-select__options-item",
      class: {
        'selected': _vm.value.name === option.name
      },
      on: {
        "click": function click($event) {
          return _vm.selectOption(option);
        }
      }
    }, [_vm._v("\n            " + _vm._s(option.name) + "\n          ")]);
  }), 0)])], 1) : _vm._e()])], 1);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3ce90245_0", {
    source: ".b-pth-base-select[data-v-3ce90245]{width:100%;height:3.4rem;max-width:50rem;position:relative;display:flex;background-color:#fff;border-bottom:1px solid #dadada;transition:border-color .2s ease;cursor:pointer}.b-pth-base-select.--error[data-v-3ce90245]{border-bottom:1px solid #f50d0a}.b-pth-base-select *[data-v-3ce90245]{user-select:none}.b-pth-base-select__container[data-v-3ce90245]{display:flex;justify-content:space-between;align-items:center;width:100%;padding:.5rem 1.5rem .5rem 0}.b-pth-base-select__name[data-v-3ce90245]{font-size:1.4rem;line-height:1.8rem;color:#777;cursor:pointer;white-space:nowrap;max-width:95%;overflow:hidden;text-overflow:ellipsis}.--error .b-pth-base-select__name[data-v-3ce90245]{color:#f50d0a}.b-pth-base-select__name input[data-v-3ce90245]{border:transparent solid 1px}.b-pth-base-select__arrow[data-v-3ce90245]{width:.8rem;max-width:5%}.b-pth-base-select__icon[data-v-3ce90245]{margin:0;display:block!important}.b-pth-base-select__icon_up[data-v-3ce90245]{transform:rotate(-180deg);transition:all .2s cubic-bezier(1,.5,.8,1);fill:#000}.b-pth-base-select__dropdown[data-v-3ce90245]{transition:all .2s cubic-bezier(1,.5,.8,1);border-top:none;overflow:hidden;background:#fff;position:absolute;top:100%;left:-2rem;right:-1rem;z-index:999;margin:.2rem .1rem;padding:0;box-shadow:0 4px 4px rgba(0,0,0,.25);border-radius:5px}.b-pth-base-select__options[data-v-3ce90245]{margin:0;padding:0;min-height:6rem}.b-pth-base-select__options._mt[data-v-3ce90245]{margin:1rem 0 0}.b-pth-base-select__options-item[data-v-3ce90245]{padding:1.2rem 2.4rem;line-height:1.6rem;font-size:1.4rem;list-style:none;color:#272727;transition:all .2s cubic-bezier(1,.5,.8,1)}.b-pth-base-select__options-item._fixed[data-v-3ce90245]{top:0;right:0;left:0}.b-pth-base-select__options-item._fixed input[data-v-3ce90245]{width:100%}.b-pth-base-select__options-item[data-v-3ce90245]:last-child{border-bottom:none}.b-pth-base-select__options-item.selected[data-v-3ce90245],.b-pth-base-select__options-item[data-v-3ce90245]:hover{background-color:rgba(0,173,182,.05)}.vue-scrollbar__scrollbar-vertical[data-v-3ce90245]{width:.4rem;height:92%;top:.4rem;bottom:.4rem;right:.4rem}.vue-scrollbar__scrollbar-vertical .scrollbar[data-v-3ce90245]{width:.4rem;border-radius:.4rem}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = "data-v-3ce90245";
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);var hourUtils = {
  getAllHours: function getAllHours() {
    return ["00:00:00", "00:10:00", "00:20:00", "00:30:00", "00:40:00", "00:50:00", "01:00:00", "01:10:00", "01:20:00", "01:30:00", "01:40:00", "01:50:00", "02:00:00", "02:10:00", "02:20:00", "02:30:00", "02:40:00", "02:50:00", "03:00:00", "03:10:00", "03:20:00", "03:30:00", "03:40:00", "03:50:00", "04:00:00", "04:10:00", "04:20:00", "04:30:00", "04:40:00", "04:50:00", "05:00:00", "05:10:00", "05:20:00", "05:30:00", "05:40:00", "05:50:00", "06:00:00", "06:10:00", "06:20:00", "06:30:00", "06:40:00", "06:50:00", "07:00:00", "07:10:00", "07:20:00", "07:30:00", "07:40:00", "07:50:00", "08:00:00", "08:10:00", "08:20:00", "08:30:00", "08:40:00", "08:50:00", "09:00:00", "09:10:00", "09:20:00", "09:30:00", "09:40:00", "09:50:00", "10:00:00", "10:10:00", "10:20:00", "10:30:00", "10:40:00", "10:50:00", "11:00:00", "11:10:00", "11:20:00", "11:30:00", "11:40:00", "11:50:00", "12:00:00", "12:10:00", "12:20:00", "12:30:00", "12:40:00", "12:50:00", "13:00:00", "13:10:00", "13:20:00", "13:30:00", "13:40:00", "13:50:00", "14:00:00", "14:10:00", "14:20:00", "14:30:00", "14:40:00", "14:50:00", "15:00:00", "15:10:00", "15:20:00", "15:30:00", "15:40:00", "15:50:00", "16:00:00", "16:10:00", "16:20:00", "16:30:00", "16:40:00", "16:50:00", "17:00:00", "17:10:00", "17:20:00", "17:30:00", "17:40:00", "17:50:00", "18:00:00", "18:10:00", "18:20:00", "18:30:00", "18:40:00", "18:50:00", "19:00:00", "19:10:00", "19:20:00", "19:30:00", "19:40:00", "19:50:00", "20:00:00", "20:10:00", "20:20:00", "20:30:00", "20:40:00", "20:50:00", "21:00:00", "21:10:00", "21:20:00", "21:30:00", "21:40:00", "21:50:00", "22:00:00", "22:10:00", "22:20:00", "22:30:00", "22:40:00", "22:50:00", "23:00:00", "23:10:00", "23:20:00", "23:30:00", "23:40:00", "23:50:00", "24:00:00"];
  },
  getFullHours: function getFullHours() {
    return ["00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "07:00:00", "08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00", "23:00:00"];
  }
};var EVENT = {
  title: 'Новое занятие',
  description: null,
  userId: null,
  materials: []
};
var STUDENTS = {
  '10001': {
    name: 'Иванов Сергей'
  },
  '20002': {
    name: 'Петровский Иван'
  },
  '30003': {
    name: 'Академиков Кот'
  },
  '40004': {
    name: 'Дмитриев Иван'
  }
};
var MATERIALS = {
  '10001': {
    name: 'Present simple. Правила, примеры + тест.'
  },
  '20002': {
    name: 'Present simple таблица.'
  },
  '30003': {
    name: 'Present simple.'
  }
};
var script$4 = {
  name: "kalendar-popup-card-slot",
  components: {
    KalendarXButton: __vue_component__$1,
    BaseSelect: __vue_component__$3
  },
  props: ['popup_information'],
  data: function data() {
    return {
      new_event_data: _objectSpread2({}, EVENT),
      studentSelect: {
        value: {},
        list: Object.keys(STUDENTS).map(function (m) {
          return {
            value: m,
            name: STUDENTS[m].name
          };
        }),
        filteredList: [],
        selected: {}
      },
      materialSelect: {
        value: {},
        list: Object.keys(MATERIALS).map(function (m) {
          return {
            value: m,
            name: MATERIALS[m].name
          };
        }),
        filteredList: [],
        selected: {}
      },
      start_time: this.popup_information.start_time,
      end_time: this.popup_information.end_time,
      addedStudents: [],
      addedMaterials: [],
      isShowMaterialSelect: false,
      start_time_h: 0,
      end_time_h: 0,
      startTimeSelect: {
        list: [],
        filteredList: [],
        selected: {}
      },
      endTimeSelect: {
        list: [],
        filteredList: [],
        selected: {}
      },
      day_events: []
    };
  },
  computed: {
    hourRange: function hourRange() {
      return [this.$kalendar.options.day_starts_at, this.$kalendar.options.day_ends_at];
    },
    enabledSave: function enabledSave() {
      return this.addedStudents.length > 0 && !this.errorSelectedTime;
    },
    errorSelectedTime: function errorSelectedTime() {
      return this.end_time_h - this.start_time_h < 0;
    }
  },
  created: function created() {
    var _cloneObject = cloneObject(this.popup_information),
        start_time = _cloneObject.start_time,
        end_time = _cloneObject.end_time,
        data = _cloneObject.data,
        day_events = _cloneObject.day_events;

    this.start_time = start_time;
    this.start_time_h = this.getNumHour(this.start_time);
    this.end_time = end_time;
    this.end_time_h = this.getNumHour(this.end_time);
    this.day_events = day_events;
  },
  mounted: function mounted() {
    this.filterStudents();
    this.filterMaterials();
    this.filterTimes();
    this.startTimeSelect.selected = this.setTime('start');
    this.endTimeSelect.selected = this.setTime('end');
  },
  methods: {
    filterTimes: function filterTimes() {
      this.filterTime('start');
      this.filterTime('end');
    },
    addEvent: function addEvent() {
      var payload = {
        data: {
          title: this.new_event_data.title,
          description: this.new_event_data.description,
          students: this.addedStudents,
          materials: this.addedMaterials
        },
        from: this.start_time,
        to: this.end_time
      };
      this.clearFormData();
      this.$kalendar.addNewEvent(payload);
      this.$kalendar.closePopups();
    },
    clearFormData: function clearFormData() {
      this.new_event_data = _objectSpread2({}, EVENT);
    },
    close: function close() {
      this.$emit('close');
    },
    addStudent: function addStudent(value) {
      this.addedStudents.push(value);
      this.studentSelect.selected = {};
      this.filterStudents();
    },
    removeStudent: function removeStudent(index) {
      this.addedStudents.splice(index, 1);
      this.filterStudents();
    },
    filterStudents: function filterStudents() {
      var _this = this;

      this.studentSelect.filteredList = this.studentSelect.list.filter(function (s) {
        if (_this.addedStudents.length === 0) {
          return true;
        }

        return _this.addedStudents.find(function (addedS) {
          return addedS.value === s.value;
        }) === undefined;
      });
    },
    formatDay: function formatDay(date) {
      var isoDate = new Date(date);
      var dayName = getFormattedWeekDayTime(isoDate).split(',')[0];
      var dayMonth = getFormattedMonth(isoDate);
      return "".concat(dayName, ", ").concat(dayMonth);
    },
    showMaterialSelect: function showMaterialSelect() {
      this.isShowMaterialSelect = true;
    },
    hideMaterialSelect: function hideMaterialSelect() {
      this.isShowMaterialSelect = false;
    },
    addMaterial: function addMaterial(value) {
      this.addedMaterials.push(value);
      this.materialSelect.selected = {};
      this.filterMaterials();
      this.hideMaterialSelect();
    },
    filterMaterials: function filterMaterials() {
      var _this2 = this;

      this.materialSelect.filteredList = this.materialSelect.list.filter(function (s) {
        if (_this2.addedMaterials.length === 0) {
          return true;
        }

        return _this2.addedMaterials.find(function (addedS) {
          return addedS.value === s.value;
        }) === undefined;
      });
    },
    removeMaterial: function removeMaterial(index) {
      this.addedMaterials.splice(index, 1);
      this.filterMaterials();
    },
    changeTime: function changeTime(value, timeName) {
      var dataTime = value.split(':');
      var date = new Date(this["".concat(timeName, "_time")]);
      var newDate = new Date(date.setHours(dataTime[0], dataTime[1]));
      this["".concat(timeName, "_time")] = getLocaleTime(newDate.toISOString()); // this.startTime or this.endTime

      this["".concat(timeName, "_time_h")] = +dataTime[0] * 100;
      this.filterTimes();

      if (this.start_time_h > this.end_time_h) {
        // если при переключении выбрали время начала больше конца
        this.endTimeSelect.selected = this.endTimeSelect.filteredList[0];
        this.end_time_h = +this.endTimeSelect.selected.value.replace(':', '');
        this.changeTime(this.endTimeSelect.selected.value, 'end');
      }
    },
    filterTime: function filterTime(prop) {
      var _this3 = this;

      var maxStartTime = this.hourRange[0] * 100;
      var maxEndTime = this.hourRange[1] * 100;
      Object.keys(this.day_events).forEach(function (key) {
        var eventStartTime = +_this3.getNumHour(_this3.day_events[key][0].start.value); // // 2021-10-22T18:00:00+03:00 => 1800

        var eventEndTime = +_this3.getNumHour(_this3.day_events[key][0].end.value); //

        if (eventStartTime <= _this3.start_time_h && eventEndTime <= _this3.start_time_h) {
          if (eventEndTime > maxStartTime) {
            maxStartTime = eventEndTime;
          }
        }

        if (eventStartTime >= _this3.end_time_h && eventEndTime >= _this3.end_time_h) {
          if (eventStartTime < maxEndTime) {
            maxEndTime = eventStartTime;
          }
        }
      });
      var all_hours = hourUtils.getAllHours().filter(function (h) {
        var numHour = +h.slice(0, 2); // берем время в виде 10

        var numHour10 = +h.slice(0, 5).replace(':', ''); // берем время в виде 10:30 и переводим в число 1030

        if (numHour < _this3.hourRange[0] || numHour > _this3.hourRange[1]) {
          // убираем часы не попадающие в режим работы day_starts_at и day_ends_at календаря
          return false;
        }

        if (prop === 'start' && numHour10 === _this3.getNumHour(_this3.end_time)) {
          return false;
        }

        if (prop === 'end' && numHour10 <= _this3.getNumHour(_this3.start_time)) {
          return false;
        }

        return (h.indexOf(':00:') !== -1 || h.indexOf(':30:') !== -1) && numHour10 >= maxStartTime && numHour10 <= maxEndTime; // выбираем только кратные 30мин
      });
      this["".concat(prop, "TimeSelect")].filteredList = all_hours.map(function (h) {
        return {
          name: h.slice(0, 5),
          value: h.slice(0, 5)
        };
      });
    },
    setTime: function setTime(prop) {
      var time = this["".concat(prop, "_time")].slice(11, 16);
      return {
        name: time,
        value: time
      };
    },
    getNumHour: function getNumHour(time) {
      return +time.slice(11, 16).replace(':', ''); // 2021-10-22T18:00:00+03:00 => 1800
    }
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "created-card"
  }, [_c('span', {
    staticClass: "created-card__x",
    on: {
      "click": _vm.close
    }
  }, [_c('kalendar-x-button')], 1), _vm._v(" "), _c('div', {
    staticClass: "created-card__header"
  }, [_c('span', {
    staticClass: "created-card__header-icon"
  }, [_c('svg', {
    attrs: {
      "width": "20",
      "height": "21",
      "viewBox": "0 0 20 21",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('rect', {
    attrs: {
      "x": "1.66699",
      "y": "3.5",
      "width": "16.6667",
      "height": "15.8333",
      "rx": "3",
      "stroke": "#6E7191",
      "stroke-width": "2"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M5.83301 1.8335V3.50016",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M14.167 1.8335V3.50016",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M1.66699 7.6665H18.3337",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M6.25 11.8335H7.91667",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M12.083 11.8335H13.7497",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M6.25 15.1665H7.91667",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M12.083 15.1665H13.7497",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  })])]), _vm._v(" "), _c('span', {
    staticClass: "created-card__header-text"
  }, [_vm._v("\n      Запланировать занятие\n    ")])]), _vm._v(" "), _c('div', [_vm.addedStudents.length > 0 ? [_c('ul', {
    staticClass: "b-added-students"
  }, _vm._l(_vm.addedStudents, function (student, index) {
    return _c('li', {
      key: student.value,
      staticClass: "b-added-students__item"
    }, [_c('span', {
      staticClass: "b-added-students__item-x",
      on: {
        "click": function click($event) {
          return _vm.removeStudent(index);
        }
      }
    }, [_c('svg', {
      attrs: {
        "width": "10",
        "height": "10",
        "viewBox": "0 0 10 10",
        "fill": "none",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9.08268 1.73925L8.26018 0.916748L4.99935 4.17758L1.73852 0.916748L0.916016 1.73925L4.17685 5.00008L0.916016 8.26092L1.73852 9.08342L4.99935 5.82258L8.26018 9.08342L9.08268 8.26092L5.82185 5.00008L9.08268 1.73925Z",
        "fill": "#777777"
      }
    })])]), _vm._v("\n          " + _vm._s(student.name) + "\n        ")]);
  }), 0), _vm._v(" "), _vm._m(0)] : _c('base-select', {
    attrs: {
      "defaultText": "Выбрать студента...",
      "options": _vm.studentSelect.filteredList,
      "value": _vm.studentSelect.value,
      "search": true
    },
    on: {
      "input": function input($event) {
        return _vm.addStudent(_vm.studentSelect.selected);
      }
    },
    model: {
      value: _vm.studentSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.studentSelect, "selected", $$v);
      },
      expression: "studentSelect.selected"
    }
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "b-date-time"
  }, [_c('span', {
    staticClass: "b-date-time__date"
  }, [_vm._v("\n      " + _vm._s(_vm.formatDay(_vm.start_time)) + "\n    ")]), _vm._v(" "), _c('base-select', {
    attrs: {
      "defaultText": "Начало",
      "options": _vm.startTimeSelect.filteredList
    },
    on: {
      "input": function input() {
        return _vm.changeTime(_vm.startTimeSelect.selected.value, 'start');
      }
    },
    model: {
      value: _vm.startTimeSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.startTimeSelect, "selected", $$v);
      },
      expression: "startTimeSelect.selected"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "b-delimiter"
  }), _vm._v(" "), _c('base-select', {
    attrs: {
      "defaultText": "Конец",
      "options": _vm.endTimeSelect.filteredList,
      "error": _vm.errorSelectedTime
    },
    on: {
      "input": function input() {
        return _vm.changeTime(_vm.endTimeSelect.selected.value, 'end');
      }
    },
    model: {
      value: _vm.endTimeSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.endTimeSelect, "selected", $$v);
      },
      expression: "endTimeSelect.selected"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "b-materials"
  }, [!_vm.isShowMaterialSelect ? _c('button', {
    staticClass: "b-materials__add-button",
    on: {
      "click": _vm.showMaterialSelect
    }
  }, [_c('svg', {
    attrs: {
      "width": "17",
      "height": "17",
      "viewBox": "0 0 17 17",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M12.1667 9.66667H13.8333V12.1667H16.3333V13.8333H13.8333V16.3333H12.1667V13.8333H9.66667V12.1667H12.1667V9.66667ZM8 12.1667V10.5H3.83333V12.1667H8ZM12.1667 7.16667H3.83333V8.83333H10.2417C8.89167 9.725 8 11.2583 8 13C8 13.9083 8.24167 14.7667 8.66667 15.5H2.16667C1.24167 15.5 0.5 14.75 0.5 13.8333V2.16667C0.5 1.24167 1.24167 0.5 2.16667 0.5H13.8333C14.2754 0.5 14.6993 0.675595 15.0118 0.988155C15.3244 1.30072 15.5 1.72464 15.5 2.16667V8.66667C14.7667 8.24167 13.9083 8 13 8L12.1667 8.06667V7.16667ZM12.1667 5.5V3.83333H3.83333V5.5H12.1667Z",
      "fill": "#2089FF"
    }
  })]), _vm._v("\n      Добавить материалы к уроку\n    ")]) : _c('base-select', {
    attrs: {
      "defaultText": "Выбрать материал к уроку...",
      "options": _vm.materialSelect.filteredList,
      "value": _vm.materialSelect.value,
      "search": true
    },
    on: {
      "input": function input($event) {
        return _vm.addMaterial(_vm.materialSelect.selected);
      }
    },
    model: {
      value: _vm.materialSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.materialSelect, "selected", $$v);
      },
      expression: "materialSelect.selected"
    }
  }), _vm._v(" "), _c('ul', {
    staticClass: "b-materials__list"
  }, _vm._l(_vm.addedMaterials, function (student, index) {
    return _c('li', {
      key: student.value,
      staticClass: "b-materials__list-item"
    }, [_c('span', {
      staticClass: "b-materials__list-item-x",
      on: {
        "click": function click($event) {
          return _vm.removeMaterial(index);
        }
      }
    }, [_c('svg', {
      attrs: {
        "width": "10",
        "height": "10",
        "viewBox": "0 0 10 10",
        "fill": "none",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9.08268 1.73925L8.26018 0.916748L4.99935 4.17758L1.73852 0.916748L0.916016 1.73925L4.17685 5.00008L0.916016 8.26092L1.73852 9.08342L4.99935 5.82258L8.26018 9.08342L9.08268 8.26092L5.82185 5.00008L9.08268 1.73925Z",
        "fill": "#777777"
      }
    })])]), _vm._v("\n        " + _vm._s(student.name) + "\n      ")]);
  }), 0)], 1), _vm._v(" "), _vm.enabledSave ? _c('div', {
    staticClass: "b-buttons"
  }, [_c('button', {
    staticClass: "main-button",
    on: {
      "click": function click($event) {
        return _vm.addEvent(_vm.popup_information);
      }
    }
  }, [_vm._v("\n      Сохранить\n    ")])]) : _vm._e()]);
};

var __vue_staticRenderFns__$4 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "b-open-lesson"
  }, [_c('button', [_vm._v("Открыть урок")]), _vm._v(" https://4smart.pro/4fx-dko-dl5\n      ")]);
}];
/* style */

var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-f45af9a6_0", {
    source: ".created-card{display:flex;flex-direction:column;padding:20px 20px 10px 30px;position:relative}.created-card__x{position:absolute;top:0;right:0}.created-card__header{display:flex;align-items:center;margin:0 0 20px 0}.created-card__header-icon{display:inline-block;width:20px;height:20px;margin:0 10px 0 0}.created-card__header-text{font-size:16px;font-weight:600;color:#0967d1;text-transform:uppercase}.b-added-students{display:flex;flex-wrap:wrap;margin:10px 0 0 10px!important}.b-added-students__item{border-right:none!important;margin:0 20px 0 0}.b-added-students__item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}.b-open-lesson{width:100%;color:#777;display:flex;justify-content:center;align-items:center;margin:10px}.b-open-lesson>button{color:#2089ff;cursor:pointer;border:none;background:0 0}.b-buttons{width:100%;display:flex;justify-content:center;margin:10px 0}.b-date-time{display:flex;align-items:center;flex-wrap:nowrap;padding:20px 0}.b-date-time__date{display:inline-block;margin:0 30px 0 0}.b-date-time__date:first-letter{text-transform:uppercase}.b-delimiter{width:50px;display:flex;justify-content:center;align-items:center}.b-delimiter:before{content:\"\";display:inline-block;border-bottom:1px solid #dadada;width:10px}.b-materials__add-button{color:#2089ff;display:flex;align-items:center;background:0 0;border:none;cursor:pointer}.b-materials__add-button>svg{margin:0 9px 0 0}.b-materials__list{display:flex;flex-direction:column;margin:10px 0 0 10px!important}.b-materials__list-item{border-right:none!important;margin:0 20px 0 0}.b-materials__list-item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);//
var STUDENTS$1 = {
  '10001': {
    name: 'Иванов Сергей'
  },
  '20002': {
    name: 'Петровский Иван'
  },
  '30003': {
    name: 'Академиков Кот'
  },
  '40004': {
    name: 'Дмитриев Иван'
  }
};
var MATERIALS$1 = {
  '10001': {
    name: 'Present simple. Правила, примеры + тест.'
  },
  '20002': {
    name: 'Present simple таблица.'
  },
  '30003': {
    name: 'Present simple.'
  }
};
var script$5 = {
  name: "kalendar-popup-edit-form",
  components: {
    KalendarXButton: __vue_component__$1,
    BaseSelect: __vue_component__$3
  },
  props: ['popup_information'],
  data: function data() {
    return {
      studentSelect: {
        list: Object.keys(STUDENTS$1).map(function (m) {
          return {
            value: m,
            name: STUDENTS$1[m].name
          };
        }),
        filteredList: [],
        selected: {}
      },
      materialSelect: {
        list: Object.keys(MATERIALS$1).map(function (m) {
          return {
            value: m,
            name: MATERIALS$1[m].name
          };
        }),
        filteredList: [],
        selected: {}
      },
      information: null,
      start_time: null,
      end_time: null,
      addedStudents: null,
      addedMaterials: null,
      isShowMaterialSelect: false,
      start_time_h: 0,
      end_time_h: 0,
      isEdit: false,
      startTimeSelect: {
        list: [],
        filteredList: [],
        selected: {}
      },
      endTimeSelect: {
        list: [],
        filteredList: [],
        selected: {}
      },
      day_events: []
    };
  },
  computed: {
    hourRange: function hourRange() {
      return [this.$kalendar.options.day_starts_at, this.$kalendar.options.day_ends_at - 1];
    },
    enabledSave: function enabledSave() {
      return this.addedStudents.length > 0 && !this.errorSelectedTime;
    },
    errorSelectedTime: function errorSelectedTime() {
      return this.end_time_h - this.start_time_h < 0;
    },
    beforeTime: function beforeTime() {
      var rt = getTimeRemaining(this.start_time);

      if (rt.days === 0 && rt.minutes >= 0 && rt.hours < 8 && rt.hours >= 0) {
        return [rt.hours, rt.minutes];
      }

      return [];
    }
  },
  created: function created() {
    var _cloneObject = cloneObject(this.popup_information),
        start_time = _cloneObject.start_time,
        end_time = _cloneObject.end_time,
        data = _cloneObject.data,
        day_events = _cloneObject.day_events;

    this.start_time = start_time;
    this.start_time_h = this.getNumHour(this.start_time);
    this.end_time = end_time;
    this.end_time_h = this.getNumHour(this.end_time);
    this.addedStudents = data.students;
    this.addedMaterials = data.materials;
    this.day_events = day_events;
  },
  mounted: function mounted() {
    this.filterStudents();
    this.filterMaterials();
    this.filterTimes();
    this.startTimeSelect.selected = this.setTime('start');
    this.endTimeSelect.selected = this.setTime('end');
  },
  methods: {
    filterTimes: function filterTimes() {
      this.filterTime('start');
      this.filterTime('end');
    },
    editEvent: function editEvent() {
      this.start_time = addTimezoneInfo(this.start_time);
      this.end_time = addTimezoneInfo(this.end_time);
      var payload = {
        data: {
          students: this.addedStudents,
          materials: this.addedMaterials
        },
        from: this.start_time,
        to: this.end_time,
        id: this.popup_information.id
      };
      this.$kalendar.saveEvent(payload);
      this.$kalendar.closePopups();
      this.$kalendar.toggleEditing();
      this.$kalendar.toggleEditPopup(false);
      this.isEdit = false;
    },
    close: function close() {
      this.$kalendar.toggleEditPopup(false);
    },
    addStudent: function addStudent(value) {
      this.addedStudents.push(value);
      this.studentSelect.selected = {};
      this.filterStudents();
    },
    removeStudent: function removeStudent(index) {
      this.addedStudents.splice(index, 1);
      this.filterStudents();
    },
    filterStudents: function filterStudents() {
      var _this = this;

      this.studentSelect.filteredList = this.studentSelect.list.filter(function (s) {
        if (_this.addedStudents.length === 0) {
          return true;
        }

        return _this.addedStudents.find(function (addedS) {
          return addedS.value === s.value;
        }) === undefined;
      });
    },
    formatDay: function formatDay(date) {
      var isoDate = new Date(date);
      var dayName = getFormattedWeekDayTime(isoDate).split(',')[0];
      var dayMonth = getFormattedMonth(isoDate);
      return "".concat(dayName, ", ").concat(dayMonth);
    },
    changeTime: function changeTime(value, timeName) {
      var dataTime = value.split(':');
      var date = new Date(this["".concat(timeName, "_time")]);
      var newDate = new Date(date.setHours(dataTime[0], dataTime[1]));
      this["".concat(timeName, "_time")] = getLocaleTime(newDate.toISOString()); // this.startTime or this.endTime

      this["".concat(timeName, "_time_h")] = +dataTime[0] * 100;
      this.filterTimes();

      if (this.start_time_h > this.end_time_h) {
        // если при переключении выбрали время начала больше конца
        this.endTimeSelect.selected = this.endTimeSelect.filteredList[0];
        this.end_time_h = +this.endTimeSelect.selected.value.replace(':', '');
        this.changeTime(this.endTimeSelect.selected.value, 'end');
      }
    },
    showMaterialSelect: function showMaterialSelect() {
      this.isShowMaterialSelect = true;
    },
    hideMaterialSelect: function hideMaterialSelect() {
      this.isShowMaterialSelect = false;
    },
    addMaterial: function addMaterial(value) {
      this.addedMaterials.push(value);
      this.materialSelect.selected = {};
      this.filterMaterials();
      this.hideMaterialSelect();
    },
    filterMaterials: function filterMaterials() {
      var _this2 = this;

      this.materialSelect.filteredList = this.materialSelect.list.filter(function (s) {
        if (_this2.addedMaterials.length === 0) {
          return true;
        }

        return _this2.addedMaterials.find(function (addedS) {
          return addedS.value === s.value;
        }) === undefined;
      });
    },
    removeMaterial: function removeMaterial(index) {
      this.addedMaterials.splice(index, 1);
      this.filterMaterials();
    },
    edit: function edit() {
      this.isEdit = !this.isEdit;
    },
    deleteEvent: function deleteEvent() {
      this.$emit('removeEvent');
    },
    mail: function mail() {
      alert('Тут открываем отправку E-mail');
    },
    formatDate: function formatDate(date) {
      var isoDate = new Date(date);
      return getFormattedTime(isoDate);
    },
    filterTime: function filterTime(prop) {
      var _this3 = this;

      var maxStartTime = this.hourRange[0] * 100;
      var maxEndTime = this.hourRange[1] * 100;
      Object.keys(this.day_events).forEach(function (key) {
        var eventStartTime = +_this3.getNumHour(_this3.day_events[key][0].start.value); // // 2021-10-22T18:00:00+03:00 => 1800

        var eventEndTime = +_this3.getNumHour(_this3.day_events[key][0].end.value); //

        if (eventStartTime <= _this3.start_time_h && eventEndTime <= _this3.start_time_h) {
          if (eventEndTime > maxStartTime) {
            maxStartTime = eventEndTime;
          }
        }

        if (eventStartTime >= _this3.end_time_h && eventEndTime >= _this3.end_time_h) {
          if (eventStartTime < maxEndTime) {
            maxEndTime = eventStartTime;
          }
        }
      });
      var all_hours = hourUtils.getAllHours().filter(function (h) {
        var numHour = +h.slice(0, 2); // берем время в виде 10

        var numHour10 = +h.slice(0, 5).replace(':', ''); // берем время в виде 10:30 и переводим в число 1030

        if (numHour < _this3.hourRange[0] || numHour > _this3.hourRange[1]) {
          // убираем часы не попадающие в режим работы day_starts_at и day_ends_at календаря
          return false;
        }

        if (prop === 'start' && numHour10 === _this3.getNumHour(_this3.end_time)) {
          return false;
        }

        if (prop === 'end' && numHour10 <= _this3.getNumHour(_this3.start_time)) {
          return false;
        }

        return (h.indexOf(':00:') !== -1 || h.indexOf(':30:') !== -1) && numHour10 >= maxStartTime && numHour10 <= maxEndTime; // выбираем только кратные 30мин
      });
      this["".concat(prop, "TimeSelect")].filteredList = all_hours.map(function (h) {
        return {
          name: h.slice(0, 5),
          value: h.slice(0, 5)
        };
      });
    },
    setTime: function setTime(prop) {
      var time = this["".concat(prop, "_time")].slice(11, 16);
      return {
        name: time,
        value: time
      };
    },
    getNumHour: function getNumHour(time) {
      return +time.slice(11, 16).replace(':', ''); // 2021-10-22T18:00:00+03:00 => 1800
    }
  }
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "b-edit-card"
  }, [_c('div', {
    staticClass: "b-edit-card__header"
  }, [_c('span', {
    staticClass: "b-edit-card__header-icon"
  }, [_c('span', {
    on: {
      "click": _vm.edit
    }
  }, [_c('svg', {
    attrs: {
      "width": "20",
      "height": "20",
      "viewBox": "0 0 20 20",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M3.11837 13.1284L14.7162 1.53058C14.735 1.52491 14.7556 1.51901 14.7777 1.51302C14.9366 1.46997 15.1659 1.42516 15.4349 1.42145C15.9531 1.4143 16.6406 1.55535 17.3159 2.23063C17.9912 2.90592 18.1323 3.59346 18.1251 4.11164C18.1214 4.38069 18.0766 4.60996 18.0335 4.76889C18.0276 4.79099 18.0217 4.81153 18.016 4.83041L6.4182 16.4282L2.6684 16.8782L3.11837 13.1284Z",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M11.8896 2.94287L16.3792 7.43244",
      "stroke": "#6E7191",
      "stroke-width": "2"
    }
  })])])]), _vm._v(" "), _c('span', {
    staticClass: "b-edit-card__header-icon"
  }, [_c('span', {
    on: {
      "click": _vm.deleteEvent
    }
  }, [_c('svg', {
    attrs: {
      "width": "22",
      "height": "22",
      "viewBox": "0 0 22 22",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M3.5 5.1665H18.5L17.9875 15.4162C17.8545 18.0772 15.6581 20.1665 12.9938 20.1665H9.00625C6.34188 20.1665 4.14554 18.0772 4.01248 15.4162L3.5 5.1665Z",
      "stroke": "#6E7191",
      "stroke-width": "2"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M6.83301 5.1665V4.83317C6.83301 3.17632 8.17615 1.83317 9.83301 1.83317H12.1663C13.8232 1.83317 15.1663 3.17632 15.1663 4.83317V5.1665",
      "stroke": "#6E7191",
      "stroke-width": "2"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M1.83301 5.1665H20.1663",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M13.5 10.1665V14.3332",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M8.5 10.1665V14.3332",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round"
    }
  })])])]), _vm._v(" "), _c('span', {
    staticClass: "b-edit-card__header-icon"
  }, [_c('span', {
    on: {
      "click": _vm.mail
    }
  }, [_c('svg', {
    attrs: {
      "width": "22",
      "height": "20",
      "viewBox": "0 0 22 20",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1 5.3335C1 4.22893 1.89543 3.3335 3 3.3335H19C20.1046 3.3335 21 4.22893 21 5.3335V15.5002C21 16.6047 20.1046 17.5002 19 17.5002H3C1.89543 17.5002 1 16.6047 1 15.5002V5.3335Z",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linejoin": "round"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M2.42131 4.63636C1.91709 4.17416 2.24409 3.3335 2.9281 3.3335H19.0719C19.7559 3.3335 20.0829 4.17416 19.5787 4.63636L13.0272 10.6419C11.8802 11.6933 10.1198 11.6933 8.97283 10.6419L2.42131 4.63636Z",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linejoin": "round"
    }
  })])])]), _vm._v(" "), _c('span', {
    staticClass: "b-edit-card__header-icon"
  }, [_c('span', [_c('svg', {
    attrs: {
      "width": "20",
      "height": "20",
      "viewBox": "0 0 20 20",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('ellipse', {
    attrs: {
      "cx": "9.99967",
      "cy": "5.83317",
      "rx": "1.66667",
      "ry": "1.66667",
      "fill": "#6E7191"
    }
  }), _vm._v(" "), _c('ellipse', {
    attrs: {
      "cx": "9.99967",
      "cy": "14.1667",
      "rx": "1.66667",
      "ry": "1.66667",
      "fill": "#6E7191"
    }
  })])])]), _vm._v(" "), _c('span', {
    staticClass: "b-edit-card__x",
    on: {
      "click": _vm.close
    }
  }, [_c('kalendar-x-button')], 1)]), _vm._v(" "), _vm.isEdit ? _c('div', [_c('div', [_vm.addedStudents.length > 0 ? [_c('ul', {
    staticClass: "b-added-students"
  }, _vm._l(_vm.addedStudents, function (student, index) {
    return _c('li', {
      key: student.value,
      staticClass: "b-added-students__item"
    }, [_c('span', {
      staticClass: "b-added-students__item-x",
      on: {
        "click": function click($event) {
          return _vm.removeStudent(index);
        }
      }
    }, [_c('svg', {
      attrs: {
        "width": "10",
        "height": "10",
        "viewBox": "0 0 10 10",
        "fill": "none",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9.08268 1.73925L8.26018 0.916748L4.99935 4.17758L1.73852 0.916748L0.916016 1.73925L4.17685 5.00008L0.916016 8.26092L1.73852 9.08342L4.99935 5.82258L8.26018 9.08342L9.08268 8.26092L5.82185 5.00008L9.08268 1.73925Z",
        "fill": "#777777"
      }
    })])]), _vm._v("\n              " + _vm._s(student.name) + "\n            ")]);
  }), 0), _vm._v(" "), _vm._m(0)] : _c('base-select', {
    attrs: {
      "defaultText": "Выбрать студента...",
      "options": _vm.studentSelect.filteredList,
      "search": true
    },
    on: {
      "input": function input($event) {
        return _vm.addStudent(_vm.studentSelect.selected);
      }
    },
    model: {
      value: _vm.studentSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.studentSelect, "selected", $$v);
      },
      expression: "studentSelect.selected"
    }
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "b-date-time"
  }, [_c('span', {
    staticClass: "b-date-time__date"
  }, [_vm._v("\n          " + _vm._s(_vm.formatDay(_vm.start_time)) + "\n        ")]), _vm._v(" "), _c('base-select', {
    attrs: {
      "defaultText": "Начало",
      "options": _vm.startTimeSelect.filteredList
    },
    on: {
      "input": function input() {
        return _vm.changeTime(_vm.startTimeSelect.selected.value, 'start');
      }
    },
    model: {
      value: _vm.startTimeSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.startTimeSelect, "selected", $$v);
      },
      expression: "startTimeSelect.selected"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "b-delimiter"
  }), _vm._v(" "), _c('base-select', {
    attrs: {
      "defaultText": "Конец",
      "options": _vm.endTimeSelect.filteredList,
      "error": _vm.errorSelectedTime
    },
    on: {
      "input": function input() {
        return _vm.changeTime(_vm.endTimeSelect.selected.value, 'end');
      }
    },
    model: {
      value: _vm.endTimeSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.endTimeSelect, "selected", $$v);
      },
      expression: "endTimeSelect.selected"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "b-materials"
  }, [!_vm.isShowMaterialSelect ? _c('button', {
    staticClass: "b-materials__add-button",
    on: {
      "click": _vm.showMaterialSelect
    }
  }, [_c('svg', {
    attrs: {
      "width": "17",
      "height": "17",
      "viewBox": "0 0 17 17",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M12.1667 9.66667H13.8333V12.1667H16.3333V13.8333H13.8333V16.3333H12.1667V13.8333H9.66667V12.1667H12.1667V9.66667ZM8 12.1667V10.5H3.83333V12.1667H8ZM12.1667 7.16667H3.83333V8.83333H10.2417C8.89167 9.725 8 11.2583 8 13C8 13.9083 8.24167 14.7667 8.66667 15.5H2.16667C1.24167 15.5 0.5 14.75 0.5 13.8333V2.16667C0.5 1.24167 1.24167 0.5 2.16667 0.5H13.8333C14.2754 0.5 14.6993 0.675595 15.0118 0.988155C15.3244 1.30072 15.5 1.72464 15.5 2.16667V8.66667C14.7667 8.24167 13.9083 8 13 8L12.1667 8.06667V7.16667ZM12.1667 5.5V3.83333H3.83333V5.5H12.1667Z",
      "fill": "#2089FF"
    }
  })]), _vm._v("\n          Добавить материалы к уроку\n        ")]) : _c('base-select', {
    attrs: {
      "defaultText": "Выбрать материал к уроку...",
      "options": _vm.materialSelect.filteredList,
      "search": true
    },
    on: {
      "input": function input($event) {
        return _vm.addMaterial(_vm.materialSelect.selected);
      }
    },
    model: {
      value: _vm.materialSelect.selected,
      callback: function callback($$v) {
        _vm.$set(_vm.materialSelect, "selected", $$v);
      },
      expression: "materialSelect.selected"
    }
  }), _vm._v(" "), _c('ul', {
    staticClass: "b-materials__list"
  }, _vm._l(_vm.addedMaterials, function (student, index) {
    return _c('li', {
      key: student.value,
      staticClass: "b-materials__list-item"
    }, [_c('span', {
      staticClass: "b-materials__list-item-x",
      on: {
        "click": function click($event) {
          return _vm.removeMaterial(index);
        }
      }
    }, [_c('svg', {
      attrs: {
        "width": "10",
        "height": "10",
        "viewBox": "0 0 10 10",
        "fill": "none",
        "xmlns": "http://www.w3.org/2000/svg"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9.08268 1.73925L8.26018 0.916748L4.99935 4.17758L1.73852 0.916748L0.916016 1.73925L4.17685 5.00008L0.916016 8.26092L1.73852 9.08342L4.99935 5.82258L8.26018 9.08342L9.08268 8.26092L5.82185 5.00008L9.08268 1.73925Z",
        "fill": "#777777"
      }
    })])]), _vm._v("\n            " + _vm._s(student.name) + "\n          ")]);
  }), 0)], 1), _vm._v(" "), _vm.enabledSave ? _c('div', {
    staticClass: "b-buttons"
  }, [_c('button', {
    staticClass: "main-button",
    on: {
      "click": _vm.editEvent
    }
  }, [_vm._v("\n          Сохранить\n        ")])]) : _vm._e()]) : _c('div', [_vm.addedStudents.length > 0 ? [_c('ul', {
    staticClass: "b-added-edit-students"
  }, _vm._l(_vm.addedStudents, function (student) {
    return _c('li', {
      key: student.value,
      staticClass: "b-added-edit-students__item"
    }, [_c('span'), _vm._v(_vm._s(student.name) + "\n          ")]);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "b-date-time"
  }, [_c('span', {
    staticClass: "b-date-time__date"
  }, [_vm._v("\n            " + _vm._s(_vm.formatDay(_vm.start_time)) + ",\n            " + _vm._s(_vm.formatDate(_vm.start_time)) + "\n            -\n\t\t\t      " + _vm._s(_vm.formatDate(_vm.end_time)) + "\n          ")])]), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm.beforeTime[0] > 0 || _vm.beforeTime[1] > 0 ? _c('div', {
    staticClass: "b-before-time"
  }, [_c('svg', {
    attrs: {
      "width": "22",
      "height": "21",
      "viewBox": "0 0 22 21",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M17.1111 7.51191C17.1111 5.96162 16.4673 4.47481 15.3212 3.37859C14.1752 2.28236 12.6208 1.6665 11 1.6665C9.37923 1.6665 7.82485 2.28236 6.67879 3.37859C5.53274 4.47481 4.88889 5.96162 4.88889 7.51191C4.88889 12.267 2.99823 14.6538 1.85347 15.6632C1.65568 15.8376 1.79337 16.28 2.05706 16.28H7.2351C7.35207 16.28 7.45419 16.3608 7.48974 16.4723C7.6956 17.1176 8.54266 19.1665 11 19.1665C13.4573 19.1665 14.3044 17.1176 14.5103 16.4723C14.5458 16.3608 14.6479 16.28 14.7649 16.28H19.9429C20.2066 16.28 20.3443 15.8376 20.1465 15.6632C19.0018 14.6538 17.1111 12.267 17.1111 7.51191Z",
      "stroke": "#6E7191",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  })]), _vm._v(" "), _vm.beforeTime[0] > 0 ? [_vm._v("\n            " + _vm._s(_vm.beforeTime[0]) + " час.\n          ")] : _vm._e(), _vm._v(" "), _vm.beforeTime[1] > 0 ? [_vm._v("\n            " + _vm._s(_vm.beforeTime[1]) + " мин.\n          ")] : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c('ul', {
    staticClass: "b-materials__list"
  }, _vm._l(_vm.addedMaterials, function (student) {
    return _c('li', {
      key: student.value,
      staticClass: "b-materials__list-item"
    }, [_vm._v("\n            " + _vm._s(student.name) + "\n          ")]);
  }), 0)] : _vm._e()], 2)]);
};

var __vue_staticRenderFns__$5 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "b-open-lesson"
  }, [_c('button', [_vm._v("Открыть урок")]), _vm._v(" https://4smart.pro/4fx-dko-dl5\n          ")]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "b-open-edit-lesson"
  }, [_c('button', [_vm._v("Открыть урок")]), _vm._v(" https://4smart.pro/4fx-dko-dl5\n        ")]);
}];
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-566dbdeb_0", {
    source: ".b-edit-card{display:flex;flex-direction:column;padding:4px 10px 10px 15px;position:relative}.b-edit-card__x{position:relative;right:-10px}.b-edit-card__header{display:flex;justify-content:flex-end;align-items:center;margin:0 0 20px 0}.b-edit-card__header-icon{display:flex;justify-content:center;align-items:center;width:20px;height:20px;margin:0 10px}.b-edit-card__header-icon>span{cursor:pointer}.b-edit-card__header-text{font-size:16px;font-weight:600;color:#0967d1;text-transform:uppercase}.b-added-edit-students{display:flex;flex-wrap:wrap;margin:10px 0 0 0!important}.b-added-edit-students__item{border-right:none!important;margin:0 20px 0 0;display:flex;align-items:center;font-size:16px;color:#0967d1}.b-added-edit-students__item>span{width:20px;height:20px;display:inline-block;margin:0 10px 0 0;background:#0967d1;border-radius:3px}.b-added-students{display:flex;flex-wrap:wrap;margin:10px 0 0 10px!important}.b-added-students__item{border-right:none!important;margin:0 20px 0 0}.b-added-students__item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}.b-open-edit-lesson{width:100%;color:#777;display:flex;justify-content:flex-start;align-items:center;margin:0 0 0 25px}.b-open-edit-lesson>button{color:#2089ff;cursor:pointer;border:none;background:0 0}.b-buttons{width:100%;display:flex;justify-content:center;margin:10px 0}.b-date-time{display:flex;align-items:center;flex-wrap:nowrap;padding:10px 0 20px 30px}.b-date-time__date{display:inline-block;margin:0 30px 0 0}.b-date-time__date:first-letter{text-transform:uppercase}.b-delimiter{width:50px;display:flex;justify-content:center;align-items:center}.b-delimiter:before{content:\"\";display:inline-block;border-bottom:1px solid #dadada;width:10px}.b-materials__add-button{color:#2089ff;display:flex;align-items:center;background:0 0;border:none;cursor:pointer}.b-materials__add-button>svg{margin:0 9px 0 0}.b-materials__list{display:flex;flex-direction:column;margin:10px 0 0 30px!important}.b-materials__list-item{border-right:none!important;margin:0 20px 0 0}.b-materials__list-item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}.b-before-time{margin:18px 0 10px;display:flex;align-items:center;font-size:14px;color:#333}.b-before-time>svg{margin:0 8px 0 0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);var script$6 = {
  components: {
    KalendarMonthview: function KalendarMonthview() {
      return Promise.resolve().then(function(){return kalendarMonthview});
    },
    KalendarWeekView: function KalendarWeekView() {
      return Promise.resolve().then(function(){return kalendarWeekview});
    },
    ScrollContainer: function ScrollContainer() {
      return Promise.resolve().then(function(){return scrollContainer});
    },
    KalendarCreatedCardSlot: __vue_component__,
    KalendarPopupCardSlot: __vue_component__$4,
    KalendarPopupEditForm: __vue_component__$5
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
          return ['week', 'day', 'month'].includes(val);
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
    formatDate: function formatDate(date) {
      var isoDate = new Date(date);
      return getFormattedTime(isoDate);
    },
    removeEvent: function removeEvent(kalendarEvent) {
      var day = kalendarEvent.start_time.slice(0, 10);
      this.$kalendar.removeEvent({
        day: day,
        key: kalendarEvent.key,
        id: kalendarEvent.id
      });
    }
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
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
  })])])]) : _vm._e()])]), _vm._v(" "), _vm._t("workTimeEdit")], 2), _vm._v(" "), _vm.kalendar_options.view_type === 'month' ? _c('kalendar-monthview', {
    attrs: {
      "current_day": _vm.current_day
    }
  }) : _c('div', {
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
          return [_c('h4', [_vm._v("\n                Новое занятие\n              ")]), _vm._v(" "), _c('span', {
            staticClass: "time"
          }, [_vm._v("\n                " + _vm._s(_vm.formatDate(information.start_time)) + "\n                -\n                " + _vm._s(_vm.formatDate(information.end_time)) + "\n              ")])];
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
          return [_c('kalendar-popup-card-slot', {
            attrs: {
              "popup_information": information
            },
            on: {
              "close": _vm.closePopups
            }
          })];
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
          return [_c('kalendar-created-card-slot', {
            attrs: {
              "event_information": information
            }
          })];
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
          return [_c('kalendar-popup-edit-form', {
            attrs: {
              "popup_information": information
            },
            on: {
              "close": _vm.closePopups,
              "removeEvent": function removeEvent($event) {
                return _vm.removeEvent(information);
              }
            }
          })];
        }, {
          "popup_information": information
        })], 2);
      }
    }], null, true)
  })], 1);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e7abf1f8_0", {
    source: "@import url(https://fonts.googleapis.com/css?family=Rubik:wght@400,600&display=swap);*{box-sizing:border-box;font-family:Rubik,Helvetica,Arial,sans-serif}*{box-sizing:border-box}:after,:before{box-sizing:border-box}html{font-size:10px!important}@media only screen and (max-width:1100px){html{font-size:8px!important}}@media only screen and (max-width:768px){html{font-size:10px!important}}.kalendar-wrapper{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--main-color:#ec4d3d;--weekend-color:#f7f7f7;--current-day-color:#7AFFD7;--table-cell-border-color:#e5e5e5;--odd-cell-border-color:#e5e5e5;--hour-row-color:inherit;--dark:#212121;--lightg:#9e9e9e;--card-bgcolor:#04A675;--card-color:white;--max-hours:10;--previous-events:#c6dafc;--previous-text-color:#727d8f;--green:#0abc83;--red:#ec4d3d}.kalendar-wrapper.gstyle{--hour-row-color:#212121;--main-color:#4285f4;--weekend-color:transparent;--table-cell-border-color:#dadada;--odd-cell-border-color:transparent;font-family:\"Google Sans\",Roboto,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Arial,sans-serif}.kalendar-wrapper.gstyle .week-navigator{display:flex;justify-content:space-between;align-items:center;background:#fff;border-bottom:none;padding:20px;color:rgba(0,0,0,.54)}.kalendar-wrapper.gstyle .week-navigator button{color:rgba(0,0,0,.54)}.kalendar-wrapper.gstyle .created-event,.kalendar-wrapper.gstyle .creating-event{background-color:var(--card-bgcolor);color:var(--card-color);text-shadow:none;border-left:none;border-radius:10px;opacity:1;border-bottom:solid 1px rgba(0,0,0,.03);font-size:14px;padding:0 5px;display:flex;justify-content:space-between;align-items:center}.kalendar-wrapper.gstyle .created-event>*,.kalendar-wrapper.gstyle .creating-event>*{text-shadow:none}.kalendar-wrapper.gstyle .creating-event{color:var(--main-color);background-color:#7affd7;font-size:12px;padding:0 20px;border-radius:10px;align-items:flex-start}.kalendar-wrapper.gstyle .creating-event .time{color:var(--main-color);display:flex;align-items:center}.kalendar-wrapper.gstyle .is-past .created-event,.kalendar-wrapper.gstyle .is-past .creating-event{background-color:var(--previous-events);color:var(--previous-text-color)}.kalendar-wrapper.gstyle .created-event{width:100%}.kalendar-wrapper.gstyle .created-event .time{right:2px}.kalendar-wrapper.gstyle .created-event:hover{cursor:pointer;background-color:var(--main-color)}.kalendar-wrapper.gstyle .created-event:hover *{color:#fff}.kalendar-wrapper.gstyle .sticky-top .days{margin-left:0;padding-left:55px}.kalendar-wrapper.gstyle .all-day{display:none}.kalendar-wrapper.gstyle ul.building-blocks.day-1 li.is-an-hour::before{content:\"\";position:absolute;bottom:-1px;left:-10px;width:10px;height:1px;background-color:var(--table-cell-border-color)}.kalendar-wrapper.gstyle .hours,.kalendar-wrapper.gstyle ul.building-blocks li{border-right:solid 1px var(--table-cell-border-color)}.kalendar-wrapper.gstyle .hour-indicator-line>span.line{height:2px;background-color:#db4437}.kalendar-wrapper.gstyle .hour-indicator-line>span.line:before{content:\"\";width:12px;height:12px;display:block;background-color:#db4437;position:absolute;top:-1px;left:0;border-radius:100%}.kalendar-wrapper.gstyle .days{position:relative}.kalendar-wrapper.gstyle .days:before{content:\"\";position:absolute;height:1px;width:55px;left:0;bottom:0}.kalendar-wrapper.gstyle .day-indicator{display:flex;flex-direction:column;align-items:center;color:var(--dark);font-size:13px;padding-left:0;background:#fff}.kalendar-wrapper.gstyle .day-indicator>div{display:flex;flex-direction:column;align-items:center}.kalendar-wrapper.gstyle .day-indicator.is-before{color:#757575}.kalendar-wrapper.gstyle .day-indicator .number-date{margin-left:0;margin-right:0;order:2;font-size:18px;font-weight:600;width:32px;height:32px;border-radius:100%;align-items:center;justify-content:center;display:flex;margin-top:4px}.kalendar-wrapper.gstyle .day-indicator.today{border-bottom-color:var(--table-cell-border-color)}.kalendar-wrapper.gstyle .day-indicator.today:after{display:none}.kalendar-wrapper.gstyle .day-indicator.today .number-date{background-color:var(--main-color);color:#fff}.kalendar-wrapper.gstyle .day-indicator .letters-date{margin-left:0;margin-right:0;font-weight:500;text-transform:uppercase;font-size:11px}.kalendar-wrapper.gstyle .day-indicator:first-child{position:relative}.kalendar-wrapper.gstyle .day-indicator:first-child::before{content:\"\";position:absolute;left:-1px;top:0;width:1px;height:100%}.kalendar-wrapper.gstyle .creating-event{border-radius:10px;box-shadow:0 2px 2px rgba(0,0,0,.25);transition:opacity .1s linear}.kalendar-wrapper.gstyle .popup-wrapper{width:400px;min-height:116px;box-shadow:0 4px 4px rgba(0,0,0,.25);transition:opacity .1s linear}.kalendar-wrapper.non-desktop .building-blocks{pointer-events:none}.kalendar-wrapper.day-view .day-indicator{align-items:flex-start;text-align:center;padding-left:10px}.created-event,.creating-event{padding:4px 6px;cursor:default;word-break:break-word;height:100%;width:100%;font-size:14px}.created-event h4,.creating-event h4{font-weight:400}.creating-event{background-color:#34aadc;opacity:.9}.creating-event>*{text-shadow:0 0 7px rgba(0,0,0,.25)}.created-event{background-color:#bfecff;opacity:.74;border-left:solid 3px #34aadc;color:#1f6570}.week-navigator{display:flex;align-items:center;background:linear-gradient(#fdfdfd,#f9f9f9);border-bottom:solid 1px #ec4d3d;padding:10px 20px}.week-navigator .nav-wrapper{display:flex;align-items:center;justify-content:space-between;font-size:22px}.week-navigator .nav-wrapper span{white-space:nowrap;line-height:1.6;color:#333}.week-navigator button{background:0 0;border:none;display:inline-flex;margin:0 10px;color:#ec4d3d;align-items:center;font-size:14px;cursor:pointer;padding:0}.kalendar-wrapper{background-color:#fff;min-width:300px}.no-scroll{overflow-y:hidden;max-height:100%}.hour-indicator-line{position:absolute;z-index:10;width:106%;height:10px;display:flex;align-items:center;pointer-events:none;user-select:none;margin:0 0 0 -10px}.hour-indicator-line>span.line{background-color:var(--main-color);height:1px;display:block;flex:1}.hour-indicator-line>span.time-value{font-size:14px;width:48px;color:var(--main-color);font-weight:600;background-color:#fff}.hour-indicator-tooltip{position:absolute;z-index:0;background-color:var(--main-color);width:10px;height:10px;display:block;border-radius:100%;pointer-events:none;user-select:none}ul.kalendar-day li.kalendar-cell:last-child{display:none}.week-navigator-button{outline:0}.week-navigator-button:active svg,.week-navigator-button:hover svg{stroke:var(--main-color)}.gstyle .week-navigator-button{width:32px;height:32px;display:flex;justify-content:center;align-items:center;border:2px solid var(--main-color);border-radius:100%;transition:all .2s}.gstyle .week-navigator-button svg{position:relative;left:1px;stroke:var(--main-color)}.gstyle .week-navigator-button:hover{border:2px solid #fff;background:var(--main-color)}.gstyle .week-navigator-button:hover svg{stroke:#fff}.kalendar-header{display:flex;justify-content:space-between;align-items:center}.kalendar-header>div{display:flex;justify-content:space-between;align-items:center}.main-button{padding:11px 42px;background:#2089ff;box-shadow:5px 5px 15px rgba(0,0,0,.15);border-radius:10px;margin:0 5px;cursor:pointer;border:none;color:#fff}.main-button:active{box-shadow:inset 5px 5px 15px rgba(0,0,0,.15)}.main-button.--gray{background:var(--green)}.main-button.--red{background:var(--red)}.button-today{margin:0 20px 0 0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Kalendar: __vue_component__$6});var install = function installKalendarVue(Vue) {
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
var script$7 = {
  name: "kalendar-monthview",
  components: {
    KalendarDay: function KalendarDay() {
      return Promise.resolve().then(function(){return kalendarDaymonth});
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
};/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
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

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-00f3ff6c_0", {
    source: ".sticky-top[data-v-00f3ff6c]{position:sticky;top:0;z-index:20;background-color:#fff}.sticky-top .days[data-v-00f3ff6c]{margin:0;display:flex;margin-left:55px}.sticky-top .days li[data-v-00f3ff6c]{display:inline-flex;flex:1;font-size:1.1rem;color:#666;font-weight:300;margin-right:var(--space-between-cols);border-bottom:solid 1px #e5e5e5;padding-bottom:5px;position:relative}.sticky-top .days li span[data-v-00f3ff6c]{margin-right:3px}.sticky-top .days li span[data-v-00f3ff6c]:first-child{font-size:20px;font-weight:500}.sticky-top .days .today[data-v-00f3ff6c]{border-bottom-color:var(--main-color);color:var(--main-color)!important}.sticky-top .days .today[data-v-00f3ff6c]::after{content:\"\";position:absolute;height:2px;bottom:0;left:0;width:100%;background-color:var(--main-color)}.sticky-top .all-day[data-v-00f3ff6c]{display:flex;margin-bottom:0;margin-top:0;border-bottom:solid 2px #e5e5e5}.sticky-top .all-day span[data-v-00f3ff6c]{display:flex;align-items:center;padding:0 5px;width:55px;font-weight:500;font-size:.8rem;color:#b8bbca;text-transform:lowercase}.sticky-top .all-day li[data-v-00f3ff6c]{flex:1;margin-right:var(--space-between-cols)}.sticky-top .all-day li.all-today[data-v-00f3ff6c]{background-color:#fef4f4}.weeks[data-v-00f3ff6c]{display:flex;padding-left:54px}.weeks>ul[data-v-00f3ff6c]{flex-grow:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$7 = "data-v-00f3ff6c";
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);var kalendarMonthview=/*#__PURE__*/Object.freeze({__proto__:null,'default': __vue_component__$7});function PromiseWorker (worker) {
  var messageIds = 0;
  var callbacks = {};
  worker.addEventListener("message", function (e) {
    return onMessage(e);
  });

  var onMessage = function onMessage(e) {
    var message = e.data;

    if (!Array.isArray(message) || message.length < 2) {
      return;
    }

    var messageId = message[0];
    var error = message[1];
    var result = message[2];
    var callback = callbacks[messageId];
    if (!callback) return;
    delete callbacks[messageId];
    callback(error, result);
  };

  return {
    initiateWorker: function initiateWorker(_worker) {},
    postMessage: function postMessage(userMessage) {
      var messageId = messageIds++;
      var messageToSend = [messageId, userMessage];
      return new Promise(function (resolve, reject) {
        callbacks[messageId] = function (error, result) {
          if (error) return reject(new Error(error.message));
          resolve(result);
        };

        if (typeof worker.controller !== "undefined") {
          // service worker, use MessageChannels because e.source is broken in Chrome < 51:
          // https://bugs.chromium.org/p/chromium/issues/detail?id=543198
          var channel = new MessageChannel();

          channel.port1.onmessage = function (e) {
            onMessage(e);
          };

          worker.controller.postMessage(messageToSend, [channel.port2]);
        } else {
          // web worker
          worker.postMessage(messageToSend);
        }
      });
    }
  };
}const kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
const kRequire = kIsNodeJS && typeof module.require === 'function' ? module.require : null; // eslint-disable-line

function browserDecodeBase64(base64, enableUnicode) {
    const binaryString = atob(base64);
    if (enableUnicode) {
        const binaryView = new Uint8Array(binaryString.length);
        Array.prototype.forEach.call(binaryView, (el, idx, arr) => {
            arr[idx] = binaryString.charCodeAt(idx);
        });
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function nodeDecodeBase64(base64, enableUnicode) {
    return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
}

function createBase64WorkerFactory(base64, sourcemap = null, enableUnicode = false) {
    const source = kIsNodeJS ? nodeDecodeBase64(base64, enableUnicode) : browserDecodeBase64(base64, enableUnicode);
    const start = source.indexOf('\n', 10) + 1;
    const body = source.substring(start) + (sourcemap ? `\/\/# sourceMappingURL=${sourcemap}` : '');

    if (kRequire) {
        /* node.js */
        const Worker = kRequire('worker_threads').Worker; // eslint-disable-line
        return function WorkerFactory(options) {
            return new Worker(body, Object.assign({}, options, { eval: true }));
        };
    }

    /* browser */
    const blob = new Blob([body], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    return function WorkerFactory(options) {
        return new Worker(url, options);
    };
}/* eslint-disable */
var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwpmdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsKICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7CgogIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7CiAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsKCiAgICBpZiAoZW51bWVyYWJsZU9ubHkpIHsKICAgICAgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsKICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsKICAgICAgfSk7CiAgICB9CgogICAga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOwogIH0KCiAgcmV0dXJuIGtleXM7Cn0KCmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkgewogIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7CiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsKCiAgICBpZiAoaSAlIDIpIHsKICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7CiAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7CiAgICAgIH0pOwogICAgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgewogICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOwogICAgfSBlbHNlIHsKICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7CiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7CiAgICAgIH0pOwogICAgfQogIH0KCiAgcmV0dXJuIHRhcmdldDsKfQoKZnVuY3Rpb24gX3R5cGVvZihvYmopIHsKICAiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2YiOwoKICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAic3ltYm9sIikgewogICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHsKICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7CiAgICB9OwogIH0gZWxzZSB7CiAgICBfdHlwZW9mID0gZnVuY3Rpb24gKG9iaikgewogICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gInN5bWJvbCIgOiB0eXBlb2Ygb2JqOwogICAgfTsKICB9CgogIHJldHVybiBfdHlwZW9mKG9iaik7Cn0KCmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsKICBpZiAoa2V5IGluIG9iaikgewogICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7CiAgICAgIHZhbHVlOiB2YWx1ZSwKICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgY29uZmlndXJhYmxlOiB0cnVlLAogICAgICB3cml0YWJsZTogdHJ1ZQogICAgfSk7CiAgfSBlbHNlIHsKICAgIG9ialtrZXldID0gdmFsdWU7CiAgfQoKICByZXR1cm4gb2JqOwp9CgpmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsKICByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOwp9CgpmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7CiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsKfQoKZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgewogIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09ICJ1bmRlZmluZWQiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFyclsiQEBpdGVyYXRvciJdOwoKICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOwogIHZhciBfYXJyID0gW107CiAgdmFyIF9uID0gdHJ1ZTsKICB2YXIgX2QgPSBmYWxzZTsKCiAgdmFyIF9zLCBfZTsKCiAgdHJ5IHsKICAgIGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsKICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTsKCiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsKICAgIH0KICB9IGNhdGNoIChlcnIpIHsKICAgIF9kID0gdHJ1ZTsKICAgIF9lID0gZXJyOwogIH0gZmluYWxseSB7CiAgICB0cnkgewogICAgICBpZiAoIV9uICYmIF9pWyJyZXR1cm4iXSAhPSBudWxsKSBfaVsicmV0dXJuIl0oKTsKICAgIH0gZmluYWxseSB7CiAgICAgIGlmIChfZCkgdGhyb3cgX2U7CiAgICB9CiAgfQoKICByZXR1cm4gX2FycjsKfQoKZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgewogIGlmICghbykgcmV0dXJuOwogIGlmICh0eXBlb2YgbyA9PT0gInN0cmluZyIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOwogIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsKICBpZiAobiA9PT0gIk9iamVjdCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsKICBpZiAobiA9PT0gIk1hcCIgfHwgbiA9PT0gIlNldCIpIHJldHVybiBBcnJheS5mcm9tKG8pOwogIGlmIChuID09PSAiQXJndW1lbnRzIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7Cn0KCmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7CiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7CgogIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTsKCiAgcmV0dXJuIGFycjI7Cn0KCmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7CiAgdGhyb3cgbmV3IFR5cGVFcnJvcigiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC4iKTsKfQoKLy90b2RvOiByZW1vdmUgdGhpcyBhbmQgZm9yayBwcm9taXNlLXdvcmtlciB0byBwcm92aWRlIEVTTQoKZnVuY3Rpb24gaXNQcm9taXNlKG9iaikgewogIC8vIHZpYSBodHRwczovL3VucGtnLmNvbS9pcy1wcm9taXNlQDIuMS4wL2luZGV4LmpzCiAgcmV0dXJuICEhb2JqICYmIChfdHlwZW9mKG9iaikgPT09ICJvYmplY3QiIHx8IHR5cGVvZiBvYmogPT09ICJmdW5jdGlvbiIpICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gImZ1bmN0aW9uIjsKfQoKZnVuY3Rpb24gcmVnaXN0ZXJQcm9taXNlV29ya2VyIChjYWxsYmFjaykgewogIGZ1bmN0aW9uIHBvc3RPdXRnb2luZ01lc3NhZ2UoZSwgbWVzc2FnZUlkLCBlcnJvciwgcmVzdWx0KSB7CiAgICBmdW5jdGlvbiBwb3N0TWVzc2FnZShtc2cpIHsKICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovCiAgICAgIGlmICh0eXBlb2Ygc2VsZi5wb3N0TWVzc2FnZSAhPT0gImZ1bmN0aW9uIikgewogICAgICAgIC8vIHNlcnZpY2Ugd29ya2VyCiAgICAgICAgZS5wb3J0c1swXS5wb3N0TWVzc2FnZShtc2cpOwogICAgICB9IGVsc2UgewogICAgICAgIC8vIHdlYiB3b3JrZXIKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKG1zZyk7CiAgICAgIH0KICAgIH0KCiAgICBpZiAoZXJyb3IpIHsKCiAgICAgIHBvc3RNZXNzYWdlKFttZXNzYWdlSWQsIHsKICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlCiAgICAgIH1dKTsKICAgIH0gZWxzZSB7CiAgICAgIHBvc3RNZXNzYWdlKFttZXNzYWdlSWQsIG51bGwsIHJlc3VsdF0pOwogICAgfQogIH0KCiAgZnVuY3Rpb24gdHJ5Q2F0Y2hGdW5jKGNhbGxiYWNrLCBtZXNzYWdlKSB7CiAgICB0cnkgewogICAgICByZXR1cm4gewogICAgICAgIHJlczogY2FsbGJhY2sobWVzc2FnZSkKICAgICAgfTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgcmV0dXJuIHsKICAgICAgICBlcnI6IGUKICAgICAgfTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIGhhbmRsZUluY29taW5nTWVzc2FnZShlLCBjYWxsYmFjaywgbWVzc2FnZUlkLCBtZXNzYWdlKSB7CiAgICB2YXIgcmVzdWx0ID0gdHJ5Q2F0Y2hGdW5jKGNhbGxiYWNrLCBtZXNzYWdlKTsKCiAgICBpZiAocmVzdWx0LmVycikgewogICAgICBwb3N0T3V0Z29pbmdNZXNzYWdlKGUsIG1lc3NhZ2VJZCwgcmVzdWx0LmVycik7CiAgICB9IGVsc2UgaWYgKCFpc1Byb21pc2UocmVzdWx0LnJlcykpIHsKICAgICAgcG9zdE91dGdvaW5nTWVzc2FnZShlLCBtZXNzYWdlSWQsIG51bGwsIHJlc3VsdC5yZXMpOwogICAgfSBlbHNlIHsKICAgICAgcmVzdWx0LnJlcy50aGVuKGZ1bmN0aW9uIChmaW5hbFJlc3VsdCkgewogICAgICAgIHBvc3RPdXRnb2luZ01lc3NhZ2UoZSwgbWVzc2FnZUlkLCBudWxsLCBmaW5hbFJlc3VsdCk7CiAgICAgIH0sIGZ1bmN0aW9uIChmaW5hbEVycm9yKSB7CiAgICAgICAgcG9zdE91dGdvaW5nTWVzc2FnZShlLCBtZXNzYWdlSWQsIGZpbmFsRXJyb3IpOwogICAgICB9KTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIG9uSW5jb21pbmdNZXNzYWdlKGUpIHsKICAgIHZhciBwYXlsb2FkID0gZS5kYXRhOwoKICAgIGlmICghQXJyYXkuaXNBcnJheShwYXlsb2FkKSB8fCBwYXlsb2FkLmxlbmd0aCAhPT0gMikgewogICAgICAvLyBtZXNzYWdlIGRvZW5zJ3QgbWF0Y2ggY29tbXVuaWNhdGlvbiBmb3JtYXQ7IGlnbm9yZQogICAgICByZXR1cm47CiAgICB9CgogICAgdmFyIG1lc3NhZ2VJZCA9IHBheWxvYWRbMF07CiAgICB2YXIgbWVzc2FnZSA9IHBheWxvYWRbMV07CgogICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gImZ1bmN0aW9uIikgewogICAgICBwb3N0T3V0Z29pbmdNZXNzYWdlKGUsIG1lc3NhZ2VJZCwgbmV3IEVycm9yKCJQbGVhc2UgcGFzcyBhIGZ1bmN0aW9uIGludG8gcmVnaXN0ZXIoKS4iKSk7CiAgICB9IGVsc2UgewogICAgICBoYW5kbGVJbmNvbWluZ01lc3NhZ2UoZSwgY2FsbGJhY2ssIG1lc3NhZ2VJZCwgbWVzc2FnZSk7CiAgICB9CiAgfQoKICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBvbkluY29taW5nTWVzc2FnZSk7Cn0KCnZhciBjcmVhdG9yc19vZmZzZXQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MDsKCmlmIChjcmVhdG9yc19vZmZzZXQgKiAtMSA+PSAwKSB7CiAgY3JlYXRvcnNfb2Zmc2V0ICo9IC0xOwogIGNyZWF0b3JzX29mZnNldCA9ICIiLmNvbmNhdCgoY3JlYXRvcnNfb2Zmc2V0ICsgIiIpLnBhZFN0YXJ0KDIsICIwIiksICI6MDAiKTsKICBjcmVhdG9yc19vZmZzZXQgPSAiKyIuY29uY2F0KGNyZWF0b3JzX29mZnNldCk7Cn0gZWxzZSB7CiAgY3JlYXRvcnNfb2Zmc2V0ID0gIiIuY29uY2F0KChjcmVhdG9yc19vZmZzZXQgKyAiIikucGFkU3RhcnQoMiwgIjAiKSwgIjowMCIpOwogIGNyZWF0b3JzX29mZnNldCA9ICItIi5jb25jYXQoY3JlYXRvcnNfb2Zmc2V0KTsKfQoKdmFyIGdldEhvdXJsZXNzRGF0ZSA9IGZ1bmN0aW9uIGdldEhvdXJsZXNzRGF0ZShkYXRlX3N0cmluZykgewogIHZhciB0b2RheSA9IGRhdGVfc3RyaW5nID8gbmV3IERhdGUoZGF0ZV9zdHJpbmcpIDogbmV3IERhdGUoKTsKICB2YXIgeWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAiIiwKICAgICAgbW9udGggPSAodG9kYXkuZ2V0TW9udGgoKSArIDEgKyAiIikucGFkU3RhcnQoMiwgIjAiKSwKICAgICAgZGF5ID0gKHRvZGF5LmdldERhdGUoKSArICIiKS5wYWRTdGFydCgyLCAiMCIpOwogIHJldHVybiAiIi5jb25jYXQoeWVhciwgIi0iKS5jb25jYXQobW9udGgsICItIikuY29uY2F0KGRheSwgIlQwMDowMDowMC4wMDBaIik7Cn07Cgp2YXIgZ2V0WWVhck1vbnRoRGF5ID0gZnVuY3Rpb24gZ2V0WWVhck1vbnRoRGF5KGRhdGVfc3RyaW5nKSB7CiAgcmV0dXJuIGdldEhvdXJsZXNzRGF0ZShkYXRlX3N0cmluZykuc2xpY2UoMCwgMTApOwp9OwoKdmFyIGFkZERheXMgPSBmdW5jdGlvbiBhZGREYXlzKGRhdGUsIGRheXMpIHsKICB2YXIgZGF0ZU9iaiA9IG5ldyBEYXRlKGRhdGUpOwogIGRhdGVPYmouc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7CiAgZGF0ZU9iai5zZXREYXRlKGRhdGVPYmouZ2V0RGF0ZSgpICsgZGF5cyk7CiAgcmV0dXJuIGRhdGVPYmo7Cn07Cgp2YXIgZ2VuZXJhdGVVVUlEID0gZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKCkgewogIHJldHVybiAoWzFlN10gKyAtMWUzICsgLTRlMyArIC04ZTMgKyAtMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgZnVuY3Rpb24gKGMpIHsKICAgIHJldHVybiAoYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gYyAvIDQpLnRvU3RyaW5nKDE2KTsKICB9KTsKfTsKCnZhciBnZXRMb2NhbGVUaW1lID0gZnVuY3Rpb24gZ2V0TG9jYWxlVGltZShkYXRlU3RyaW5nKSB7CiAgdmFyIF9EYXRlJHRvTG9jYWxlU3RyaW5nJCA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpLnRvTG9jYWxlU3RyaW5nKCJlbi1HQiIpLnNwbGl0KCIsICIpLAogICAgICBfRGF0ZSR0b0xvY2FsZVN0cmluZyQyID0gX3NsaWNlZFRvQXJyYXkoX0RhdGUkdG9Mb2NhbGVTdHJpbmckLCAyKSwKICAgICAgZGF0ZSA9IF9EYXRlJHRvTG9jYWxlU3RyaW5nJDJbMF0sCiAgICAgIGhvdXIgPSBfRGF0ZSR0b0xvY2FsZVN0cmluZyQyWzFdOwoKICBkYXRlID0gZGF0ZS5zcGxpdCgiLyIpLnJldmVyc2UoKS5qb2luKCItIik7CiAgcmV0dXJuICIiLmNvbmNhdChkYXRlLCAiVCIpLmNvbmNhdChob3VyLCAiLjAwMFoiKTsKfTsKCnZhciBiZWdpbm5pbmdPZk1vbnRoID0gZnVuY3Rpb24gYmVnaW5uaW5nT2ZNb250aChkKSB7CiAgcmV0dXJuIG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpKTsKfTsKCnZhciBkYXlzSW5Nb250aCA9IGZ1bmN0aW9uIGRheXNJbk1vbnRoKCkgewogIHZhciBkID0gbmV3IERhdGUoKTsKICByZXR1cm4gMzMgLSBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgMzMpLmdldERhdGUoKTsKfTsKCnZhciBob3VyVXRpbHMgPSB7CiAgZ2V0QWxsSG91cnM6IGZ1bmN0aW9uIGdldEFsbEhvdXJzKCkgewogICAgcmV0dXJuIFsiMDA6MDA6MDAiLCAiMDA6MTA6MDAiLCAiMDA6MjA6MDAiLCAiMDA6MzA6MDAiLCAiMDA6NDA6MDAiLCAiMDA6NTA6MDAiLCAiMDE6MDA6MDAiLCAiMDE6MTA6MDAiLCAiMDE6MjA6MDAiLCAiMDE6MzA6MDAiLCAiMDE6NDA6MDAiLCAiMDE6NTA6MDAiLCAiMDI6MDA6MDAiLCAiMDI6MTA6MDAiLCAiMDI6MjA6MDAiLCAiMDI6MzA6MDAiLCAiMDI6NDA6MDAiLCAiMDI6NTA6MDAiLCAiMDM6MDA6MDAiLCAiMDM6MTA6MDAiLCAiMDM6MjA6MDAiLCAiMDM6MzA6MDAiLCAiMDM6NDA6MDAiLCAiMDM6NTA6MDAiLCAiMDQ6MDA6MDAiLCAiMDQ6MTA6MDAiLCAiMDQ6MjA6MDAiLCAiMDQ6MzA6MDAiLCAiMDQ6NDA6MDAiLCAiMDQ6NTA6MDAiLCAiMDU6MDA6MDAiLCAiMDU6MTA6MDAiLCAiMDU6MjA6MDAiLCAiMDU6MzA6MDAiLCAiMDU6NDA6MDAiLCAiMDU6NTA6MDAiLCAiMDY6MDA6MDAiLCAiMDY6MTA6MDAiLCAiMDY6MjA6MDAiLCAiMDY6MzA6MDAiLCAiMDY6NDA6MDAiLCAiMDY6NTA6MDAiLCAiMDc6MDA6MDAiLCAiMDc6MTA6MDAiLCAiMDc6MjA6MDAiLCAiMDc6MzA6MDAiLCAiMDc6NDA6MDAiLCAiMDc6NTA6MDAiLCAiMDg6MDA6MDAiLCAiMDg6MTA6MDAiLCAiMDg6MjA6MDAiLCAiMDg6MzA6MDAiLCAiMDg6NDA6MDAiLCAiMDg6NTA6MDAiLCAiMDk6MDA6MDAiLCAiMDk6MTA6MDAiLCAiMDk6MjA6MDAiLCAiMDk6MzA6MDAiLCAiMDk6NDA6MDAiLCAiMDk6NTA6MDAiLCAiMTA6MDA6MDAiLCAiMTA6MTA6MDAiLCAiMTA6MjA6MDAiLCAiMTA6MzA6MDAiLCAiMTA6NDA6MDAiLCAiMTA6NTA6MDAiLCAiMTE6MDA6MDAiLCAiMTE6MTA6MDAiLCAiMTE6MjA6MDAiLCAiMTE6MzA6MDAiLCAiMTE6NDA6MDAiLCAiMTE6NTA6MDAiLCAiMTI6MDA6MDAiLCAiMTI6MTA6MDAiLCAiMTI6MjA6MDAiLCAiMTI6MzA6MDAiLCAiMTI6NDA6MDAiLCAiMTI6NTA6MDAiLCAiMTM6MDA6MDAiLCAiMTM6MTA6MDAiLCAiMTM6MjA6MDAiLCAiMTM6MzA6MDAiLCAiMTM6NDA6MDAiLCAiMTM6NTA6MDAiLCAiMTQ6MDA6MDAiLCAiMTQ6MTA6MDAiLCAiMTQ6MjA6MDAiLCAiMTQ6MzA6MDAiLCAiMTQ6NDA6MDAiLCAiMTQ6NTA6MDAiLCAiMTU6MDA6MDAiLCAiMTU6MTA6MDAiLCAiMTU6MjA6MDAiLCAiMTU6MzA6MDAiLCAiMTU6NDA6MDAiLCAiMTU6NTA6MDAiLCAiMTY6MDA6MDAiLCAiMTY6MTA6MDAiLCAiMTY6MjA6MDAiLCAiMTY6MzA6MDAiLCAiMTY6NDA6MDAiLCAiMTY6NTA6MDAiLCAiMTc6MDA6MDAiLCAiMTc6MTA6MDAiLCAiMTc6MjA6MDAiLCAiMTc6MzA6MDAiLCAiMTc6NDA6MDAiLCAiMTc6NTA6MDAiLCAiMTg6MDA6MDAiLCAiMTg6MTA6MDAiLCAiMTg6MjA6MDAiLCAiMTg6MzA6MDAiLCAiMTg6NDA6MDAiLCAiMTg6NTA6MDAiLCAiMTk6MDA6MDAiLCAiMTk6MTA6MDAiLCAiMTk6MjA6MDAiLCAiMTk6MzA6MDAiLCAiMTk6NDA6MDAiLCAiMTk6NTA6MDAiLCAiMjA6MDA6MDAiLCAiMjA6MTA6MDAiLCAiMjA6MjA6MDAiLCAiMjA6MzA6MDAiLCAiMjA6NDA6MDAiLCAiMjA6NTA6MDAiLCAiMjE6MDA6MDAiLCAiMjE6MTA6MDAiLCAiMjE6MjA6MDAiLCAiMjE6MzA6MDAiLCAiMjE6NDA6MDAiLCAiMjE6NTA6MDAiLCAiMjI6MDA6MDAiLCAiMjI6MTA6MDAiLCAiMjI6MjA6MDAiLCAiMjI6MzA6MDAiLCAiMjI6NDA6MDAiLCAiMjI6NTA6MDAiLCAiMjM6MDA6MDAiLCAiMjM6MTA6MDAiLCAiMjM6MjA6MDAiLCAiMjM6MzA6MDAiLCAiMjM6NDA6MDAiLCAiMjM6NTA6MDAiLCAiMjQ6MDA6MDAiXTsKICB9LAogIGdldEZ1bGxIb3VyczogZnVuY3Rpb24gZ2V0RnVsbEhvdXJzKCkgewogICAgcmV0dXJuIFsiMDA6MDA6MDAiLCAiMDE6MDA6MDAiLCAiMDI6MDA6MDAiLCAiMDM6MDA6MDAiLCAiMDQ6MDA6MDAiLCAiMDU6MDA6MDAiLCAiMDY6MDA6MDAiLCAiMDc6MDA6MDAiLCAiMDg6MDA6MDAiLCAiMDk6MDA6MDAiLCAiMTA6MDA6MDAiLCAiMTE6MDA6MDAiLCAiMTI6MDA6MDAiLCAiMTM6MDA6MDAiLCAiMTQ6MDA6MDAiLCAiMTU6MDA6MDAiLCAiMTY6MDA6MDAiLCAiMTc6MDA6MDAiLCAiMTg6MDA6MDAiLCAiMTk6MDA6MDAiLCAiMjA6MDA6MDAiLCAiMjE6MDA6MDAiLCAiMjI6MDA6MDAiLCAiMjM6MDA6MDAiXTsKICB9Cn07CgpyZWdpc3RlclByb21pc2VXb3JrZXIoZnVuY3Rpb24gKG1lc3NhZ2UpIHsKICB2YXIgdHlwZSA9IG1lc3NhZ2UudHlwZSwKICAgICAgZGF0YSA9IG1lc3NhZ2UuZGF0YTsKCiAgaWYgKHR5cGUgPT09ICJtZXNzYWdlIikgewogICAgcmV0dXJuICJXb3JrZXIgcmVwbGllczogIi5jb25jYXQobmV3IERhdGUoKS50b0lTT1N0cmluZygpKTsKICB9CgogIHN3aXRjaCAodHlwZSkgewogICAgY2FzZSAiZ2V0RGF5cyI6CiAgICAgIHJldHVybiBnZXREYXlzKGRhdGEuZGF5LCBkYXRhLm9wdGlvbnMpOwoKICAgIGNhc2UgImdldEhvdXJzIjoKICAgICAgcmV0dXJuIGdldEhvdXJzKGRhdGEuaG91ck9wdGlvbnMpOwoKICAgIGNhc2UgImdldERheUNlbGxzIjoKICAgICAgcmV0dXJuIGdldERheUNlbGxzKGRhdGEuZGF5LCBkYXRhLmhvdXJPcHRpb25zKTsKCiAgICBjYXNlICJjb25zdHJ1Y3REYXlFdmVudHMiOgogICAgICByZXR1cm4gY29uc3RydWN0RGF5RXZlbnRzKGRhdGEuZGF5LCBkYXRhLmV2ZW50cyk7CgogICAgY2FzZSAiY29uc3RydWN0TmV3RXZlbnQiOgogICAgICByZXR1cm4gY29uc3RydWN0TmV3RXZlbnQoZGF0YS5ldmVudCk7CiAgfQp9KTsKCmZ1bmN0aW9uIGdldERheXMoZGF5U3RyaW5nLCBfcmVmKSB7CiAgdmFyIGhpZGVfZGF0ZXMgPSBfcmVmLmhpZGVfZGF0ZXMsCiAgICAgIGhpZGVfZGF5cyA9IF9yZWYuaGlkZV9kYXlzLAogICAgICB2aWV3X3R5cGUgPSBfcmVmLnZpZXdfdHlwZTsKICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCIiLmNvbmNhdChkYXlTdHJpbmcsICJUMDA6MDA6MDAuMDAwWiIpKTsKICB2YXIgZGF5X29mX3dlZWsgPSBkYXRlLmdldFVUQ0RheSgpIC0gMTsKICB2YXIgZGF5cyA9IFtdOwoKICBzd2l0Y2ggKHZpZXdfdHlwZSkgewogICAgY2FzZSAnZGF5JzoKICAgICAgZGF5cyA9IFt7CiAgICAgICAgdmFsdWU6IGRhdGUudG9JU09TdHJpbmcoKSwKICAgICAgICBpbmRleDogMAogICAgICB9XTsKICAgICAgYnJlYWs7CgogICAgY2FzZSAnbW9udGgnOgogICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBkYXlzSW5Nb250aCgpOyBpZHgrKykgewogICAgICAgIGRheXMucHVzaCh7CiAgICAgICAgICB2YWx1ZTogYWRkRGF5cyhiZWdpbm5pbmdPZk1vbnRoKGRhdGUpLCBpZHgpLnRvSVNPU3RyaW5nKCksCiAgICAgICAgICBpbmRleDogaWR4CiAgICAgICAgfSk7CiAgICAgIH0KCiAgICAgIGJyZWFrOwoKICAgIGRlZmF1bHQ6CiAgICAgIGZvciAodmFyIF9pZHggPSAwOyBfaWR4IDwgNzsgX2lkeCsrKSB7CiAgICAgICAgZGF5cy5wdXNoKHsKICAgICAgICAgIHZhbHVlOiBhZGREYXlzKGRhdGUsIF9pZHggLSBkYXlfb2Zfd2VlaykudG9JU09TdHJpbmcoKSwKICAgICAgICAgIGluZGV4OiBfaWR4CiAgICAgICAgfSk7CiAgICAgIH0KCiAgICAgIGJyZWFrOwogIH0KCiAgaWYgKGhpZGVfZGF0ZXMgJiYgaGlkZV9kYXRlcy5sZW5ndGggPiAwKSB7CiAgICBkYXlzID0gZGF5cy5maWx0ZXIoZnVuY3Rpb24gKF9yZWYyKSB7CiAgICAgIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlOwogICAgICByZXR1cm4gaGlkZV9kYXRlcy5pbmRleE9mKHZhbHVlLnNsaWNlKDAsIDEwKSkgPCAwOwogICAgfSk7CiAgfQoKICBpZiAoaGlkZV9kYXlzICYmIGhpZGVfZGF5cy5sZW5ndGggPiAwKSB7CiAgICBkYXlzID0gZGF5cy5maWx0ZXIoZnVuY3Rpb24gKF9yZWYzKSB7CiAgICAgIHZhciBpbmRleCA9IF9yZWYzLmluZGV4OwogICAgICByZXR1cm4gaGlkZV9kYXlzLmluZGV4T2YoaW5kZXgpIDwgMDsKICAgIH0pOwogIH0KCiAgcmV0dXJuIGRheXM7Cn0KCmZ1bmN0aW9uIGdldEhvdXJzKGhvdXJfb3B0aW9ucykgewogIHZhciBkYXRlID0gbmV3IERhdGUoKTsKICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApOwogIHZhciBpc29fZGF0ZSA9IGdldFllYXJNb250aERheShkYXRlKTsKICB2YXIgZGF5X2hvdXJzID0gaG91clV0aWxzLmdldEZ1bGxIb3VycygpOwoKICBpZiAoaG91cl9vcHRpb25zKSB7CiAgICB2YXIgc3RhcnRfaG91ciA9IGhvdXJfb3B0aW9ucy5zdGFydF9ob3VyLAogICAgICAgIGVuZF9ob3VyID0gaG91cl9vcHRpb25zLmVuZF9ob3VyOwogICAgZGF5X2hvdXJzID0gZGF5X2hvdXJzLnNsaWNlKHN0YXJ0X2hvdXIsIGVuZF9ob3VyKTsKICB9CgogIHZhciBob3VycyA9IFtdOwoKICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBkYXlfaG91cnMubGVuZ3RoOyBpZHgrKykgewogICAgdmFyIHZhbHVlID0gIiIuY29uY2F0KGlzb19kYXRlLCAiVCIpLmNvbmNhdChkYXlfaG91cnNbaWR4XSwgIi4wMDBaIik7CiAgICBob3Vycy5wdXNoKHsKICAgICAgdmFsdWU6IHZhbHVlLAogICAgICBpbmRleDogaWR4LAogICAgICB2aXNpYmxlOiB0cnVlCiAgICB9KTsKICB9CgogIHJldHVybiBob3VyczsKfQoKdmFyIGdldERheUNlbGxzID0gZnVuY3Rpb24gZ2V0RGF5Q2VsbHMoZGF5U3RyaW5nLCBkYXlfb3B0aW9ucykgewogIGlmIChuZXcgRGF0ZShkYXlTdHJpbmcpLnRvSVNPU3RyaW5nKCkgIT09IGRheVN0cmluZykgewogICAgdGhyb3cgbmV3IEVycm9yKCJVbnN1cHBvcnRlZCBkYXlTdHJpbmcgcGFyYW1ldGVyIHByb3ZpZGVkIik7CiAgfQoKICB2YXIgY2VsbHMgPSBbXTsKICB2YXIgZGF0ZV9wYXJ0ID0gZGF5U3RyaW5nLnNsaWNlKDAsIDEwKTsKICB2YXIgYWxsX2hvdXJzID0gaG91clV0aWxzLmdldEFsbEhvdXJzKCkuZmlsdGVyKGZ1bmN0aW9uIChoKSB7CiAgICByZXR1cm4gaC5pbmRleE9mKCc6MDA6JykgIT09IC0xIHx8IGguaW5kZXhPZignOjMwOicpICE9PSAtMTsgLy8g0LLRi9Cx0LjRgNCw0LXQvCDRgtC+0LvRjNC60L4g0L/QvtC70YPRh9Cw0YHQvtCy0YvQtSDQuNC90YLQtdGA0LLQsNC70YsKICB9KTsKCiAgaWYgKGRheV9vcHRpb25zKSB7CiAgICB2YXIgc3RhcnRfaG91ciA9IGRheV9vcHRpb25zLnN0YXJ0X2hvdXIsCiAgICAgICAgZW5kX2hvdXIgPSBkYXlfb3B0aW9ucy5lbmRfaG91cjsKICAgIHZhciBzdGFydF9pbmRleCA9IHN0YXJ0X2hvdXIgKiAyOwogICAgdmFyIGVuZF9pbmRleCA9IGVuZF9ob3VyICogMiArIDE7CiAgICBhbGxfaG91cnMgPSBhbGxfaG91cnMuc2xpY2Uoc3RhcnRfaW5kZXgsIGVuZF9pbmRleCk7CiAgfQoKICBmb3IgKHZhciBob3VySWR4ID0gMDsgaG91cklkeCA8IGFsbF9ob3Vycy5sZW5ndGg7IGhvdXJJZHgrKykgewogICAgdmFyIGhvdXIgPSBhbGxfaG91cnNbaG91cklkeF07CiAgICB2YXIgdmFsdWUgPSAiIi5jb25jYXQoZGF0ZV9wYXJ0LCAiVCIpLmNvbmNhdChob3VyLCAiLjAwMFoiKTsKICAgIGNlbGxzLnB1c2goewogICAgICB2YWx1ZTogdmFsdWUsCiAgICAgIGluZGV4OiBob3VySWR4LAogICAgICB2aXNpYmxlOiB0cnVlCiAgICB9KTsKICB9CgogIHJldHVybiBjZWxsczsKfTsKCnZhciBjb25zdHJ1Y3REYXlFdmVudHMgPSBmdW5jdGlvbiBjb25zdHJ1Y3REYXlFdmVudHMoZGF5LCBleGlzdGluZ19ldmVudHMpIHsKICB2YXIgZXZlbnRzX2Zvcl90aGlzX2RheSA9IGV4aXN0aW5nX2V2ZW50cy5tYXAoZnVuY3Rpb24gKGV2ZW50KSB7CiAgICB2YXIgZnJvbSA9IGV2ZW50LmZyb20sCiAgICAgICAgdG8gPSBldmVudC50bzsKICAgIGZyb20gPSBnZXRMb2NhbGVUaW1lKGZyb20pOwogICAgdG8gPSBnZXRMb2NhbGVUaW1lKHRvKTsKICAgIHJldHVybiBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgZXZlbnQpLCB7fSwgewogICAgICBmcm9tOiBmcm9tLAogICAgICB0bzogdG8KICAgIH0pOwogIH0pLmZpbHRlcihmdW5jdGlvbiAoX3JlZjQpIHsKICAgIHZhciBmcm9tID0gX3JlZjQuZnJvbTsKICAgIHJldHVybiBmcm9tLnNsaWNlKDAsIDEwKSA9PT0gZGF5LnNsaWNlKDAsIDEwKTsKICB9KTsKICBpZiAoZXZlbnRzX2Zvcl90aGlzX2RheS5sZW5ndGggPT09IDApIHJldHVybiB7fTsKICB2YXIgZmlsdGVyZWRfZXZlbnRzID0ge307CiAgZXZlbnRzX2Zvcl90aGlzX2RheS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkgewogICAgdmFyIGNvbnN0cnVjdGVkRXZlbnQgPSBjb25zdHJ1Y3ROZXdFdmVudChldmVudCk7CiAgICB2YXIga2V5ID0gY29uc3RydWN0ZWRFdmVudC5rZXk7CgogICAgaWYgKGZpbHRlcmVkX2V2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7CiAgICAgIGZpbHRlcmVkX2V2ZW50c1trZXldLnB1c2goY29uc3RydWN0ZWRFdmVudCk7CiAgICB9IGVsc2UgewogICAgICBmaWx0ZXJlZF9ldmVudHNba2V5XSA9IFtjb25zdHJ1Y3RlZEV2ZW50XTsKICAgIH0KICB9KTsKICByZXR1cm4gZmlsdGVyZWRfZXZlbnRzOwp9OwoKdmFyIGNvbnN0cnVjdE5ld0V2ZW50ID0gZnVuY3Rpb24gY29uc3RydWN0TmV3RXZlbnQoZXZlbnQpIHsKICB2YXIgZnJvbSA9IGV2ZW50LmZyb20sCiAgICAgIHRvID0gZXZlbnQudG87CiAgZnJvbSA9IG5ldyBEYXRlKGZyb20pOwogIHRvID0gbmV3IERhdGUodG8pOwogIGZyb20uc2V0VVRDU2Vjb25kcygwLCAwKTsKICB0by5zZXRVVENTZWNvbmRzKDAsIDApOwogIHZhciBmcm9tX3ZhbHVlID0gZnJvbS50b0lTT1N0cmluZygpOwogIHZhciBtYXNrZWRfZnJvbSA9IG5ldyBEYXRlKGZyb20uZ2V0VGltZSgpKTsKICB2YXIgbWFza2VkX3RvID0gbmV3IERhdGUodG8uZ2V0VGltZSgpKTsKICB2YXIgZnJvbURhdGEgPSB7CiAgICB2YWx1ZTogZnJvbV92YWx1ZSwKICAgIG1hc2tlZF92YWx1ZTogbWFza2VkX2Zyb20udG9JU09TdHJpbmcoKSwKICAgIHJvdW5kZWQ6IGZhbHNlLAogICAgcm91bmRfb2Zmc2V0OiBudWxsCiAgfTsKICB2YXIgdG9fdmFsdWUgPSB0by50b0lTT1N0cmluZygpOwogIHZhciB0b0RhdGEgPSB7CiAgICB2YWx1ZTogdG9fdmFsdWUsCiAgICBtYXNrZWRfdmFsdWU6IG1hc2tlZF90by50b0lTT1N0cmluZygpLAogICAgcm91bmRlZDogZmFsc2UsCiAgICByb3VuZF9vZmZzZXQ6IG51bGwKICB9OwoKICB2YXIgbXVsdGlwbGVPZjEwID0gZnVuY3Rpb24gbXVsdGlwbGVPZjEwKGRhdGVTdHIpIHsKICAgIHJldHVybiBuZXcgRGF0ZShkYXRlU3RyKS5nZXRNaW51dGVzKCkgJSAzMDsKICB9OwoKICBpZiAobXVsdGlwbGVPZjEwKGZyb21EYXRhLnZhbHVlKSAhPT0gMCkgewogICAgZnJvbURhdGEucm91bmRlZCA9IHRydWU7CiAgICBmcm9tRGF0YS5yb3VuZF9vZmZzZXQgPSBtdWx0aXBsZU9mMTAoZnJvbURhdGEudmFsdWUpOwogICAgdmFyIG1pbnV0ZXMgPSBuZXcgRGF0ZShmcm9tRGF0YS52YWx1ZSkuZ2V0TWludXRlcygpOwogICAgdmFyIG1hc2tlZE1pbnV0ZXMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyAzMCkgKiAzMDsKICAgIG1hc2tlZF9mcm9tLnNldE1pbnV0ZXMobWFza2VkTWludXRlcyk7CiAgICBmcm9tRGF0YS5tYXNrZWRfdmFsdWUgPSBtYXNrZWRfZnJvbS50b0lTT1N0cmluZygpOwogIH0KCiAgdmFyIGV2ZW50S2V5ID0gbWFza2VkX2Zyb20udG9JU09TdHJpbmcoKTsgLy8gMSBtaW51dGUgZXF1YWxzIDEgcGl4ZWwgaW4gb3VyIHZpZXcuIFRoYXQgbWVhbnMgd2UgbmVlZCB0byBmaW5kIHRoZSBsZW5ndGgKICAvLyBvZiB0aGUgZXZlbnQgYnkgZmluZGluZyBvdXQgdGhlIGRpZmZlcmVuY2UgaW4gbWludXRlcwoKICB2YXIgZGlmZkluTXMgPSB0byAtIGZyb207CiAgdmFyIGRpZmZJbkhycyA9IE1hdGguZmxvb3IoZGlmZkluTXMgJSA4NjQwMDAwMCAvIDM2MDAwMDApOwogIHZhciBkaWZmTWlucyA9IE1hdGgucm91bmQoZGlmZkluTXMgJSA4NjQwMDAwMCAlIDM2MDAwMDAgLyA2MDAwMCk7CiAgdmFyIGNvbnN0cnVjdGVkRXZlbnQgPSB7CiAgICBzdGFydDogZnJvbURhdGEsCiAgICBlbmQ6IHRvRGF0YSwKICAgIGRhdGE6IGV2ZW50LmRhdGEsCiAgICBpZDogZXZlbnQuaWQgfHwgZ2VuZXJhdGVVVUlEKCksCiAgICBkaXN0YW5jZTogZGlmZk1pbnMgKyBkaWZmSW5IcnMgKiA2MCwKICAgIHN0YXR1czogImNvbXBsZXRlZCIsCiAgICBrZXk6IGV2ZW50S2V5CiAgfTsgLy8gY29uc29sZS5sb2coIkNvbnN0cnVjdGVkIGV2ZW50OiIsIGNvbnN0cnVjdGVkRXZlbnQpOwoKICByZXR1cm4gY29uc3RydWN0ZWRFdmVudDsKfTsKCg==', null, false);
/* eslint-enable */var worker = new WorkerFactory();
var promiseWorker = PromiseWorker(worker);

var send = function send() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "message";
  var data = arguments.length > 1 ? arguments[1] : undefined;
  return promiseWorker.postMessage({
    type: type,
    data: data
  });
};

var myWorker = {
  send: send
};var script$8 = {
  props: {
    'day': {},
    'passedTime': {},
    kalendar_events: {
      required: true,
      type: Array,
      default: function _default() {
        return [];
      }
    },
    kalendar_work_hours: {
      required: true,
      type: Object,
      default: function _default() {}
    },
    isEditing: {
      required: true,
      type: Boolean,
      default: false
    },
    isShowEditPopup: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  created: function created() {
    // get and render day cells
    // and then render any event
    // on top of them
    this.renderDay();
  },
  components: {
    kalendarCell: function kalendarCell$1() {
      return Promise.resolve().then(function(){return kalendarCell});
    },
    kalendarWorkingTimeCell: function kalendarWorkingTimeCell$1() {
      return Promise.resolve().then(function(){return kalendarWorkingTimeCell});
    }
  },
  provide: function provide() {
    // provide these methods to children components
    // for easier access
    return {
      kalendarAddEvent: this.addEvent,
      kalendarClearPopups: this.clearCreatingLeftovers
    };
  },
  // inject kalendar options from parent component
  inject: ['kalendar_options'],
  mounted: function mounted() {
    if (this.kalendar_options.scrollToNow && this.isToday) this.scrollView();
  },
  computed: {
    isWeekend: function isWeekend$1() {
      return isWeekend(this.day.value);
    },
    isToday: function isToday$1() {
      return isToday(this.day.value);
    }
  },
  watch: {
    kalendar_work_hours: function kalendar_work_hours(value) {
      this.day_work_hours = value;
    },
    isEditing: function isEditing() {
      this.renderDay();
    }
  },
  data: function data() {
    return {
      // this is the main object
      // we use to make selections
      // and control their flows
      creator: {
        creating: false,
        starting_cell: null,
        original_starting_cell: null,
        current_cell: null,
        ending_cell: null,
        status: null
      },
      // temporary event is an object
      // that holds values of creator
      // when the popup is initiated
      temporary_event: null,
      temporary_work_hours: {},
      // day cells and events are used for rendering purposes
      day_cells: [],
      day_events: null,
      day_work_hours: null,
      creatingWorkTime: false
    };
  },
  methods: {
    renderDay: function renderDay() {
      var _this = this;

      myWorker.send("getDayCells", {
        day: !!this.day.value ? this.day.value : this.day,
        hourOptions: {
          start_hour: this.kalendar_options.day_starts_at,
          end_hour: this.kalendar_options.day_ends_at
        }
      }).then(function (reply) {
        _this.day_cells = reply;

        _this.getDayWorkHours();

        return _this.getDayEvents(_this.$kalendar.getEvents());
      });
    },
    addEvent: function addEvent(payload) {
      var _this2 = this;

      // validation
      var validation_message = this.checkEventValidity(payload);

      if (validation_message !== null) {
        return Promise.reject(validation_message);
      } // use web worker to generate event
      // and then render it in the day_events objects


      var from = payload.from,
          to = payload.to;
      from = getLocaleTime(from);
      to = getLocaleTime(to);
      return myWorker.send("constructNewEvent", {
        event: _objectSpread2(_objectSpread2({}, payload), {}, {
          from: from,
          to: to
        })
      }).then(function (constructed_event) {
        var key = constructed_event.key;

        if (_this2.day_events.hasOwnProperty(key)) {
          _this2.day_events[key].push(constructed_event);
        } else {
          // must use $set since key wasnt present in the object
          // vue will fail to render it
          _this2.$set(_this2.day_events, key, [constructed_event]);
        }

        var events = _this2.$kalendar.getEvents();

        events.push(_objectSpread2(_objectSpread2({}, payload), {}, {
          id: constructed_event.id
        }));

        _this2.$kalendar.updateEvents(events);
      });
    },
    // this is not called inside this component
    // but rather from the kalendar-weekview component
    // which targets it using $refs object.
    removeEvent: function removeEvent(payload) {
      var events = this.$kalendar.getEvents();
      var eventIndex = events.findIndex(function (event) {
        return event.id === payload.id;
      });
      if (eventIndex < 0) return;
      events.splice(eventIndex, 1);
      var index = this.day_events[payload.key].findIndex(function (event) {
        return event.id === payload.id;
      });
      this.day_events[payload.key].splice(index, 1);
      this.$kalendar.updateEvents(events);
      return Promise.resolve();
    },
    checkEventValidity: function checkEventValidity(payload) {
      var from = payload.from,
          to = payload.to;
      if (!from || !to) return "No dates were provided in the payload";
      /*if (isoFrom !== from) {
        return 'From date is not ISO format';
      }
      if (isoTo !== to) {
        return 'To date is not ISO format';
      }*/

      return null;
    },
    getDayEvents: function getDayEvents(events) {
      var _this3 = this;

      var clonedEvents = events.map(function (event) {
        return cloneObject(event);
      });
      return myWorker.send("constructDayEvents", {
        events: clonedEvents,
        day: this.day.value
      }).then(function (constructed_events) {
        _this3.day_events = constructed_events;
      });
    },
    clearCreatingLeftovers: function clearCreatingLeftovers() {
      for (var key in this.day_events) {
        var hasPending = this.day_events[key].some(function (event) {
          return event.status === "popup-initiated" || event.status === "creating";
        });

        if (hasPending) {
          var completed = this.day_events[key].filter(function (event) {
            return event.status === "completed";
          });
          this.$set(this.day_events, key, completed);

          if (completed.length === 0) {
            delete this.day_events[key];
          }
        }
      }

      this.resetEvents();
    },
    resetEvents: function resetEvents() {
      if (!this.creator.creating && this.creator.status === null) return;
      this.creator = {
        creating: false,
        starting_cell: null,
        original_starting_cell: null,
        current_cell: null,
        ending_cell: null,
        status: null,
        temporary_id: null
      };
      this.temporary_event = null;
    },
    // this method is what we use
    // to start the flow of selecting a new cell
    // while the creator is enabled
    updateCreator: function updateCreator(payload) {
      this.creator = _objectSpread2(_objectSpread2({}, this.validateSelection(payload)), {}, {
        status: "creating"
      });

      if (this.kalendar_options.overlap === false && Object.keys(this.day_events).length > 0) {
        var fixedOverlap = this.overlapPolice(payload);

        if (fixedOverlap) {
          this.creator = this.validateSelection(fixedOverlap);
          this.selectCell();
          this.initiatePopup();
          return;
        }
      }

      this.selectCell();
    },
    // when the direction is reversed,
    // the ending cell is actually the originally selected cell
    validateSelection: function validateSelection(event) {
      var original_starting_cell = event.original_starting_cell,
          starting_cell = event.starting_cell,
          current_cell = event.current_cell;

      if (event.direction === "reverse" && original_starting_cell.index > current_cell.index) {
        return _objectSpread2(_objectSpread2({}, event), {}, {
          starting_cell: current_cell,
          ending_cell: original_starting_cell
        });
      }

      return event;
    },
    selectCell: function selectCell() {
      if (!this.creator.creating) return;
      var _this$creator = this.creator,
          creating = _this$creator.creating,
          ending_cell = _this$creator.ending_cell,
          current_cell = _this$creator.current_cell,
          starting_cell = _this$creator.starting_cell,
          original_starting_cell = _this$creator.original_starting_cell;
      var real_ending_cell_index = ending_cell.index + 1;
      ending_cell = this.day_cells[real_ending_cell_index];
      var diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      var diffInHrs = Math.floor(diffInMs % 86400000 / 3600000);
      var diffMins = Math.round(diffInMs % 86400000 % 3600000 / 60000);
      var startDate = new Date(starting_cell.value);
      var endDate = new Date(ending_cell.value);
      var distance = diffMins + diffInHrs * 60;
      this.temporary_event = {
        start: {
          masked_value: startDate.toISOString(),
          value: startDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        end: {
          masked_value: endDate.toISOString(),
          value: endDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        distance: distance,
        status: "creating"
      };
    },
    initiatePopup: function initiatePopup() {
      if (this.creating && this.creator.status !== "creating") return;
      this.creator = _objectSpread2(_objectSpread2({}, this.creator), {}, {
        status: "popup-initiated",
        creating: false
      });
      var _this$creator2 = this.creator,
          ending_cell = _this$creator2.ending_cell,
          current_cell = _this$creator2.current_cell,
          starting_cell = _this$creator2.starting_cell,
          original_starting_cell = _this$creator2.original_starting_cell;
      var real_ending_cell_index = ending_cell.index + 1;
      ending_cell = this.day_cells[real_ending_cell_index];
      var diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      var diffInHrs = Math.floor(diffInMs % 86400000 / 3600000);
      var diffMins = Math.round(diffInMs % 86400000 % 3600000 / 60000);
      var startDate = new Date(starting_cell.value);
      var endDate = new Date(ending_cell.value);
      var finalEvent = {
        start: {
          masked_value: startDate.toISOString(),
          value: startDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        end: {
          masked_value: endDate.toISOString(),
          value: endDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        distance: diffMins + diffInHrs * 60,
        status: "popup-initiated"
      };
      var updated_events = this.day_events[starting_cell.value];
      if (!updated_events) updated_events = [];
      updated_events.push(finalEvent);
      this.$set(this.day_events, starting_cell.value, updated_events);
      this.temporary_event = null;
    },
    overlapPolice: function overlapPolice(payload) {
      var _this4 = this;

      if (!payload.current_cell) return;
      var overlapped = Object.keys(this.day_events).map(function (evKey) {
        return _this4.day_events[evKey];
      }).flat().filter(function (event) {
        var cellStart = new Date(payload.starting_cell.value);
        var cellEnd = new Date(payload.ending_cell.value);
        var eventStarts = new Date(event.start.value);
        var eventEnds = new Date(event.end.value);
        return cellEnd > eventStarts && cellEnd < eventEnds || cellStart < eventStarts && cellEnd > eventStarts;
      });

      if (!overlapped || overlapped.length === 0) {
        return;
      }

      var newPayload = payload;

      if (payload.direction === "reverse") {
        var needed_cell = overlapped[0].end;
        var event_cell = this.day_cells.find(function (c) {
          return c.value === needed_cell.masked_value;
        });
        var cell = this.day_cells[event_cell.index];
        newPayload.starting_cell = {
          value: cell.value,
          index: cell.index
        };
        newPayload.current_cell = {
          value: cell.value,
          index: cell.index
        };
      } else {
        var _needed_cell = overlapped[0].start;

        var _event_cell = this.day_cells.find(function (c) {
          return c.value === _needed_cell.masked_value;
        });

        var _cell = this.day_cells[_event_cell.index - 1];
        newPayload.ending_cell = {
          value: _cell.value,
          index: _cell.index
        };
      }

      return newPayload;
    },
    scrollView: function scrollView() {
      var topoffset = this.$refs.nowIndicator.offsetTop; // console.log("Scrolling to :", topoffset);

      setTimeout(function () {
        window.scroll({
          top: topoffset,
          left: 0,
          behavior: "smooth"
        });
      }, 500);
    },

    /* working hours */
    getDayWorkHours: function getDayWorkHours() {
      this.day_work_hours = this.$kalendar.getWorkHours();
    },
    selectCellWorkHours: function selectCellWorkHours(value) {
      this.creatingWorkTime = true;

      if (this.day_work_hours[value] !== undefined) {
        this.$kalendar.removeWorkHours(value);
        this.$delete(this.temporary_work_hours, value);
        this.getDayWorkHours();
      } else {
        this.$set(this.temporary_work_hours, value, '');
      }
    },
    addSelectWorkHours: function addSelectWorkHours() {
      this.creatingWorkTime = false;

      var hours = _objectSpread2(_objectSpread2({}, this.day_work_hours), this.temporary_work_hours);

      this.$kalendar.updateWorkHours(hours);
      this.getDayWorkHours();
      this.temporary_work_hours = {};
    }
  }
};/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ul', {
    ref: _vm.day.value + '-reference',
    staticClass: "kalendar-day",
    class: {
      'is-weekend': _vm.isWeekend,
      'is-today': _vm.isToday,
      creating: _vm.creator.creating || _vm.creator.status === 'popup-initiated'
    },
    staticStyle: {
      "position": "relative"
    }
  }, [_vm.isToday ? _c('div', {
    ref: "nowIndicator",
    class: _vm.kalendar_options.style === 'material_design' ? 'hour-indicator-line' : 'hour-indicator-tooltip',
    style: "top:" + _vm.passedTime + "px"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.kalendar_options.style === 'material_design',
      expression: "kalendar_options.style === 'material_design'"
    }],
    staticClass: "line"
  })]) : _vm._e(), _vm._v(" "), !_vm.kalendar_options.working_hours ? _vm._l(_vm.day_cells, function (cell, index) {
    return _c('kalendar-cell', {
      key: "cell-" + index,
      attrs: {
        "constructed-events": _vm.day_events,
        "creator": _vm.creator,
        "cell-data": cell,
        "index": index,
        "temporary-event": _vm.temporary_event,
        "constructed-work-hours": _vm.day_work_hours,
        "kalendar_events": _vm.kalendar_events,
        "isShowEditPopup": _vm.isShowEditPopup
      },
      on: {
        "select": _vm.updateCreator,
        "reset": function reset($event) {
          return _vm.resetEvents();
        },
        "initiatePopup": function initiatePopup($event) {
          return _vm.initiatePopup();
        }
      }
    });
  }) : _vm._l(_vm.day_cells, function (cell, index) {
    return _c('kalendar-working-time-cell', {
      key: "cell1-" + index,
      attrs: {
        "creatingWorkTime": _vm.creatingWorkTime,
        "cell-data": cell,
        "index": index,
        "constructed-work-hours": _vm.day_work_hours,
        "temporaryWorkHours": _vm.temporary_work_hours
      },
      on: {
        "selectWorkHours": _vm.selectCellWorkHours,
        "addSelectWorkHours": _vm.addSelectWorkHours
      }
    });
  })], 2);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0cb4272a_0", {
    source: "ul.kalendar-day{position:relative;background-color:#fff}ul.kalendar-day:hover{background:rgba(32,137,255,.1)}ul.kalendar-day.is-weekend{background-color:var(--weekend-color)}ul.kalendar-day.is-today{border-left:1px solid var(--main-color)}ul.kalendar-day .clear{position:absolute;z-index:1;top:-20px;right:0;font-size:10px}ul.kalendar-day.creating{z-index:11}ul.kalendar-day.creating .created-event{pointer-events:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, createInjector, undefined, undefined);//
var script$9 = {
  props: {
    current_day: {
      required: true,
      type: String,
      validator: function validator(d) {
        return !isNaN(Date.parse(d));
      }
    },
    kalendar_work_hours: {
      required: true,
      type: Object,
      default: function _default() {}
    },
    kalendar_events: {
      required: true,
      type: Array,
      default: function _default() {
        return [];
      }
    },
    isEditing: {
      required: true,
      type: Boolean,
      default: false
    },
    isShowEditPopup: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  components: {
    KalendarDay: __vue_component__$8
  },
  created: function created() {
    var _this = this;

    this.addHelperMethods();
    setInterval(function () {
      return _this.kalendar_options.now = new Date();
    }, 1000 * 60);
    this.constructWeek();
  },
  inject: ["kalendar_options"],
  data: function data() {
    return {
      hours: null,
      days: []
    };
  },
  computed: {
    hoursVisible: function hoursVisible() {
      if (!this.hours) return [];
      return this.hours.filter(function (x) {
        return !!x.visible;
      });
    },
    colsSpace: function colsSpace() {
      return this.kalendar_options.style === "flat_design" ? "5px" : "0px";
    },
    hourHeight: function hourHeight() {
      return 2 * this.kalendar_options.cell_height; //this.kalendar_options.cell_height * (60 / this.kalendar_options.split_value);
      // * this.kalendar_options.hour_parts;
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
    _isToday: function _isToday(day) {
      return isToday(day);
    },
    updateAppointments: function updateAppointments(_ref) {
      var id = _ref.id,
          data = _ref.data;
      this.$emit("update", {
        id: id,
        data: data
      });
    },
    deleteAppointment: function deleteAppointment(id) {
      this.$emit("delete", {
        id: id
      });
    },
    clearAppointments: function clearAppointments() {
      this.$emit("clear");
    },
    isDayBefore: function isDayBefore(day) {
      var now = new Date(this.kalendar_options.now);
      var formattedNow = getLocaleTime(now.toISOString());
      return isBefore(day, getHourlessDate(formattedNow));
    },
    constructWeek: function constructWeek() {
      var _this2 = this;

      var date = this.current_day.slice(0, 10);
      var _this$kalendar_option2 = this.kalendar_options,
          hide_dates = _this$kalendar_option2.hide_dates,
          hide_days = _this$kalendar_option2.hide_days,
          view_type = _this$kalendar_option2.view_type;
      return Promise.all([myWorker.send("getDays", {
        day: date,
        options: {
          hide_dates: hide_dates,
          hide_days: hide_days,
          view_type: view_type
        }
      }).then(function (reply) {
        _this2.days = reply; //.slice(0,1);
      }), myWorker.send("getHours", {
        hourOptions: {
          start_hour: this.kalendar_options.day_starts_at,
          end_hour: this.kalendar_options.day_ends_at
        }
      }).then(function (reply) {
        // Handle the reply
        _this2.hours = reply;
      })]);
    },
    addHelperMethods: function addHelperMethods() {
      var _this3 = this;

      this.$kalendar.buildWeek = function () {
        _this3.constructWeek();
      };

      this.$kalendar.addNewEvent = function (payload) {
        if (!payload) return Promise.reject("No payload");
        var from = payload.from,
            to = payload.to;
        if (from.slice(-4) === "000Z") payload.from = addTimezoneInfo(from);
        if (to.slice(-4) === "000Z") payload.to = addTimezoneInfo(to);
        var targetRef = payload.from.slice(0, 10);
        var refObject = _this3.$refs[targetRef];

        if (refObject && refObject[0]) {
          refObject[0].addEvent(payload);
        } else {
          // appointment is not in this view
          var events = _this3.$kalendar.getEvents();

          events.push(payload);

          _this3.$kalendar.updateEvents(events);
        }
      };

      this.$kalendar.saveEvent = function (payload) {
        var events = _this3.$kalendar.getEvents();

        var findEventIndex = events.findIndex(function (ev) {
          return payload.id === ev.id;
        });

        if (findEventIndex !== -1) {
          events[findEventIndex] = payload;
        } else {
          events.push(payload);
        }

        _this3.$kalendar.updateEvents(events);
      };

      this.$kalendar.removeEvent = function (options) {
        var day = options.day,
            key = options.key,
            id = options.id;

        if (day.length > 10) {
          day = day.slice(0, 10);
        }

        if (!day) return Promise.reject("Day wasn't provided");
        if (!id) return Promise.reject("No ID was provided");
        if (!key) return Promise.reject("No key was provided in the object");
        var targetRef = day;

        _this3.$refs[targetRef][0].removeEvent({
          id: id,
          key: key
        });
      };

      this.$kalendar.closePopups = function () {
        var refs = _this3.days.map(function (day) {
          return day.value.slice(0, 10);
        });

        refs.forEach(function (ref) {
          _this3.$refs[ref][0].clearCreatingLeftovers();
        });
      };
    }
  }
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
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
  }, _vm._l(_vm.days || [], function (ref, index) {
    var value = ref.value;
    return _c('li', {
      key: index,
      staticClass: "day-indicator",
      class: {
        today: _vm._isToday(value),
        'is-before': _vm.isDayBefore(value)
      }
    }, [_c('div', [_c('span', {
      staticClass: "letters-date"
    }, [_vm._v(_vm._s(_vm.kalendar_options.formatDayTitle(value)[0]))]), _vm._v(" "), _c('span', {
      staticClass: "number-date"
    }, [_vm._v(_vm._s(_vm.kalendar_options.formatDayTitle(value)[1]))])])]);
  }), 0), _vm._v(" "), _c('ul', {
    staticClass: "all-day"
  }, [_c('span', [_vm._v("All Day")]), _vm._v(" "), _vm._l(_vm.days || [], function (date, index) {
    return _c('li', {
      key: index,
      class: {
        'all-today': _vm._isToday(date.value),
        'is-all-day': false
      },
      style: "height:" + (_vm.kalendar_options.cell_height + 5) + "px"
    });
  })], 2)]), _vm._v(" "),  _vm._e(), _vm._v(" "), _vm.hours ? _c('div', {
    staticClass: "blocks"
  }, [_c('div', {
    staticClass: "calendar-blocks"
  }, [_c('ul', {
    staticClass: "hours"
  }, _vm._l(_vm.hoursVisible, function (hour, index) {
    return _c('li', {
      key: index,
      staticClass: "hour-row-identifier",
      style: "height:" + _vm.hourHeight + "px"
    }, [_c('span', [_vm._v("\n            " + _vm._s(_vm.kalendar_options.formatLeftHours(hour.value)) + "\n          ")])]);
  }), 0), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.kalendar_options.style !== 'material_design',
      expression: "kalendar_options.style !== 'material_design'"
    }],
    staticClass: "hour-indicator-line",
    style: "top:" + _vm.passedTime.distance + "px"
  }, [_c('span', {
    staticClass: "time-value"
  }, [_vm._v(_vm._s(_vm.passedTime.value))]), _vm._v(" "), _c('span', {
    staticClass: "line"
  })]), _vm._v(" "), _vm._l(_vm.days, function (day, index) {
    return _c('kalendar-day', {
      key: day.value.slice(0, 10),
      ref: day.value.slice(0, 10),
      refInFor: true,
      staticClass: "building-blocks",
      class: "day-" + (index + 1),
      attrs: {
        "day": day,
        "passed-time": _vm.passedTime.distance,
        "kalendar_events": _vm.kalendar_events,
        "kalendar_work_hours": _vm.kalendar_work_hours,
        "isEditing": _vm.isEditing,
        "isShowEditPopup": _vm.isShowEditPopup
      }
    });
  })], 2)]) : _vm._e()]);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-08160daa_0", {
    source: ".calendar-wrap{display:flex;flex-direction:column}.calendar-wrap ul{list-style:none;padding:0}.calendar-wrap ul>li{display:flex}.sticky-top{position:sticky;top:0;z-index:20;background:#fff}.sticky-top .days{margin:0;display:flex;margin-left:55px}.sticky-top .days li{display:inline-flex;align-items:flex-end;padding-top:10px;flex:1;font-size:1.1rem;color:#666;font-weight:300;margin-right:var(--space-between-cols);border-bottom:solid 1px #e5e5e5;padding-bottom:5px;position:relative;font-size:18px}.sticky-top .days li span{margin-right:3px}.sticky-top .days li span:first-child{font-size:20px;font-weight:500}.sticky-top .days .today{border-bottom-color:var(--main-color);color:var(--main-color)!important}.sticky-top .days .today::after{content:\"\";position:absolute;height:2px;bottom:0;left:0;width:100%;background-color:var(--main-color)}.sticky-top .all-day{display:flex;margin-bottom:0;margin-top:0;border-bottom:solid 2px #e5e5e5}.sticky-top .all-day span{display:flex;align-items:center;padding:0 5px;width:55px;font-weight:500;font-size:.8rem;color:#b8bbca;text-transform:lowercase}.sticky-top .all-day li{flex:1;margin-right:var(--space-between-cols)}.sticky-top .all-day li.all-today{background-color:#fef4f4}.dummy-row{display:flex;padding-left:55px}.dummy-row ul{display:flex;flex:1;margin:0}.dummy-row li{flex:1;height:15px;margin-right:var(--space-between-cols);border-bottom:solid 1px #e5e5e5}.blocks{display:flex;position:relative;height:100%}.blocks ul{margin-top:0}.blocks .building-blocks{flex:1;margin-right:var(--space-between-cols);margin-bottom:0;display:flex;flex-direction:column}.blocks .calendar-blocks{width:100%;display:flex;position:relative;padding:0 50px 0 0}.hours{display:flex;flex-direction:column;color:#b8bbca;font-weight:500;font-size:.85rem;width:55px;height:100%;margin-bottom:0}.hours li{color:var(--hour-row-color);border-bottom:solid 1px transparent;padding-left:8px}.hours li span{margin-top:-8px}.hours li:first-child span{padding-top:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, createInjector, undefined, undefined);var kalendarWeekview=/*#__PURE__*/Object.freeze({__proto__:null,'default': __vue_component__$9});var script$a = {
  props: {
    styling: {
      type: Object
    },
    backgroundBar: {
      type: String,
      default: '#C4C4C4'
    }
  },
  computed: {
    cssProps: function cssProps() {
      return {
        '--bg-color': this.backgroundBar
      };
    }
  },
  mounted: function mounted() {
    var vb = this.$refs.vueBar;
    var el = vb.querySelector('.vb-content');
    var sel = el.querySelector('.selected');
    var top = null;
    var h = null;

    if (sel) {
      top = sel.offsetTop;
      h = el.offsetHeight / 2; // half height .vb-content
    }

    if (top !== null && top > h) el.scrollTop = top - h;
  }
};/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "bar",
      rawName: "v-bar",
      value: {
        preventParentScroll: true,
        scrollThrottle: 30
      },
      expression: "{ \n    preventParentScroll: \n    true, scrollThrottle: 30 \n  }"
    }],
    ref: "vueBar",
    staticClass: "vuebar-element",
    style: [_vm.styling, _vm.cssProps]
  }, [_c('div', [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-061df6bf_0", {
    source: ".vue-scrollbar__wrapper{background:0 0}.vue-scrollbar__scrollbar-vertical{width:.2rem;height:92%;top:.4rem;bottom:.4rem;right:.4rem}.vue-scrollbar__scrollbar-vertical .scrollbar{width:.2rem;border-radius:.2rem}.b-scroll-bar{background-color:var(--bg-color)}.b-scroll-bar .scrollbar{background-color:var(--bg-color)}.vuebar-element{height:100%;width:100%}.vb>.vb-dragger{z-index:5;width:10px;right:0}.vb>.vb-dragger>.vb-dragger-styler{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:rotate3d(0,0,0,0);transform:rotate3d(0,0,0,0);-webkit-transition:background-color .1s ease-out,margin .1s ease-out,height .1s ease-out;transition:background-color .1s ease-out,margin .1s ease-out,height .1s ease-out;background-color:var(--bg-color);opacity:.5;margin:5px 5px 5px 0;border-radius:20px;height:calc(100% - 10px);min-height:2px;display:block}.vb-invisible>.vb-dragger>.vb-dragger-styler{display:none}.vb.vb-scrolling-phantom>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);opacity:.3}.vb>.vb-dragger:hover>.vb-dragger-styler{background-color:var(--bg-color);margin:0;height:100%;opacity:.5}.vb.vb-dragging>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);margin:0;height:100%;opacity:.5}.vb.vb-dragging-phantom>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);opacity:.5}.vb-content::-webkit-scrollbar{display:none;scrollbar-width:none}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, createInjector, undefined, undefined);var scrollContainer=/*#__PURE__*/Object.freeze({__proto__:null,'default': __vue_component__$a});//
var script$b = {
  name: "kalendar-daymonth",
  components: {
    KalendarEvent: function KalendarEvent() {
      return Promise.resolve().then(function(){return kalendarEvent});
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
};/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function __vue_render__() {
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

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3674cae9_0", {
    source: ".calendar-day[data-v-3674cae9]{border-bottom:solid 1px var(--table-cell-border-color);border-left:solid 1px var(--table-cell-border-color);margin:0;padding:.3rem;height:120px}.calendar-day>li[data-v-3674cae9]{list-style:none;border:none!important;display:block;position:relative}.calendar-day.is-weekend[data-v-3674cae9]{background-color:#f7f7f7}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$b = "data-v-3674cae9";
/* module identifier */

var __vue_module_identifier__$b = undefined;
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);var kalendarDaymonth=/*#__PURE__*/Object.freeze({__proto__:null,'default': __vue_component__$b});var script$c = {
  props: ['creator', 'index', 'cellData', 'constructedEvents', 'constructedWorkHours', 'temporaryEvent', 'kalendar_events', 'isEditing', 'isShowEditPopup'],
  inject: ['kalendar_options'],
  components: {
    KalendarEvent: function KalendarEvent() {
      return Promise.resolve().then(function(){return kalendarEvent});
    }
  },
  computed: {
    cell_events: function cell_events() {
      var all_events = [];

      if (this.completed_events) {
        all_events = all_events.concat(this.completed_events);
      }

      if (this.being_created) {
        all_events = all_events.concat(this.being_created);
      }

      return all_events;
    },
    completed_events: function completed_events() {
      return this.constructedEvents && this.constructedEvents.hasOwnProperty(this.cellData.value) && this.constructedEvents[this.cellData.value];
    },
    being_created: function being_created() {
      return this.temporaryEvent && this.temporaryEvent.start.value === this.cellData.value && this.temporaryEvent;
    },
    overlappingEvents: function overlappingEvents() {
      var _this = this;

      if (!this.constructedEvents || this.cell_events.length < 1) return [];
      return Object.values(this.constructedEvents).flat().filter(function (event) {
        var cellDate = new Date(_this.cellData.value);
        var eventStarts = new Date(event.start.value);
        var eventEnds = new Date(event.end.value);
        return eventStarts < cellDate && eventEnds > cellDate;
      });
    },
    overlapValue: function overlapValue() {
      var length = this.overlappingEvents.length;
      return length > 2 ? 2 : length;
    },
    selected: function selected() {
      return this.cell_events && this.cell_events.length > 0;
    },
    hasPopups: function hasPopups() {
      return this.selected && !!this.cell_events.find(function (ev) {
        return ev.status === 'popup-initiated';
      });
    },
    isConstructed: function isConstructed() {
      return this.cellData.value in this.constructedWorkHours;
    }
  },
  methods: {
    mouseDown: function mouseDown() {
      // user mouse got depressed while outside kalendar-cells
      // came back in and clicked while the creator was on
      if (!!this.creator.creating) {
        this.mouseUp();
        return;
      }

      var _this$kalendar_option = this.kalendar_options,
          read_only = _this$kalendar_option.read_only,
          overlap = _this$kalendar_option.overlap,
          past_event_creation = _this$kalendar_option.past_event_creation;
      if (read_only) return; // if past_event_creation is set to false, check if cell value is
      // before current time

      if (past_event_creation === false) {
        var now = getLocaleTime(new Date());

        if (new Date(now) > new Date(this.cellData.value)) {
          this.mouseUp();
          return;
        }
      } // if overlap is set to false, prevent selection on top of
      // other events


      if (!overlap && this.cell_events.length > 0) return; // close any open popups in the whole kalendar instance
      // before starting a new one

      this.$kalendar.closePopups(); // create a payload consisting of
      // starting, current, ending and originalStarting cell
      // starting, current and ending are self explanatory
      // but originalStarting cell is required
      // to determine the direction of the scroll/drag

      var payload = {
        creating: true,
        original_starting_cell: cloneObject(this.cellData),
        starting_cell: cloneObject(this.cellData),
        current_cell: cloneObject(this.cellData),
        ending_cell: cloneObject(this.cellData)
      };
      this.$emit('select', payload);
    },
    mouseMove: function mouseMove() {
      // same guards like in the mouseDown function
      var _this$kalendar_option2 = this.kalendar_options,
          read_only = _this$kalendar_option2.read_only,
          overlap = _this$kalendar_option2.overlap;
      if (read_only) return;
      if (this.creator && !this.creator.creating) return;
      var _this$creator = this.creator,
          starting_cell = _this$creator.starting_cell,
          original_starting_cell = _this$creator.original_starting_cell,
          creating = _this$creator.creating; // direction of scroll

      var going_down = this.cellData.index >= starting_cell.index && starting_cell.index === original_starting_cell.index;

      if (creating) {
        var payload = _objectSpread2(_objectSpread2({}, this.creator), {}, {
          current_cell: this.cellData,
          ending_cell: this.cellData,
          direction: going_down ? 'normal' : 'reverse'
        });

        this.$emit('select', payload);
      }
    },
    mouseUp: function mouseUp() {
      if (this.kalendar_options.read_only) return;

      if (this.creator.creating) {
        this.$emit('initiatePopup');
      }
    },
    resetCreator: function resetCreator() {
      this.$emit('reset');
    }
  }
};/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.cellData.visible ? _c('li', {
    staticClass: "kalendar-cell",
    class: {
      selected: _vm.selected,
      'is-an-hour': (_vm.index + 1) % (60 / 30) === 0,
      'has-events': _vm.cell_events && _vm.cell_events.length > 0,
      'being-created': !!_vm.being_created || _vm.hasPopups,
      'work-time': _vm.isConstructed
    },
    style: "height: " + _vm.kalendar_options.cell_height + "px;",
    on: {
      "mouseover": function mouseover($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }

        return _vm.mouseMove();
      },
      "mousedown": function mousedown($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }

        return _vm.mouseDown();
      },
      "mouseup": function mouseup($event) {
        return _vm.mouseUp();
      }
    }
  }, _vm._l(_vm.cell_events, function (event, eventIndex) {
    return _vm.cell_events && _vm.cell_events.length ? _c('KalendarEvent', {
      key: eventIndex,
      attrs: {
        "event": event,
        "total": _vm.cell_events.length,
        "index": eventIndex,
        "overlaps": _vm.overlapValue,
        "day_events": _vm.constructedEvents,
        "kalendar_events": _vm.kalendar_events,
        "isEditing": _vm.isEditing,
        "isShowEditPopup": _vm.isShowEditPopup
      }
    }) : _vm._e();
  }), 1) : _vm._e();
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-d02ce4b6_0", {
    source: "li{font-size:13px;position:relative}.created-events{height:100%}ul.building-blocks li{z-index:0;border-bottom:dotted 1px var(--odd-cell-border-color)}ul.building-blocks li.first_of_appointment{z-index:1;opacity:1}ul.building-blocks li.is-an-hour{border-bottom:solid 1px var(--table-cell-border-color)}ul.building-blocks li.has-events{z-index:unset}ul.building-blocks li.being-created{z-index:11}ul.building-blocks li.work-time{background-color:#7afFD766}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = undefined;
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);var kalendarCell=/*#__PURE__*/Object.freeze({__proto__:null,'default': __vue_component__$c});//
var script$d = {
  props: ['creatingWorkTime', 'index', 'cellData', 'constructedWorkHours', 'temporaryWorkHours'],
  inject: ['kalendar_options'],
  computed: {
    isConstructed: function isConstructed() {
      return this.cellData.value in this.constructedWorkHours;
    },
    isSelectedTemp: function isSelectedTemp() {
      return this.cellData.value in this.temporaryWorkHours;
    }
  },
  data: function data() {
    return {
      selected: []
    };
  },
  directives: {
    selectable: selectable
  },
  methods: {
    selectedSetter: function selectedSetter(v) {
      this.selected = v;
    },
    getTime: getTime,
    mouseDown: function mouseDown() {
      this.$emit('selectWorkHours', this.cellData.value);
    },
    mouseMove: function mouseMove() {
      if (this.creatingWorkTime) {
        this.$emit('selectWorkHours', this.cellData.value);
      }
    },
    mouseUp: function mouseUp() {
      if (this.creatingWorkTime) {
        this.$emit('addSelectWorkHours');
      }
    }
  }
};/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('li', {
    directives: [{
      name: "selectable",
      rawName: "v-selectable",
      value: {
        selectedSetter: _vm.selectedSetter
      },
      expression: "{ selectedSetter: selectedSetter }"
    }],
    staticClass: "kalendar-cell --work-time",
    class: {
      'selected-work-time': _vm.isConstructed || _vm.isSelectedTemp,
      'is-an-hour': (_vm.index + 1) % 2 === 0 // у каждого шестого рисуем нижнию рамку для окончания часа

    },
    style: "height: " + _vm.kalendar_options.cell_height + "px;",
    on: {
      "mouseover": function mouseover($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }

        return _vm.mouseMove();
      },
      "mousedown": function mousedown($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }

        return _vm.mouseDown();
      },
      "mouseup": function mouseup($event) {
        return _vm.mouseUp();
      }
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.getTime(_vm.cellData.value)))])]);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$d = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-f9139950_0", {
    source: "li[data-v-f9139950]{font-size:13px;position:relative}.created-events[data-v-f9139950]{height:100%}ul.building-blocks li[data-v-f9139950]{z-index:0}ul.building-blocks li.--work-time[data-v-f9139950]{justify-content:flex-end;font-size:9px;color:var(--main-color);user-select:none;font-weight:700}ul.building-blocks li.first_of_appointment[data-v-f9139950]{z-index:1;opacity:1}ul.building-blocks li.is-an-hour[data-v-f9139950]{border-bottom:solid 1px var(--table-cell-border-color)}ul.building-blocks li.has-events[data-v-f9139950]{z-index:unset}ul.building-blocks li.being-created[data-v-f9139950]{z-index:11}ul.building-blocks li.selected-work-time[data-v-f9139950]{background:#7afFD766}ul.building-blocks li>span[data-v-f9139950]{display:none}ul.building-blocks li[data-v-f9139950]:hover{border-bottom:1px solid var(--main-color)}ul.building-blocks li:hover span[data-v-f9139950]{text-align:right;display:block;padding-bottom:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$d = "data-v-f9139950";
/* module identifier */

var __vue_module_identifier__$d = undefined;
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, createInjector, undefined, undefined);var kalendarWorkingTimeCell=/*#__PURE__*/Object.freeze({__proto__:null,'default': __vue_component__$d});var script$e = {
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
};/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function __vue_render__() {
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

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$e = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1803549c_0", {
    source: ".event-card{display:flex;flex-direction:column;height:100%;width:100%;z-index:5;color:#fff;user-select:none;will-change:height}.event-card h4,.event-card p{margin:0}.event-card>*{flex:1;position:relative}.event-card.editing{z-index:10}.event-card.creating{z-index:-1}.event-card.overlaps>*{border:solid 1px #fff!important}.event-card__mini .created-event>div>.details-card small{display:none}.event-card__mini .appointment-title,.event-card__mini .time{position:absolute;top:0;font-size:9px;line-height:1;z-index:1;overflow:visible;height:100%}.event-card__small .appointment-title{font-size:80%}.event-card__small .time{font-size:70%}.event-card.two-in-one .details-card>*{font-size:60%}.event-card.is-flat{margin-bottom:3px}.event-card.is-flat .details-card>small{display:none}.event-card.is-flat .remove{top:1px}.event-card:not(.is-flat){position:absolute;pointer-events:none;top:0;left:0;right:0;bottom:0}.event-card h1,.event-card h2,.event-card h3,.event-card h4,.event-card h5,.event-card h6,.event-card p{margin:0}.time{position:absolute;bottom:0;right:0;font-size:11px}.popup-wrapper{text-shadow:none;color:#000;z-index:10;position:absolute;top:0;left:calc(100% + 5px);display:flex;flex-direction:column;pointer-events:all;user-select:none;background-color:#fff;border:solid 1px rgba(0,0,0,.08);border-radius:4px;box-shadow:0 2px 12px -3px rgba(0,0,0,.3);padding:10px}.popup-wrapper h4{color:#000;font-weight:400}.popup-wrapper input,.popup-wrapper textarea{border:none;background-color:#ebebeb;color:#030303;border-radius:4px;padding:5px 8px;margin-bottom:5px}.created-event{pointer-events:all;position:relative}.created-event>.details-card{max-width:100%;width:100%}.created-event>.details-card h2,.created-event>.details-card h3,.created-event>.details-card h4,.created-event>.details-card p,.created-event>.details-card small,.created-event>.details-card span,.created-event>.details-card strong,.created-event>.details-card>h1{text-overflow:ellipsis;overflow:hidden;display:block}ul:nth-last-child(-n+3) .popup-wrapper{left:auto;right:100%;margin-right:10px}.day-view ul .popup-wrapper{left:auto;right:auto;width:calc(100% - 10px);top:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$e = undefined;
/* module identifier */

var __vue_module_identifier__$e = undefined;
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, createInjector, undefined, undefined);var kalendarEvent=/*#__PURE__*/Object.freeze({__proto__:null,'default': __vue_component__$e});exports.Kalendar=__vue_component__$6;exports.default=plugin;