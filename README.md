## 🗓 Kalendar

[![npm version](https://badge.fury.io/js/kalendar-vue.svg)](https://badge.fury.io/js/kalendar-vue)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Your best friend when it comes to events management in Vue.

## 🕹 Live Demo

[Kalendar Showcase](http://kalendar.altinselimi.com/)

### Running the Demo Locally

You can run the demo locally :
  - git clone https://github.com/altinselimi/kalendar.git
  - cd kalendar
  - npm install
  - npm run serve

 The code for the demo app is in `src/serve-dev.vue` - a small but complete calendar app. 
 This is a good place to learn how thing work and a good starting point for your own implementation. 

## 🏁Getting Started

-   Install plugin and its dependencies from npm

```
npm install kalendar-vue portal-vue -S
```

-   The easiest option is to copy the demo app from `src/serve-dev.vue` into your project and start from that.

Step by Step:

-   Import plugin and its dependencies in your component

```js
import Vue from "vue";
import PortalVue from "portal-vue";
Vue.use(PortalVue);

import { Kalendar } from 'kalendar-vue';
...
components: {
	Kalendar,
	...
},
```

-   Provide Appointments array. This array will be the source of the appointments which are rendered in the calendar.
Specify the start and end times of each appointment as ISO format strings.
You must use the `sync` modifier when passing the `configuration` prop to the component or else switching weeks will break.

```vue
<template>
	<kalendar :configuration="calendar_settings" :events.sync="events" />
</template>
<script>
...
data: () => ({
    calendar_settings: {
      style: 'material_design',
      view_type: 'week',
      cell_height: 20,
      scrollToNow: true,
      start_day: new Date().toISOString(),
      read_only: false,
      day_starts_at: 0,
      day_ends_at: 24,
      overlap: true,
      hide_dates: ['2019-10-31'], // Spooky
      hide_days: [6],
      past_event_creation: true
    },
    events: [
      {
        from: '2020-03-18T18:00:00Z',
        to: '2020-03-18T19:00:00Z',
        data: 'Event 1',
      },
      {
        from: '2020-03-18T19:00:00Z',
        to: '2020-03-18T21:00:00Z',
        data: 'Olive & Friends',
      },
      ...
    ],
    ...
})
</script>
```

### 🎛 Kalendar Options

| Option              | Default Value                                                  | Type          | Description                                                                                                  |
| ------------------- | -------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| view_type           | 'week'                                                         | string        | Determines the mode of kalendar. You can pick either 'week' or 'day'. Day is recommended for mobile devices. |
| cell_height         | 10                                                             | string        | Determines the height in pixels of a cell                                                                    |
| start_day           | new Date().toISOString()                                       | string        | Determines the week or day which is shown in the kalendar on first load                                                    |
| style               | 'material_design'                                              | string        | You can pick either 'material_design' or 'flat_design' (iOS)                                                 |
| read_only           | false                                                          | boolean       | Enabled, viewers won't be able to interact with kalendar                                                     |
| day_starts_at       | 0                                                              | integer       | Determines what hour the kalendar starts from (0 to 24)                                                      |
| day_ends_at         | 24                                                             | integer       | Determines what hour the kalendar ends at (0 to 24)                                                          |
| overlap             | true                                                           | boolean       | Enables ability to create multiple events (overlapping) at the same timeframe                                |
| hide_dates          | []                                                             | Array<String> | Hides the provided dates from kalendar. Array of strings each being a valid date in YYYY-MM-DD format.       |
| hide_days           | [6]                                                            | Array<Int>    | Hides the provided days from kalendar. Monday = 0 ... Sunday = 6                                             |
| past_event_creation | true                                                           | boolean       | Determines the ability of creating events that have happened in the past                                     |
| scrollToNow         | true                                                           | boolean       | Scroll kalendar to current time on render                                                                    |
| formatLeftHours     | (date) => { return format(date, 'HH') }                        | function      | A function which accepts an ISO date and determines how the hours on the left side are shown                 |
| formatDayTitle      | (date) => { return format(date, 'DDD dd') }                    | function      | A function which accepts an ISO date and determines what the day column title shows                          |
| formatWeekNavigator | (date) => { return `${startDate(date)} - ${endDate(date)}`}    | function      | A function which accepts an ISO date and determines what the week view navigator (at the top) shows          |
| formatDayNavigator  | (date) => { return new Date(date).toUTCString().slice(5, 11) } | function      | A function which accepts an ISO date and determines what the day view navigator (at the top) shows           |

## Using Slots

> The plugin can turn incredibly useful using scoped slots. You can customize all the essential parts of it.

### Slots summary

| Slot name     | Slot scope        | Slot description                                                                     |
| ------------- | ----------------- | ------------------------------------------------------------------------------------ |
| created-card  | event_information | Display information about an existing event                                          |
| creating-card | event_information | Display information about an event which is being created (mouse is being dragged)   |
| popup-form    | popup_information | Display information about a temporary event (after user finishes dragging the mouse) |

#### event_information definition

| Field       | Type   | Description                                                                       |     |     |
| ----------- | ------ | --------------------------------------------------------------------------------- | --- | --- |
| start_time  | String | Start time as ISO Date String of the event                                        |     |     |
| end_time    | String | End time as ISO Date String of the event                                          |     |     |
| kalendar_id | String | Unique ID used for operations internally by kalendar                              |     |     |
| key         | String | Key of the event used internally by kalendar                                      |     |     |
| data        | Object | Data object which can hold any type of information which may prove useful for you |     |     |

## 🛣 Roadmap

-   ~⚠️ Refactor so code is readable/understandable and others can help--~
-   ~Add Read-Only mode~
-   ~Remove date-fns dependency~
-   ~Improve performance~
    _ Hard-code split value to 5mins, and use split-value-prop to only mark current_min%split-value-prop === 0
    _ Using upmentioned technique, day hours can be hardcoded into JSON, while the date part would come in from `for in` loop \* Use event delegation and remove listeners from every cell. Use event target instead, to manipulate the cell DOM object.
-   Add month view
-   Write docs
-   Write unit-tests
