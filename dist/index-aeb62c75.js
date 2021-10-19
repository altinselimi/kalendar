import Vue from 'vue';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';

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

//
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
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
var script$1 = {
  name: "kalendar-x-button"
};

/* script */
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
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var script$2 = {
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
};

/* script */
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
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

var script$3 = {
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
};

/* script */
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
    staticClass: "b-pth-base-select"
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
  inject("data-v-6e96159a_0", {
    source: ".b-pth-base-select[data-v-6e96159a]{width:100%;height:3.4rem;max-width:50rem;position:relative;display:flex;background-color:#fff;border-bottom:1px solid #dadada;transition:border-color .2s ease;cursor:pointer}.b-pth-base-select *[data-v-6e96159a]{user-select:none}.b-pth-base-select__container[data-v-6e96159a]{display:flex;justify-content:space-between;align-items:center;width:100%;padding:.5rem 1.5rem}.b-pth-base-select__name[data-v-6e96159a]{font-size:1.4rem;line-height:1.8rem;color:#777;cursor:pointer;white-space:nowrap;max-width:95%;overflow:hidden;text-overflow:ellipsis}.b-pth-base-select__name input[data-v-6e96159a]{border:transparent solid 1px}.b-pth-base-select__arrow[data-v-6e96159a]{width:.8rem}.b-pth-base-select__icon[data-v-6e96159a]{margin:0;display:block!important}.b-pth-base-select__icon_up[data-v-6e96159a]{transform:rotate(-180deg);transition:all .2s cubic-bezier(1,.5,.8,1);fill:#000}.b-pth-base-select__dropdown[data-v-6e96159a]{transition:all .2s cubic-bezier(1,.5,.8,1);border-top:none;overflow:hidden;background:#fff;position:absolute;top:100%;left:0;right:0;z-index:999;margin:.2rem .1rem;padding:0;box-shadow:0 4px 4px rgba(0,0,0,.25);border-radius:5px}.b-pth-base-select__options[data-v-6e96159a]{margin:0;padding:0;min-height:6rem}.b-pth-base-select__options._mt[data-v-6e96159a]{margin:1rem 0 0}.b-pth-base-select__options-item[data-v-6e96159a]{padding:1.2rem 24px;line-height:1.6rem;font-size:1.4rem;list-style:none;color:#272727;transition:all .2s cubic-bezier(1,.5,.8,1)}.b-pth-base-select__options-item._fixed[data-v-6e96159a]{top:0;right:0;left:0}.b-pth-base-select__options-item._fixed input[data-v-6e96159a]{width:100%}.b-pth-base-select__options-item[data-v-6e96159a]:last-child{border-bottom:none}.b-pth-base-select__options-item.selected[data-v-6e96159a],.b-pth-base-select__options-item[data-v-6e96159a]:hover{background-color:rgba(0,173,182,.05)}.vue-scrollbar__scrollbar-vertical[data-v-6e96159a]{width:.4rem;height:92%;top:.4rem;bottom:.4rem;right:.4rem}.vue-scrollbar__scrollbar-vertical .scrollbar[data-v-6e96159a]{width:.4rem;border-radius:.4rem}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = "data-v-6e96159a";
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

//
var script$4 = {
  name: "BaseTimeSelect",
  components: {
    VueTimepicker: VueTimepicker
  },
  props: ['time', 'hourRange', 'error'],
  data: function data() {
    return {
      vTime: this.time
    };
  },
  methods: {
    changeTime: function changeTime(value) {
      this.$emit('changeTime', value);
    }
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "b-time-select",
    class: {
      '--error': _vm.error
    }
  }, [_c('vue-timepicker', {
    attrs: {
      "format": "HH:mm",
      "hide-clear-button": "",
      "close-on-complete": "",
      "auto-scroll": "",
      "minute-interval": 10,
      "hour-range": [_vm.hourRange]
    },
    on: {
      "change": _vm.changeTime
    },
    model: {
      value: _vm.vTime,
      callback: function callback($$v) {
        _vm.vTime = $$v;
      },
      expression: "vTime"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "b-time-select__arrow"
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
  })])])], 1);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-343c5144_0", {
    source: ".b-time-select{display:flex;align-items:center;border-bottom:1px solid #dadada}.b-time-select__arrow{position:relative;top:-2px}.b-time-select.--error{color:#ec4d3d;border-bottom:1px solid #ec4d3d}.vue__time-picker{width:5rem!important}.vue__time-picker input.display-time{width:5rem!important;background-color:#fff;border:none!important;margin:0;transition:border-color .2s ease;cursor:pointer}.vue__time-picker input.display-time:active,.vue__time-picker input.display-time:focus{border:none}.--error .vue__time-picker input.display-time{color:#ec4d3d}.vue__time-picker .dropdown ul li:not([disabled]).active{background:#2089ff!important}.vue__time-picker-dropdown ul li:not([disabled]).active{background:#2089ff!important}",
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
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

