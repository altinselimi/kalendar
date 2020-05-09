<template>
    <div class="options-wrapper">
        <div class="preferences-wrapper" :class="{ active: show_options }">
            <div class="show_options">
                PREFERENCES
                <span class="pref-icon" @click="show_options = !show_options">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-sliders"
                    >
                        <line x1="4" y1="21" x2="4" y2="14"></line>
                        <line x1="4" y1="10" x2="4" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="3"></line>
                        <line x1="20" y1="21" x2="20" y2="16"></line>
                        <line x1="20" y1="12" x2="20" y2="3"></line>
                        <line x1="1" y1="14" x2="7" y2="14"></line>
                        <line x1="9" y1="8" x2="15" y2="8"></line>
                        <line x1="17" y1="16" x2="23" y2="16"></line>
                    </svg>
                </span>
                <a class="json-icon" href="#getting-started">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-book"
                    >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path
                            d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                        ></path>
                    </svg>
                </a>
            </div>
            <div class="pref-slot">
                <label
                    >Style
                    <el-select
                        v-model="calendar_settings.style"
                        placeholder="Style"
                        size="small"
                    >
                        <el-option
                            value="material_design"
                            label="Material Design"
                        ></el-option>
                        <el-option
                            value="flat_design"
                            label="Flat Design"
                        ></el-option>
                    </el-select>
                </label>
                <label
                    >View Type
                    <el-select
                        v-model="calendar_settings.view_type"
                        placeholder="View Type"
                        size="small"
                    >
                        <el-option value="day" label="Day view"></el-option>
                        <el-option value="week" label="Week view"></el-option>
                    </el-select>
                </label>
                <label
                    >Cell Height
                    <el-input
                        size="small"
                        type="number"
                        name="cell-height"
                        v-model.number="calendar_settings.cell_height"
                    />
                </label>
                <label
                    >Day
                    <el-date-picker
                        size="small"
                        v-model="calendar_settings.start_day"
                        type="date"
                        placeholder="Pick a day"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </label>
                <label
                    >Day starts at
                    <el-input
                        size="small"
                        type="number"
                        name="cell-height"
                        v-model.number="calendar_settings.day_starts_at"
                    />
                </label>
                <label
                    >Day ends at
                    <el-input
                        size="small"
                        type="number"
                        name="cell-height"
                        v-model.number="calendar_settings.day_ends_at"
                    />
                </label>
                <label
                    >Hidden days
                    <el-select
                        v-model="calendar_settings.hide_days"
                        placeholder="Select one or more"
                        multiple
                        size="small"
                    >
                        <el-option
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                            v-for="option in days"
                        ></el-option>
                    </el-select>
                </label>
                <label
                    >Hidden dates
                    <el-select
                        v-model="calendar_settings.hide_dates"
                        placeholder="Select one or more"
                        multiple
                        size="small"
                    >
                        <el-option
                            :value="option.value"
                            :label="option.label"
                            :key="option.value"
                            v-for="option in dates"
                        ></el-option>
                    </el-select>
                </label>
                <label
                    >Scroll to now
                    <el-checkbox
                        size="small"
                        v-model="calendar_settings.scrollToNow"
                    ></el-checkbox>
                </label>
                <label
                    >Read only
                    <el-checkbox
                        size="small"
                        v-model="calendar_settings.read_only"
                    ></el-checkbox>
                </label>
                <label
                    >Overlap events
                    <el-checkbox
                        size="small"
                        v-model="calendar_settings.overlap"
                    ></el-checkbox>
                </label>
                <label
                    >Past event creation
                    <el-checkbox
                        size="small"
                        v-model="calendar_settings.past_event_creation"
                    ></el-checkbox>
                </label>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['data'],
    computed: {
        calendar_settings: {
            get() {
                return this.data;
            },
            set(value) {
                console.log('New se=====t:', value);
                this.$emit('update:data', value);
            },
        },
    },
    data: () => ({
        show_options: false,
        dates: [
            {
                label: `Valentine's Day`,
                value: '2020-02-14',
            },
            {
                label: '4th of July',
                value: '2019-07-04',
            },
            {
                label: 'Halloween',
                value: '2019-10-31',
            },
            {
                label: 'New years eve',
                value: '2019-12-31',
            },
            {
                label: 'My birthday',
                value: '2019-08-09',
            },
        ],
        days: [
            {
                label: 'Monday',
                value: 0,
            },
            {
                label: 'Tuesday',
                value: 1,
            },
            {
                label: 'Wednesday',
                value: 2,
            },
            {
                label: 'Thursday',
                value: 3,
            },
            {
                label: 'Friday',
                value: 4,
            },
            {
                label: 'Saturday',
                value: 5,
            },
            {
                label: 'Sunday',
                value: 6,
            },
        ],
    }),
};
</script>
<style lang="scss">
$dark-blue: #0f4894;
$blue: #007fff;
$yellow: #f5d547;
$dark: #3c3c3b;

.plain-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0px;
    flex-direction: column;
    background-color: white;

    > div {
        display: flex;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
        border: solid 1px whitesmoke;
        border-radius: 4px;
        position: relative;
        overflow: visible;
        padding: 20px;
    }

    .settings {
        position: absolute;
        left: 15px;
        top: -10px;
        margin: 0px;
        background-color: white;
        padding: 0px 10px;
        font-size: 16px;
        color: $dark-blue;
    }

    label {
        font-size: 16px;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;

        select {
            font-size: 15px;
            backgorund-color: white;
            margin-top: 5px;
        }
    }
}

.pref-slot {
    display: flex;
    flex-direction: column;
    padding: 15px;

    > * {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > *:last-child {
            margin-left: 25px;
        }

        &:last-child {
            margin-bottom: 0px;
        }
    }
}

.options-wrapper {
    position: sticky;
    z-index: 25;
    top: 10px;
    height: 0px;
    overflow: visible;
    margin-top: -120px;
    margin-bottom: 120px;
}

.preferences-wrapper {
    display: flex;
    flex-direction: column;
    top: 0px;
    left: 0px;
    border-radius: 6px;
    max-width: 650px;
    background-color: white;
    border-radius: 0px;
    border-bottom-right-radius: 6px;
    box-shadow: 0px 2px 5px -3px $dark, inset 0px 0px 0px 1px whitesmoke;
    font-size: 14px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    max-width: 450px;
    width: 100%;

    &.active {
        transform: translateX(0);
    }

    .el-input,
    .el-textarea {
        max-width: 160px;
    }
}

.show_options {
    border: none;
    z-index: 10;
    color: $dark;
    background: transparent;
    display: flex;
    align-items: center;
    font-size: 14px;
    position: relative;
    padding: 15px;
    outline: none;

    span.pref-icon,
    a.json-icon {
        position: absolute;
        background-color: white;
        right: 0px;
        top: 0px;
        transform: translateX(100%);
        padding: 15px;
        border-top-right-radius: 6px;
        box-shadow: inset 0px 0px 0px 1px whitesmoke;
    }

    a.json-icon {
        transform: translateX(100%) translateY(100%);
        border-bottom-right-radius: 6px;
        border-top-right-radius: 0px;

        svg {
            stroke: $dark;
        }
    }

    svg {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        stroke: $blue;
    }
}

@media screen and (max-height: 700px) {
    .preferences-wrapper {
        top: 70px;
        //overflow-y: auto;
    }
}
</style>
