<template>
  <div class="how-to" id="getting-started">
    <section>
      <h1>Getting started</h1>
      <div>
        <h4>Install plugin from npm</h4>
        <pre v-highlightjs><code class="javascript">npm install kalendar-vue -S</code></pre>
      </div>
      <div>
        <h4>Import plugin in your component</h4>
        <pre v-highlightjs="initialize_js"><code class="javascript"></code></pre>
      </div>
      <div>
        <h4>Provide appointments array.</h4>
        <p>This array will be the source of the appointments which are rendered in the calendar.</p>
        <pre v-highlightjs="render_it"><code class="html"></code></pre>
        <pre v-highlightjs="render_it_js"><code class="javascript"></code></pre>
      </div>
    </section>
    <section>
      <h4>Using Slots</h4>
      <p>The plugin can turn incredibly useful using scoped slots. You can customize all the essential parts of it.</p>
      <pre v-highlightjs="using_slots"><code class="html"></code></pre>
      <pre v-highlightjs="using_slots_js"><code class="javascript"></code></pre>
    </section>
  </div>
</template>
<script>
const options = `
calendar_settings: {
  style: 'material_design', // ['flat_design', 'material_design']
  view_type: 'Month', // ['Month', 'Day']
  split_value: 20, // Value % 60 === 0
  cell_height: 20, // !isNaN(Value)
  scrollToNow: true, // Boolean
  current_day: new Date(), // Valid date
}
`;

const init_js = `
import { Kalendar } from 'kalendar-vue';
import 'kalendar-vue/dist/kalendar-vue.css';
...
components: {
  Kalendar,
  ...
},
`;

const provide_data = `
data: () => ({
  appointments: [],
  calendar_settings: {
    style: 'material_design', // ['flat_design', 'material_design']
    view_type: 'Month', // ['Month', 'Day']
    split_value: 20, // Value % 60 === 0
    cell_height: 20, // !isNaN(Value)
    scrollToNow: true, // Boolean
    current_day: new Date(), // Valid date
  },
  ...
})
`;

const slots = `
<kalendar :configuration="calendar_settings" :appointments="appointments" class="generate-shadow">
  <div slot="creating-card" slot-scope="{appointment_props}">
    <!-- This is the card that is displayed while the user is dragging mouse on cells -->
    <!-- You can access various attributes of that selection using the slot scope appointment_props. It contains fields like: start_value, end_value and status. -->
    <h4 class="appointment-title" style="text-align: left;">New Appointment</h4>
    <span class="time">{{appointment_props.start_value.value}} - {{appointment_props.end_value.value}}
    </span>
  </div>
  <div slot="popup-form" slot-scope="{popup_scope}" style="display: flex; flex-direction: column;">
    <!-- This is the popup that is displayed when user has finished dragging(selecting) appointment start and end values. -->
    <!-- You can use the popup_scope variable to access various fields, such as: appointment_data (similar to appointment_props) and close. -->
    <!-- There is a listener attached to the close field. Whenever it gets a false value, the popup closes. -->
    <!-- You can add as many fields as you want. When saving them, make sure to insert them in the data field of the payload for appointments array. In that way you can access them even in the *details-card* slot.-->
    <h4 style="margin-bottom: 10px">New Appointment</h4>
    <input v-model="new_appointment['title']" type="text" name="title" placeholder="Title">
    <textarea v-model="new_appointment['description']" type="text" name="description" placeholder="Description" rows="2"></textarea>
    <div class="buttons">
      <button class="cancel" @click="popup_scope.close_popup = true">Cancel</button>
      <button @click="completeAppointment(popup_scope, new_appointment)">Save</button>
    </div>
  </div>
  <div slot="details-card" slot-scope="{appointment_props}">
    <!-- Similar to creating-card, except that this one is displayed for existing appointments. -->
    <!-- Here you can access the data object, aswell as other fields. Data field is where you save the values from the popup form, which are then accessible here. -->
    <h4 class="appointment-title">{{appointment_props.data.title}}</h4>
    <small v-show="(appointment_props.end - appointment_props.start) > 2">{{appointment_props.data.description}}</small>
    <span class="time">{{appointment_props.start_value.value | normalizeDate('hh:mm A')}} - {{appointment_props.end_value.value | normalizeDate('hh:mm A')}}</span>
  </div>

  <!-- Date formatting -->
  <template slot="first-date" slot-scope="{ date }">
    <!-- Displays first date in week navigation header -->
    {{ date | normalizeDate('MMM DD') }}
  </template>
  <span slot="last-date" slot-scope="{ date }">
    <!-- Displays last date in week navigation header -->
    {{ date | normalizeDate('DD MMM, YYYY') }}
  </template>
  <template slot="current-date" slot-scope="{ date }">
    <!-- Displays current date in single day navigation -->
    {{ date | normalizeDate('DD MMM, YYYY') }}
  </template>
  <template slot="number-date" slot-scope="{ date }">
    <!-- Day number in day indicators -->
    {{ date | normalizeDate('D') }}
  </template>
  <template slot="letters-date" slot-scope="{ date }">
    <!-- Weekday name in day indicators -->
    {{ date | normalizeDate('ddd') }}
  </template>
</kalendar>
`;

const slots_js = `
completeAppointment(popup_data, form_data) {
  let payload = {
    data: {
      title: form_data.title,
      description: form_data.description,
    },
    from: popup_data.appointment_props.start_value.value,
    to: popup_data.appointment_props.end_value.value,
    date: format(popup_data.appointment_props.start_value.value, 'YYYY-MM-DD'),
  };
  this.appointments.push(payload);
  this.new_appointment = {
    title: null,
    description: null,
  };
  popup_data.close_popup = true;
},
`
export default {
  data: () => ({
    render_it: `<kalendar :configuration="calendar_settings" :appointments="appointments"/>`,
    render_it_js: provide_data,
    using_slots: slots,
    using_slots_js: slots_js,
    initialize_js: init_js,
  }),
}

</script>
<style lang="scss">
$blue: #007FFF;
$yellow: #F5D547;
$dark: #3C3C3B;

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
    >div {
      margin-top: 55px;
    }
  }
  color: $dark;
  h1 {
    color: darken($dark, 5);
  }
  h4 {
    &:before {
      content: '• ',
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
  >* {
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
