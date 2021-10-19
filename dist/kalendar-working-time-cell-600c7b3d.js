import { k as getTime, d as __vue_normalize__, e as __vue_create_injector__ } from './index-eaaed81e.js';
import 'vue';

//
var script = {
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
  methods: {
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
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('li', {
    staticClass: "kalendar-cell --work-time",
    class: {
      'selected-work-time': _vm.isConstructed || _vm.isSelectedTemp,
      'is-an-hour': (_vm.index + 1) % 6 === 0 // у каждого шестого рисуем нижнию рамку для окончания часа

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

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4e6cfde0_0", {
    source: "li[data-v-4e6cfde0]{font-size:13px;position:relative}.created-events[data-v-4e6cfde0]{height:100%}ul.building-blocks li[data-v-4e6cfde0]{z-index:0}ul.building-blocks li.--work-time[data-v-4e6cfde0]{justify-content:flex-end;font-size:9px;color:var(--main-color);user-select:none;font-weight:700}ul.building-blocks li.first_of_appointment[data-v-4e6cfde0]{z-index:1;opacity:1}ul.building-blocks li.is-an-hour[data-v-4e6cfde0]{border-bottom:solid 1px var(--table-cell-border-color)}ul.building-blocks li.has-events[data-v-4e6cfde0]{z-index:unset}ul.building-blocks li.being-created[data-v-4e6cfde0]{z-index:11}ul.building-blocks li.selected-work-time[data-v-4e6cfde0]{background:#7afFD766}ul.building-blocks li>span[data-v-4e6cfde0]{display:none}ul.building-blocks li[data-v-4e6cfde0]:hover{border-bottom:1px solid var(--main-color)}ul.building-blocks li:hover span[data-v-4e6cfde0]{text-align:right;display:block;padding-bottom:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-4e6cfde0";
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
