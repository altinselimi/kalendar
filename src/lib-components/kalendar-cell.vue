<template>
    <li
        v-if="cellData.visible"
        @mouseover.self="mouseMove()"
        @mousedown.self="mouseDown()"
        @mouseup="mouseUp()"
        class="kalendar-cell"
        :class="{
            selected: selected,
            'is-an-hour': (index + 1) % (60 / 10) === 0,
            'has-events': cell_events && cell_events.length > 0,
            'being-created': !!being_created || hasPopups,
        }"
        :style="
            `
      height: ${kalendar_options.cell_height}px;
    `
        "
    >
        <KalendarEvent
            :style="`z-index: 10`"
            v-if="cell_events && cell_events.length"
            v-for="(event, eventIndex) in cell_events"
            :event="event"
            :key="eventIndex"
            :total="cell_events.length"
            :index="eventIndex"
            :overlaps="overlapValue"
        />
    </li>
</template>
<script>
import { cloneObject, getLocaleTime } from './utils.js';

export default {
    props: [
        'creator',
        'index',
        'cellData',
        'constructedEvents',
        'temporaryEvent',
    ],
    inject: ['kalendar_options'],
    components: {
        KalendarEvent: () => import('./kalendar-event.vue'),
    },
    computed: {
        cell_events() {
            let all_events = [];
            if (this.completed_events) {
                all_events = all_events.concat(this.completed_events);
            }
            if (this.being_created) {
                all_events = all_events.concat(this.being_created);
            }
            return all_events;
        },
        completed_events() {
            return (
                this.constructedEvents &&
                this.constructedEvents.hasOwnProperty(this.cellData.value) &&
                this.constructedEvents[this.cellData.value]
            );
        },
        being_created() {
            return (
                this.temporaryEvent &&
                this.temporaryEvent.start.value === this.cellData.value &&
                this.temporaryEvent
            );
        },
        overlappingEvents() {
            if (!this.constructedEvents || this.cell_events.length < 1)
                return [];
            return Object.values(this.constructedEvents)
                .flat()
                .filter(event => {
                    let cellDate = new Date(this.cellData.value);
                    let eventStarts = new Date(event.start.value);
                    let eventEnds = new Date(event.end.value);
                    return eventStarts < cellDate && eventEnds > cellDate;
                });
        },
        overlapValue() {
            let length = this.overlappingEvents.length;
            return length > 2 ? 2 : length;
        },
        selected() {
            return this.cell_events && this.cell_events.length > 0;
        },
        hasPopups() {
            return (
                this.selected &&
                !!this.cell_events.find(ev => ev.status === 'popup-initiated')
            );
        },
    },
    methods: {
        mouseDown() {
            // user mouse got depressed while outside kalendar-cells
            // came back in and clicked while the creator was on
            if (!!this.creator.creating) {
                this.mouseUp();
                return;
            }
            let {
                read_only,
                overlap,
                past_event_creation,
            } = this.kalendar_options;
            if (read_only) return;

            // if past_event_creation is set to false, check if cell value is
            // before current time
            if (past_event_creation === false) {
                let now = getLocaleTime(new Date());
                if (new Date(now) > new Date(this.cellData.value)) {
                    this.mouseUp();
                    return;
                }
            }

            // if overlap is set to false, prevent selection on top of
            // other events
            console.log('Cell events:', this.cell_events.length);
            if (!overlap && this.cell_events.length > 0) return;

            // close any open popups in the whole kalendar instance
            // before starting a new one
            this.$kalendar.closePopups();

            // create a payload consisting of
            // starting, current, ending and originalStarting cell
            // starting, current and ending are self explanatory
            // but originalStarting cell is required
            // to determine the direction of the scroll/drag
            let payload = {
                creating: true,
                original_starting_cell: cloneObject(this.cellData),
                starting_cell: cloneObject(this.cellData),
                current_cell: cloneObject(this.cellData),
                ending_cell: cloneObject(this.cellData),
            };
            this.$emit('select', payload);
        },
        mouseMove() {
            // same guards like in the mouseDown function
            let { read_only, overlap } = this.kalendar_options;
            if (read_only) return;
            if (this.creator && !this.creator.creating) return;
            let {
                starting_cell,
                original_starting_cell,
                creating,
            } = this.creator;

            // direction of scroll
            let going_down =
                this.cellData.index >= starting_cell.index &&
                starting_cell.index === original_starting_cell.index;

            if (creating) {
                let payload = {
                    ...this.creator,
                    current_cell: this.cellData,
                    ending_cell: this.cellData,
                    direction: going_down ? 'normal' : 'reverse',
                };
                this.$emit('select', payload);
            }
        },
        mouseUp() {
            if (this.kalendar_options.read_only) return;
            if (this.creator.creating) {
                this.$emit('initiatePopup');
            }
        },
        resetCreator() {
            this.$emit('reset');
        },
    },
};
</script>
<style lang="scss">
$creator-bg: #34aadc;
$creator-content: white;

li {
    font-size: 13px;
    position: relative;
}

.created-events {
    //width: 100%;
    height: 100%;
}

ul.building-blocks {
    li {
        z-index: 0;
        border-bottom: dotted 1px var(--odd-cell-border-color);

        &.first_of_appointment {
            z-index: 1;
            opacity: 1; //z-index:0;
        }

        &.is-an-hour {
            border-bottom: solid 1px var(--table-cell-border-color);
        }

        &.has-events {
            z-index: unset;
        }

        &.being-created {
            z-index: 11;
        }
    }
}
</style>
