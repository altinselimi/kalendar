import { k as getTime, d as __vue_normalize__, e as __vue_create_injector__ } from './index-5001f888.js';
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
  }, [_vm._v("\n    " + _vm._s(_vm.getTime(_vm.cellData.value)) + "\n")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-7bdb2578_0", {
    source: "li{font-size:13px;position:relative}.created-events{height:100%}ul.building-blocks li{z-index:0}ul.building-blocks li.--work-time{justify-content:flex-end;font-size:8px;color:#dddada;user-select:none}ul.building-blocks li.first_of_appointment{z-index:1;opacity:1}ul.building-blocks li.is-an-hour{border-bottom:solid 1px var(--table-cell-border-color)}ul.building-blocks li.has-events{z-index:unset}ul.building-blocks li.being-created{z-index:11}ul.building-blocks li.selected-work-time{background:#7afFD766;color:#fff}",
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
