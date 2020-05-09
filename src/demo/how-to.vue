<template>
    <div class="how-to" id="getting-started">
        <section>
            <h1>Getting started</h1>
            <div>
                <h4>Install plugin from npm</h4>
                <pre
                    v-highlightjs
                ><code class="javascript">npm install kalendar-vue -S</code></pre>
            </div>
            <div>
                <h4>Import plugin in your component</h4>
                <pre
                    v-highlightjs="initialize_js"
                ><code class="javascript"></code></pre>
            </div>
            <div>
                <h4>Provide appointments array.</h4>
                <p>
                    This array will be the source of the appointments which are
                    rendered in the calendar.
                </p>
                <pre v-highlightjs="render_it"><code class="html"></code></pre>
                <pre
                    v-highlightjs="render_it_js"
                ><code class="javascript"></code></pre>
            </div>
        </section>
        <section>
            <h4>Using Slots</h4>
            <p>
                The plugin can turn incredibly useful using scoped slots. You
                can customize all the essential parts of it.
            </p>
            <pre v-highlightjs="using_slots"><code class="html"></code></pre>
            <pre
                v-highlightjs="using_slots_js"
            ><code class="javascript"></code></pre>
        </section>
    </div>
</template>
<script>
const options = `
calendar_settings: {
  style: 'material_design', // ['flat_design', 'material_design']
  cell_height: 20, // !isNaN(Value)
  scrollToNow: true, // Boolean
  current_day: new Date(), // Valid date
}
`;

const init_js = `
import { Kalendar } from 'kalendar-vue';
...
components: {
  Kalendar,
  ...
},
`;

const provide_data = `
data: () => ({
  events: [],
  calendar_settings: {
    style: 'material_design',
    cell_height: 20,
    scrollToNow: true,
    current_day: new Date(),
    read_only: false,
    day_starts_at: 0,
    day_ends_at: 24,
    overlap: true,
    hide_dates: ['2019-10-31'], // Spooky
    hide_days: [6],
    past_event_creation: true
  },
  new_appointment: {
    title: null,
    description: null
  }
  ...
})
`;

const slots = `
<kalendar>
  <!-- CREATED CARD SLOT -->
  <div slot="created-card"
       slot-scope="{ event_information }"
       class="details-card">
    <h4 class="appointment-title">{{event_information.data.title}}</h4>
    <small>
      {{event_information.data.description}}
    </small>
    <span class="time">{{event_information.start_time | formatToHours}} - {{event_information.end_time |
      formatToHours}}</span>
    <button @click="removeEvent(event_information)"
            class="remove">
      X
    </button>
  </div>
  <!-- CREATING CARD SLOT -->
  <div slot="creating-card"
       slot-scope="{ event_information }">
    <h4 class="appointment-title"
        style="text-align: left;">
      New Appointment
    </h4>
    <span class="time">
      {{event_information.start_time | formatToHours}}
      -
      {{event_information.end_time | formatToHours}}
    </span>
  </div>
  <!-- POPUP CARD SLOT -->
  <div slot="popup-form"
       slot-scope="{ popup_information }"
       style="display: flex; flex-direction: column;">
    <h4 style="margin-bottom: 10px">
      New Appointment
    </h4>
    <input v-model="new_appointment['title']"
           type="text"
           name="title"
           placeholder="Title">
    <textarea v-model="new_appointment['description']"
              type="text"
              name="description"
              placeholder="Description"
              rows="2"></textarea>
    <div class="buttons">
      <button class="cancel"
              @click="closePopups()">
        Cancel
      </button>
      <button @click="addEvent(popup_information)">
        Save
      </button>
    </div>
  </div>
</kalendar>
`;

const slots_js = `
// Create Event
addEvent(popup_data, form_data) {
  let payload = {
    data: {
      title: this.new_appointment.title,
      description: this.new_appointment.description,
    },
    from: popup_info.start_time,
    to: popup_info.end_time,
  };

  this.$kalendar.addNewEvent(
    payload,
  );
  this.$kalendar.closePopups();
  this.clearFormData();
},

// Remove Event
removeEvent(kalendarEvent) {
  let day = kalendarEvent.start_time.slice(0, 10);
  this.$kalendar.removeEvent({
    day,
    key: kalendarEvent.key,
    id: kalendarEvent.kalendar_id,
  })
},
`;
export default {
    data: () => ({
        render_it: `<kalendar :configuration="calendar_settings" :events="events"/>`,
        render_it_js: provide_data,
        using_slots: slots,
        using_slots_js: slots_js,
        initialize_js: init_js,
    }),
};
</script>
<style lang="scss">
$blue: #007fff;
$yellow: #f5d547;
$dark: #3c3c3b;

.how-to {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 30px;
    code {
        width: 100%;
        overflow: scroll;
    }
    section {
        max-width: 1100px;
        width: 100%;
        margin: 0 auto;
        > div {
            margin-top: 55px;
        }
    }
    color: $dark;
    h1 {
        color: darken($dark, 5);
    }
    h4 {
        &:before {
            content: '• ';
        }
    }
}

/* Tomorrow Night Theme */

/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

/* Original theme - https://github.com/chriskempson/tomorrow-theme */

/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

code {
    display: flex;
    flex-wrap: wrap;
    > * {
        white-space: normal;
    }
}

.tomorrow-comment,
pre .hljs-comment,
pre .hljs-title {
    color: #969896;
}

.tomorrow-red,
pre .hljs-variable,
pre .hljs-attribute,
pre .hljs-tag,
pre .hljs-regexp,
pre .hljs-ruby .hljs-constant,
pre .hljs-xml .hljs-tag .hljs-title,
pre .hljs-xml .hljs-pi,
pre .hljs-xml .hljs-doctype,
pre .hljs-html .hljs-doctype,
pre .hljs-css .hljs-id,
pre .hljs-css .hljs-class,
pre .hljs-css .hljs-pseudo {
    color: #cc6666;
}

.tomorrow-orange,
pre .hljs-number,
pre .hljs-preprocessor,
pre .hljs-built_in,
pre .hljs-literal,
pre .hljs-params,
pre .hljs-constant {
    color: #de935f;
}

.tomorrow-yellow,
pre .hljs-class,
pre .hljs-ruby .hljs-class .hljs-title,
pre .hljs-css .hljs-rules .hljs-attribute {
    color: #f0c674;
}

.tomorrow-green,
pre .hljs-string,
pre .hljs-value,
pre .hljs-inheritance,
pre .hljs-header,
pre .hljs-ruby .hljs-symbol,
pre .hljs-xml .hljs-cdata {
    color: #b5bd68;
}

.tomorrow-aqua,
pre .hljs-css .hljs-hexcolor {
    color: #8abeb7;
}

.tomorrow-blue,
pre .hljs-function,
pre .hljs-python .hljs-decorator,
pre .hljs-python .hljs-title,
pre .hljs-ruby .hljs-function .hljs-title,
pre .hljs-ruby .hljs-title .hljs-keyword,
pre .hljs-perl .hljs-sub,
pre .hljs-javascript .hljs-title,
pre .hljs-coffeescript .hljs-title {
    color: #81a2be;
}

.tomorrow-purple,
pre .hljs-keyword,
pre .hljs-javascript .hljs-function {
    color: #b294bb;
}

pre code {
    display: block;
    background: #1d1f21;
    color: #c5c8c6;
    font-family: Menlo, Monaco, Consolas, monospace;
    line-height: 1.5;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 14px;
}
</style>
