<template>
    <div
        class="event-card"
        :ref="`${event.id}`"
        :style="
            `
              height: ${distance};
              width: calc(${width_value});
              left: calc(${left_offset});
              top: ${top_offset};
            `
        "
        :class="{
            'editing': editing,
            'is-flat': flat,
            'is-past': isPast,
            overlaps: overlaps > 1,
            'two-in-one': total > 1,
            'event-card__mini': event.distance <= 30,
            'event-card__small':
                (event.distance > 30 && event.distance < 60) || overlaps > 1,
        }"
    >
        <div ref="target" v-if="status === 'creating' || status === 'popup-initiated'">
          <portal-target
              :slot-props="information"
              name="event-creation"
              slim
          />
        </div>
        <div ref="target" @click="editEvent" v-else>
          <portal-target
              name="event-details"
              :slot-props="information"
              slim
          />
        </div>
        <div ref="popup" class="popup-wrapper" v-if="status === 'popup-initiated'">
            <portal-target
                name="event-popup-form"
                slim
                :slot-props="information"
                v-click-outside="closeEditFormEvent"
            />
        </div>
        <div ref="popup" class="popup-wrapper" v-if="editing && status !== 'popup-initiated'" >
            <portal-target
              name="event-edit-form"
              :slot-props="information"
              slim
              v-click-outside="closeEditFormEvent"
            />
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)
import { createPopper } from '@popperjs/core';
import { isBefore, getLocaleTime, addTimezoneInfo } from './utils.js';

export default {
    props: [
        'event',
        'total',
        'index',
        'overlaps',
        'kalendar_events',
        'isShowEditPopup',
        'day_events',
        'flat' // for month view
    ],
    created() {},
    inject: ['kalendar_options'],
    data: () => ({
        editing: false,
        popper: null
    }),
    watch: {
      isShowEditPopup (value) {
        if (!value) {
          this.closeEditFormEvent()
        }
      },
      status (value) {
        if (value === 'creating' || value === 'popup-initiated') {
          this.$nextTick(() => {
            this.createPopup()
          })
        }
      }
    },
    computed: {
        isPast() {
            let now = getLocaleTime(new Date().toISOString());
            return isBefore(this.event.start.value, now);
        },
        width_value() {
            return `${100 / this.total}% - ${(this.overlaps * 50) /
                this.total}px`;
        },
        left_offset() {
            return `(${this.index} * (${this.width_value})) + ${this.overlaps * 50}px`;
        },
        top_offset() {
            return this.event.start.round_offset
                ? `${this.event.start.round_offset}px`
                : `0px`;
        },
        distance() {
            if (!this.event) return;
            if (this.flat) return `auto`
            let multiplier = this.kalendar_options.cell_height / 30;
            // 0.5 * multiplier for an offset so next cell is easily selected
            return `${this.event.distance * multiplier - 0.2 * multiplier}px`;
        },
        status() {
            return (this.event && this.event.status) || this.editing;
        },
        information() {
            let { start, end, data, id, key } = {...this.event};
            let payload = {
                start_time: addTimezoneInfo(start.value),
                end_time: addTimezoneInfo(end.value),
                id: id,
                key,
                data,
                day_events: this.day_events
            };
            return payload;
        },
    },
    methods: {
        editEvent () {
          this.$kalendar.toggleEditPopup(true)
          this.editing = true

          this.$nextTick(() => {
            this.createPopup()
          })
        },
        closeEditFormEvent () {
          this.editing = false;
          this.$kalendar.closePopups()
          this.$kalendar.toggleEditPopup(false)
          this.popper.destroy()
        },
        createPopup() {
          const popcorn = this.$refs['target'];
          const tooltip = this.$refs['popup'];
          this.popper = createPopper(popcorn, tooltip, {
            placement: 'right',
            modifiers: [
              {
                name: 'flip',
                options: {
                  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
                },
              },
            ],
          });
        }
    }
};
</script>
<style lang="scss">
$creator-bg: #34aadc;
$creator-content: white;

.event-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    z-index: 5;

    h4,
    p {
        margin: 0;
    }

    > * {
        flex: 1;
        position: relative;
    }

    &.editing {
      z-index: 10;
    }

    &.creating {
        z-index: -1;
    }

    &.overlaps > * {
        border: solid 1px white !important;
    }

    &__mini {
        .created-event > div > .details-card  small  {
            display: none;
        }

        .appointment-title,
        .time {
            font-size: 9px;
            height: 100%;
        }
    }

    &__small {
        .appointment-title {
            font-size: 80%;
        }

        .time {
            font-size: 70%;
        }
    }

    &.two-in-one .details-card > * {
        font-size: 60%;
    }

    &.is-flat {
        margin-bottom: 3px;

        .details-card > small {
            display: none;
        }

        .remove {
            top: 1px
        }
    }

    &:not(.is-flat) {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; //z-index: 20!important;
    }

    //background-color: rgba($creator-bg, .85);
    color: $creator-content;
    user-select: none;
    will-change: height; //padding: 4px 6px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
    }
}

.time {
    font-size: 11px;
}

.popup-wrapper {
    text-shadow: none;
    color: black;
    z-index: 10;
    position: absolute;
    top: 0;
    left: calc(100% + 5px);
    display: flex;
    flex-direction: column;
    pointer-events: all;
    user-select: none;
    background-color: white;
    border: solid 1px rgba(black, 0.08);
    border-radius: 4px;
    box-shadow: 0px 2px 12px -3px rgba(black, 0.3);
    padding: 10px;

    h4 {
        color: black;
        font-weight: 400;
    }

    input,
    textarea {
        border: none;
        background-color: darken(white, 8);
        color: lighten(black, 1);
        border-radius: 4px;
        padding: 5px 8px;
        margin-bottom: 5px;
    }
}

.created-event {
    pointer-events: all;
    position: relative;

    > .details-card {
        max-width: 100%;
        width: 100%;

        > h1,
        h2,
        h3,
        h4,
        p,
        small,
        strong,
        span {
            text-overflow: ellipsis;
            overflow: hidden;
            display: block;
        }
    }
}

ul:nth-last-child(-n+3) .popup-wrapper {
    left: auto;
    right: 100%;
    margin-right: 10px;
}

.day-view ul .popup-wrapper {
    left: auto;
    right: auto;
    width: calc(100% - 10px);
    top: 10px;
}
</style>
