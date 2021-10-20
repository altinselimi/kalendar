<script>
import BaseScrollContainer from '@/lib-components/base/BaseScrollContainer';
export default {
  components: {
    BaseScrollContainer
  },
  props: {
    /* options */
    options: {
      type: Array,
      default: () => []
    },
    /* value */
    value: {
      type: Object,
      default: () => {}
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
      validator (value) {
        const values = [
          'text',
          'class'
        ]
        return values.indexOf(value) !== -1
      }
    }
  },
  data: () => ({
    showOptions: false,
    valueSearch: ''
  }),
  computed: {
    colorFill: function () {
      return this.showOptions ? '#C6C6C6' : '#C6C6C6'
    },
    filteredOptions () {
      return this.valueSearch ?
        this.options.filter((option) => ~option.name.toLowerCase().indexOf(this.valueSearch.toLowerCase())) :
        this.options
    },
    marginTop () {
      return this.search ? 4 : 0
    }
  },
  methods: {
    selectOption (option) {
      this.showOptions = !this.showOptions
      this.$emit('input', option)
    },
    onClickOutside (e, el) {
      this.showOptions = false
    }
  }
}
</script>

<template>
  <div
      class="l-pth-base-select"
      v-click-outside="onClickOutside"
  >
    <base-label v-if="label" @click="showOptions = !showOptions">
      {{ label }}
    </base-label>
    <div class="b-pth-base-select">
      <div class="b-pth-base-select__container" @click="showOptions = !showOptions">
        <span class="b-pth-base-select__name" v-if="typeItems === 'text'">
          {{ value && value.name ? value.name : defaultText }}
        </span>
        <span class="b-pth-base-select__name" v-if="typeItems === 'class'">
          <i :class="`b-pth-base-select__name-icon b-pth-base-select__name-icon-${value.name}`" />
        </span>
        <span class="b-pth-base-select__arrow">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0.811401L5 5.85239L10 0.811401H0Z" fill="#777777"/>
          </svg>
        </span>
      </div>
      <div class="b-pth-base-select__dropdown" v-if="showOptions">
        <div v-if="search" class="b-pth-base-select__options-item _fixed">
          <input v-model="valueSearch" />
        </div>
        <BaseScrollContainer class="b-pth-base-select__scrollbar"
          :styling="{ width: '100%', height: `${+height - +marginTop}0px` }" backgroundBar="#474747"
          >
          <ul class="b-pth-base-select__options">
            <li class="b-pth-base-select__options-item"
                :class="{ 'selected': value.name === option.name }"
                v-for="(option, index) in filteredOptions"
                :key="index"
                @click="selectOption(option)">
              {{ option.name }}
            </li>
          </ul>
        </BaseScrollContainer>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-pth-base-select
  width: 100%
  height: 3.4rem
  max-width: 50rem
  // margin-bottom: 1.5rem

  position: relative
  display: flex

  background-color: white
  border-bottom: 1px solid rgba(#DADADA,1)

  transition: border-color 0.2s ease
  cursor: pointer
  & *
    user-select: none
  &__container
    display: flex
    justify-content: space-between
    align-items: center

    width: 100%
    padding: .5rem 1.5rem
  &__name
    font-size: 1.4rem
    line-height: 1.8rem
    color: #777777
    cursor: pointer
    white-space: nowrap

    max-width: 95%
    overflow: hidden
    text-overflow: ellipsis

    & input
      border: transparent solid 1px
  &__arrow
    width: 0.8rem
  &__icon
    margin: 0
    display: block !important
    &_up
      transform: rotate(-180deg)
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      fill: #000
  &__dropdown
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    border-top: none
    overflow: hidden

    background: #fff

    position: absolute
    top: 100%
    left: 0
    right: 0
    z-index: 999

    margin: .2rem .1rem
    padding: 0
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25)
    border-radius: 5px
  &__options
    margin: 0
    padding: 0
    min-height: 6rem
    &._mt
      margin: 1rem 0 0
    &-item
      padding: 1.2rem 24px
      line-height: 1.6rem
      font-size: 1.4rem
      list-style: none
      color: #272727
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      &._fixed
        // position: absolute
        top: 0
        right: 0
        left: 0
        & input
          width: 100%
      &:last-child
        border-bottom: none
      &:hover, &.selected
        background-color: rgba(0, 173, 182, 0.05)

.vue-scrollbar__scrollbar-vertical
  width: 0.4rem
  height: 92%
  top: 0.4rem
  bottom: 0.4rem
  right: 0.4rem
  & .scrollbar
    width: 0.4rem
    border-radius: 0.4rem

</style>