var EVENT = {
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
var script$5 = {
  name: "kalendar-popup-card-slot",
  components: {
    KalendarXButton: __vue_component__$1,
    BaseSelect: __vue_component__$3,
    BaseTimeSelect: __vue_component__$4
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
      end_time_h: 0
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
  mounted: function mounted() {
    this.filterStudents();
    this.filterMaterials();
  },
  methods: {
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
    changeTime: function changeTime(eventData, timeName) {
      var date = new Date(this.popup_information[timeName]);
      var newDate = new Date(date.setHours(eventData.data.HH, eventData.data.mm));
      this[timeName] = getLocaleTime(newDate.toISOString()); // this.startTime or this.endTime

      this["".concat(timeName, "_h")] = +eventData.data.h;
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
    }
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
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
  }, [_vm._v("\n      " + _vm._s(_vm.formatDay(_vm.start_time)) + "\n    ")]), _vm._v(" "), _c('base-time-select', {
    attrs: {
      "time": _vm.start_time,
      "hour-range": _vm.hourRange
    },
    on: {
      "changeTime": function changeTime(event) {
        return _vm.changeTime(event, 'start_time');
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "b-delimiter"
  }), _vm._v(" "), _c('base-time-select', {
    attrs: {
      "time": _vm.end_time,
      "hour-range": _vm.hourRange,
      "error": _vm.errorSelectedTime
    },
    on: {
      "changeTime": function changeTime(event) {
        return _vm.changeTime(event, 'end_time');
      }
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

var __vue_staticRenderFns__$5 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "b-open-lesson"
  }, [_c('button', [_vm._v("Открыть урок")]), _vm._v(" https://4smart.pro/4fx-dko-dl5\n      ")]);
}];
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-07d7150d_0", {
    source: ".created-card{display:flex;flex-direction:column;padding:20px 20px 10px 30px;position:relative}.created-card__x{position:absolute;top:0;right:0}.created-card__header{display:flex;align-items:center;margin:0 0 20px 0}.created-card__header-icon{display:inline-block;width:20px;height:20px;margin:0 10px 0 0}.created-card__header-text{font-size:16px;font-weight:600;color:#0967d1;text-transform:uppercase}.b-added-students{display:flex;flex-wrap:wrap;margin:10px 0 0 10px!important}.b-added-students__item{border-right:none!important;margin:0 20px 0 0}.b-added-students__item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}.b-open-lesson{width:100%;color:#777;display:flex;justify-content:center;align-items:center;margin:10px}.b-open-lesson>button{color:#2089ff;cursor:pointer;border:none;background:0 0}.b-buttons{width:100%;display:flex;justify-content:center;margin:10px 0}.b-date-time{display:flex;align-items:center;flex-wrap:nowrap;padding:20px 0}.b-date-time__date{display:inline-block;margin:0 30px 0 0}.b-date-time__date:first-letter{text-transform:uppercase}.b-delimiter{width:50px;display:flex;justify-content:center;align-items:center}.b-delimiter:before{content:\"\";display:inline-block;border-bottom:1px solid #dadada;width:10px}.b-materials__add-button{color:#2089ff;display:flex;align-items:center;background:0 0;border:none;cursor:pointer}.b-materials__add-button>svg{margin:0 9px 0 0}.b-materials__list{display:flex;flex-direction:column;margin:10px 0 0 10px!important}.b-materials__list-item{border-right:none!important;margin:0 20px 0 0}.b-materials__list-item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}",
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
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

var EVENT$1 = {
  title: 'Новое занятие',
  description: null,
  userId: null,
  materials: []
};
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
var script$6 = {
  name: "kalendar-popup-edit-form",
  components: {
    KalendarXButton: __vue_component__$1,
    BaseSelect: __vue_component__$3,
    BaseTimeSelect: __vue_component__$4
  },
  props: ['popup_information'],
  data: function data() {
    return {
      new_event_data: _objectSpread2({}, EVENT$1),
      studentSelect: {
        value: {},
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
        value: {},
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
      isEdit: false
    };
  },
  created: function created() {
    var _this$popup_informati = this.popup_information,
        start_time = _this$popup_informati.start_time,
        end_time = _this$popup_informati.end_time,
        data = _this$popup_informati.data;
    this.start_time = start_time;
    this.end_time = end_time;
    this.addedStudents = data.students;
    this.addedMaterials = data.materials;
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
  mounted: function mounted() {
    this.filterStudents();
    this.filterMaterials();
  },
  methods: {
    editEvent: function editEvent() {
      this.start_time = addTimezoneInfo(this.start_time);
      this.end_time = addTimezoneInfo(this.end_time);
      var payload = {
        data: {
          title: this.new_event_data.title,
          description: this.new_event_data.description,
          students: this.addedStudents,
          materials: this.addedMaterials
        },
        from: this.start_time,
        to: this.end_time,
        id: this.popup_information.id
      };
      this.clearFormData();
      this.$kalendar.saveEvent(payload);
      this.$kalendar.closePopups();
      this.$kalendar.toggleEditing();
      this.$kalendar.toggleEditPopup(false);
      this.isEdit = false;
    },
    clearFormData: function clearFormData() {
      this.new_event_data = _objectSpread2({}, EVENT$1);
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
    changeTime: function changeTime(eventData, timeName) {
      var date = new Date(this[timeName]);
      var newDate = new Date(date.setHours(eventData.data.HH, eventData.data.mm));
      this[timeName] = getLocaleTime(newDate.toISOString()); // this.startTime or this.endTime

      this["".concat(timeName, "_h")] = +eventData.data.H;
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
    }
  }
};

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
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
  }, [_vm._v("\n          " + _vm._s(_vm.formatDay(_vm.start_time)) + "\n        ")]), _vm._v(" "), _c('base-time-select', {
    attrs: {
      "time": _vm.start_time,
      "hour-range": _vm.hourRange
    },
    on: {
      "changeTime": function changeTime(event) {
        return _vm.changeTime(event, 'start_time');
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "b-delimiter"
  }), _vm._v(" "), _c('base-time-select', {
    attrs: {
      "time": _vm.end_time,
      "hour-range": _vm.hourRange,
      "error": _vm.errorSelectedTime
    },
    on: {
      "changeTime": function changeTime(event) {
        return _vm.changeTime(event, 'end_time');
      }
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
  }, [_vm._v("\n            " + _vm._s(_vm.formatDay(_vm.start_time)) + ",\n            " + _vm._s(_vm.formatDate(_vm.start_time)) + "\n            -\n\t\t\t      " + _vm._s(_vm.formatDate(_vm.end_time)) + "\n          ")])]), _vm._v(" "), _vm._m(1)] : _vm._e()], 2)]);
};

