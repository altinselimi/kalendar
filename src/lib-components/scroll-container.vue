<script>
export default {
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
    cssProps () {
      return {
        '--bg-color': this.backgroundBar
      }
    }
  },
  mounted () {
    let vb = this.$refs.vueBar
    let el = vb.querySelector('.vb-content')
    let sel = el.querySelector('.selected')
    let top = null
    let h = null

    if (sel) {
      top = sel.offsetTop
      h = el.offsetHeight / 2 // half height .vb-content
    }

    if (top !== null && top > h) el.scrollTop = top - h
  }
}
</script>

<template>
  <div
    class="vuebar-element"
    v-bar="{ 
      preventParentScroll: 
      true, scrollThrottle: 30 
    }"
    :style="[styling, cssProps]"
    ref="vueBar">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.vue-scrollbar {
  &__wrapper {
    background: transparent;
  }
  &__scrollbar-vertical {
    width: 0.2rem;
    height: 92%;
    top: 0.4rem;
    bottom: 0.4rem;
    right: 0.4rem;
    & .scrollbar {
      width: 0.2rem;
      border-radius: 0.2rem;
    }
  }
}

.b-scroll-bar {
  & .scrollbar {
    background-color: var(--bg-color)
  }
  background-color: var(--bg-color)
}

.vuebar-element {
  height: 100%;
  width: 100%;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 10px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0,0,0,0);
  transform: rotate3d(0,0,0,0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  background-color: var(--bg-color);
  opacity: 0.5;
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  min-height: 2px;
  display: block;
}
.vb-invisible > .vb-dragger > .vb-dragger-styler {
  display: none
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: var(--bg-color);
  opacity: 0.3
}
.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: var(--bg-color);
  margin: 0;
  height: 100%;
  opacity: 0.5;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: var(--bg-color);
  margin: 0;
  height: 100%;
  opacity: 0.5;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: var(--bg-color);
  opacity: 0.5;
}

.vb-content::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}

</style>
