<template>
    <li
        @mouseover.self="mouseMove()"
        @mousedown.self="mouseDown()"
        @mouseup="mouseUp()"
        class="kalendar-cell --work-time"
        :class="{
            'selected-work-time': isConstructed || isSelectedTemp,
            'is-an-hour': (index + 1) % 6 === 0, // у каждого шестого рисуем нижнию рамку для окончания часа
        }"
        :style="`height: ${kalendar_options.cell_height}px;`"
    >
        <span>{{ getTime(cellData.value) }}</span>
    </li>
</template>
<script>
import { getTime } from './utils.js';
export default {
    props: [
        'creatingWorkTime',
        'index',
        'cellData',
        'constructedWorkHours',
        'temporaryWorkHours',
    ],
    inject: ['kalendar_options'],
    computed: {
      isConstructed() {
          return this.cellData.value in this.constructedWorkHours
      },
      isSelectedTemp () {
          return this.cellData.value in this.temporaryWorkHours
      }
    },
    methods: {
        getTime,
        mouseDown() {
            this.$emit('selectWorkHours', this.cellData.value);
        },
        mouseMove() {
            if (this.creatingWorkTime) {
                this.$emit('selectWorkHours', this.cellData.value);
            }
        },
        mouseUp() {
            if (this.creatingWorkTime) {
                this.$emit('addSelectWorkHours');
            }
        }
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
        
        &.--work-time {
            justify-content: flex-end;
            font-size: 8px;
            color: #000;
            // border-bottom: dotted 1px var(--green);
            user-select: none;
        }

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
        
        &.selected-work-time {
            background: #7AFFD766;
        }
        
        > span {
            display: none;
        }
        
        &:hover {
            border-bottom: 1px solid #000;
            span {
                text-align: right;
                display: block;
                padding-bottom: 5px;
            }
        }
    }
}
</style>