var __vue_staticRenderFns__$6 = [function () {
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

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e5017a8a_0", {
    source: ".b-edit-card{display:flex;flex-direction:column;padding:4px 10px 10px 15px;position:relative}.b-edit-card__x{position:relative;right:-10px}.b-edit-card__header{display:flex;justify-content:flex-end;align-items:center;margin:0 0 20px 0}.b-edit-card__header-icon{display:flex;justify-content:center;align-items:center;width:20px;height:20px;margin:0 10px}.b-edit-card__header-icon>span{cursor:pointer}.b-edit-card__header-text{font-size:16px;font-weight:600;color:#0967d1;text-transform:uppercase}.b-added-edit-students{display:flex;flex-wrap:wrap;margin:10px 0 0 0!important}.b-added-edit-students__item{border-right:none!important;margin:0 20px 0 0;display:flex;align-items:center;font-size:16px;color:#0967d1}.b-added-edit-students__item>span{width:20px;height:20px;display:inline-block;margin:0 10px 0 0;background:#0967d1;border-radius:3px}.b-added-students{display:flex;flex-wrap:wrap;margin:10px 0 0 10px!important}.b-added-students__item{border-right:none!important;margin:0 20px 0 0}.b-added-students__item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}.b-open-edit-lesson{width:100%;color:#777;display:flex;justify-content:flex-start;align-items:center;margin:0 0 0 25px}.b-open-edit-lesson>button{color:#2089ff;cursor:pointer;border:none;background:0 0}.b-buttons{width:100%;display:flex;justify-content:center;margin:10px 0}.b-date-time{display:flex;align-items:center;flex-wrap:nowrap;padding:10px 0 20px 30px}.b-date-time__date{display:inline-block;margin:0 30px 0 0}.b-date-time__date:first-letter{text-transform:uppercase}.b-delimiter{width:50px;display:flex;justify-content:center;align-items:center}.b-delimiter:before{content:\"\";display:inline-block;border-bottom:1px solid #dadada;width:10px}.b-materials__add-button{color:#2089ff;display:flex;align-items:center;background:0 0;border:none;cursor:pointer}.b-materials__add-button>svg{margin:0 9px 0 0}.b-materials__list{display:flex;flex-direction:column;margin:10px 0 0 10px!important}.b-materials__list-item{border-right:none!important;margin:0 20px 0 0}.b-materials__list-item-x{width:8px;height:8px;display:inline-block;margin:0 7px 0 0;cursor:pointer}",
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
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

var script$7 = {
  components: {
    KalendarWeekView: function KalendarWeekView() {
      return import('./kalendar-weekview-1a4e3ee0.js');
    },
    ScrollContainer: function ScrollContainer() {
      return import('./scroll-container-2f5b20ba.js');
    },
    KalendarCreatedCardSlot: __vue_component__,
    KalendarPopupCardSlot: __vue_component__$5,
    KalendarPopupEditForm: __vue_component__$6
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
};

/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
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

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-24780dbc_0", {
    source: "@import url(https://fonts.googleapis.com/css?family=Rubik:wght@400,600&display=swap);*{box-sizing:border-box;font-family:Rubik,Helvetica,Arial,sans-serif}*{box-sizing:border-box;user-select:none}:after,:before{box-sizing:border-box;user-select:none}html{font-size:10px!important}@media only screen and (max-width:1100px){html{font-size:8px!important}}@media only screen and (max-width:768px){html{font-size:10px!important}}.kalendar-wrapper{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--main-color:#ec4d3d;--weekend-color:#f7f7f7;--current-day-color:#7AFFD7;--table-cell-border-color:#e5e5e5;--odd-cell-border-color:#e5e5e5;--hour-row-color:inherit;--dark:#212121;--lightg:#9e9e9e;--card-bgcolor:#04A675;--card-color:white;--max-hours:10;--previous-events:#c6dafc;--previous-text-color:#727d8f;--green:#0abc83;--red:#ec4d3d}.kalendar-wrapper.gstyle{--hour-row-color:#212121;--main-color:#4285f4;--weekend-color:transparent;--table-cell-border-color:#dadada;--odd-cell-border-color:transparent;font-family:\"Google Sans\",Roboto,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Arial,sans-serif}.kalendar-wrapper.gstyle .week-navigator{display:flex;justify-content:space-between;align-items:center;background:#fff;border-bottom:none;padding:20px;color:rgba(0,0,0,.54)}.kalendar-wrapper.gstyle .week-navigator button{color:rgba(0,0,0,.54)}.kalendar-wrapper.gstyle .created-event,.kalendar-wrapper.gstyle .creating-event{background-color:var(--card-bgcolor);color:var(--card-color);text-shadow:none;border-left:none;border-radius:10px;opacity:1;border-bottom:solid 1px rgba(0,0,0,.03);font-size:14px;padding:0 5px;display:flex;justify-content:space-between;align-items:center}.kalendar-wrapper.gstyle .created-event>*,.kalendar-wrapper.gstyle .creating-event>*{text-shadow:none}.kalendar-wrapper.gstyle .creating-event{color:var(--main-color);background-color:#7affd7;font-size:12px;padding:0 20px;border-radius:10px;align-items:flex-start}.kalendar-wrapper.gstyle .creating-event .time{color:var(--main-color);display:flex;align-items:center}.kalendar-wrapper.gstyle .is-past .created-event,.kalendar-wrapper.gstyle .is-past .creating-event{background-color:var(--previous-events);color:var(--previous-text-color)}.kalendar-wrapper.gstyle .created-event{width:100%}.kalendar-wrapper.gstyle .created-event .time{right:2px}.kalendar-wrapper.gstyle .created-event:hover{cursor:pointer;background-color:var(--main-color)}.kalendar-wrapper.gstyle .created-event:hover *{color:#fff}.kalendar-wrapper.gstyle .sticky-top .days{margin-left:0;padding-left:55px}.kalendar-wrapper.gstyle .all-day{display:none}.kalendar-wrapper.gstyle ul.building-blocks.day-1 li.is-an-hour::before{content:\"\";position:absolute;bottom:-1px;left:-10px;width:10px;height:1px;background-color:var(--table-cell-border-color)}.kalendar-wrapper.gstyle .hours,.kalendar-wrapper.gstyle ul.building-blocks li{border-right:solid 1px var(--table-cell-border-color)}.kalendar-wrapper.gstyle .hour-indicator-line>span.line{height:2px;background-color:#db4437}.kalendar-wrapper.gstyle .hour-indicator-line>span.line:before{content:\"\";width:12px;height:12px;display:block;background-color:#db4437;position:absolute;top:-1px;left:0;border-radius:100%}.kalendar-wrapper.gstyle .days{position:relative}.kalendar-wrapper.gstyle .days:before{content:\"\";position:absolute;height:1px;width:55px;left:0;bottom:0}.kalendar-wrapper.gstyle .day-indicator{display:flex;flex-direction:column;align-items:center;color:var(--dark);font-size:13px;padding-left:0;background:#fff}.kalendar-wrapper.gstyle .day-indicator>div{display:flex;flex-direction:column;align-items:center}.kalendar-wrapper.gstyle .day-indicator.is-before{color:#757575}.kalendar-wrapper.gstyle .day-indicator .number-date{margin-left:0;margin-right:0;order:2;font-size:18px;font-weight:600;width:32px;height:32px;border-radius:100%;align-items:center;justify-content:center;display:flex;margin-top:4px}.kalendar-wrapper.gstyle .day-indicator.today{border-bottom-color:var(--table-cell-border-color)}.kalendar-wrapper.gstyle .day-indicator.today:after{display:none}.kalendar-wrapper.gstyle .day-indicator.today .number-date{background-color:var(--main-color);color:#fff}.kalendar-wrapper.gstyle .day-indicator .letters-date{margin-left:0;margin-right:0;font-weight:500;text-transform:uppercase;font-size:11px}.kalendar-wrapper.gstyle .day-indicator:first-child{position:relative}.kalendar-wrapper.gstyle .day-indicator:first-child::before{content:\"\";position:absolute;left:-1px;top:0;width:1px;height:100%}.kalendar-wrapper.gstyle .creating-event{border-radius:10px;box-shadow:0 2px 2px rgba(0,0,0,.25);transition:opacity .1s linear}.kalendar-wrapper.gstyle .popup-wrapper{width:400px;min-height:116px;box-shadow:0 4px 4px rgba(0,0,0,.25);transition:opacity .1s linear}.kalendar-wrapper.non-desktop .building-blocks{pointer-events:none}.kalendar-wrapper.day-view .day-indicator{align-items:flex-start;text-align:center;padding-left:10px}.created-event,.creating-event{padding:4px 6px;cursor:default;word-break:break-word;height:100%;width:100%;font-size:14px}.created-event h4,.creating-event h4{font-weight:400}.creating-event{background-color:#34aadc;opacity:.9}.creating-event>*{text-shadow:0 0 7px rgba(0,0,0,.25)}.created-event{background-color:#bfecff;opacity:.74;border-left:solid 3px #34aadc;color:#1f6570}.week-navigator{display:flex;align-items:center;background:linear-gradient(#fdfdfd,#f9f9f9);border-bottom:solid 1px #ec4d3d;padding:10px 20px}.week-navigator .nav-wrapper{display:flex;align-items:center;justify-content:space-between;font-size:22px}.week-navigator .nav-wrapper span{white-space:nowrap;line-height:1.6;color:#333}.week-navigator button{background:0 0;border:none;display:inline-flex;margin:0 10px;color:#ec4d3d;align-items:center;font-size:14px;cursor:pointer;padding:0}.kalendar-wrapper{background-color:#fff;min-width:300px}.no-scroll{overflow-y:hidden;max-height:100%}.hour-indicator-line{position:absolute;z-index:2;width:100%;height:10px;display:flex;align-items:center;pointer-events:none;user-select:none}.hour-indicator-line>span.line{background-color:var(--main-color);height:1px;display:block;flex:1}.hour-indicator-line>span.time-value{font-size:14px;width:48px;color:var(--main-color);font-weight:600;background-color:#fff}.hour-indicator-tooltip{position:absolute;z-index:0;background-color:var(--main-color);width:10px;height:10px;display:block;border-radius:100%;pointer-events:none;user-select:none}ul.kalendar-day li.kalendar-cell:last-child{display:none}.week-navigator-button{outline:0}.week-navigator-button:active svg,.week-navigator-button:hover svg{stroke:var(--main-color)}.gstyle .week-navigator-button{width:32px;height:32px;display:flex;justify-content:center;align-items:center;border:2px solid var(--main-color);border-radius:100%;transition:all .2s}.gstyle .week-navigator-button svg{position:relative;left:1px;stroke:var(--main-color)}.gstyle .week-navigator-button:hover{border:2px solid #fff;background:var(--main-color)}.gstyle .week-navigator-button:hover svg{stroke:#fff}.kalendar-header{display:flex;justify-content:space-between;align-items:center}.kalendar-header>div{display:flex;justify-content:space-between;align-items:center}.main-button{padding:11px 42px;background:#2089ff;box-shadow:5px 5px 15px rgba(0,0,0,.15);border-radius:10px;margin:0 5px;cursor:pointer;border:none;color:#fff}.main-button:active{box-shadow:inset 5px 5px 15px rgba(0,0,0,.15)}.main-button.--gray{background:var(--green)}.main-button.--red{background:var(--red)}.button-today{margin:0 20px 0 0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Kalendar: __vue_component__$7
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

export { __vue_component__$7 as _, isToday as a, _objectSpread2 as b, cloneObject as c, normalizeComponent as d, createInjector as e, isBefore as f, getLocaleTime as g, getHourlessDate as h, isWeekend as i, addTimezoneInfo as j, getTime as k, plugin as p };
