import { d as __vue_normalize__, e as __vue_create_injector__ } from './index-6d1b592d.js';
import 'vue';
import 'vue2-timepicker/src/vue-timepicker.vue';

var script = {
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
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-061df6bf_0", {
    source: ".vue-scrollbar__wrapper{background:0 0}.vue-scrollbar__scrollbar-vertical{width:.2rem;height:92%;top:.4rem;bottom:.4rem;right:.4rem}.vue-scrollbar__scrollbar-vertical .scrollbar{width:.2rem;border-radius:.2rem}.b-scroll-bar{background-color:var(--bg-color)}.b-scroll-bar .scrollbar{background-color:var(--bg-color)}.vuebar-element{height:100%;width:100%}.vb>.vb-dragger{z-index:5;width:10px;right:0}.vb>.vb-dragger>.vb-dragger-styler{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:rotate3d(0,0,0,0);transform:rotate3d(0,0,0,0);-webkit-transition:background-color .1s ease-out,margin .1s ease-out,height .1s ease-out;transition:background-color .1s ease-out,margin .1s ease-out,height .1s ease-out;background-color:var(--bg-color);opacity:.5;margin:5px 5px 5px 0;border-radius:20px;height:calc(100% - 10px);min-height:2px;display:block}.vb-invisible>.vb-dragger>.vb-dragger-styler{display:none}.vb.vb-scrolling-phantom>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);opacity:.3}.vb>.vb-dragger:hover>.vb-dragger-styler{background-color:var(--bg-color);margin:0;height:100%;opacity:.5}.vb.vb-dragging>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);margin:0;height:100%;opacity:.5}.vb.vb-dragging-phantom>.vb-dragger>.vb-dragger-styler{background-color:var(--bg-color);opacity:.5}.vb-content::-webkit-scrollbar{display:none;scrollbar-width:none}",
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
