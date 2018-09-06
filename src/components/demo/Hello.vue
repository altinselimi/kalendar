<template>
	<div class="calendarium">
		<quick-intro></quick-intro>
		<button class="add-manual" @click="adding_manually = true">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
		</button>
		<div class="manual-add" v-show="adding_manually">
			<form name="manual-form">
				<label>Title
					<el-input v-model="manual_form['title']" name="title" placeholder="Title" />
				</label>
				<label>Description
					<el-input v-model="manual_form['description']" type="textarea" name="description" placeholder="Description" rows="2"></el-input>
				</label>
				<label>Date
					<el-date-picker v-model="manual_form['date']" type="date" placeholder="Pick a day" value-format="yyyy-MM-dd">
					</el-date-picker>
				</label>
				<label>
					From
					<el-time-select :picker-options="{ start: '00:00',step: '00:15',end: '24:00'}" v-model="manual_form['from']" placeholder="Start time">
					</el-time-select>
				</label>
				<label>
					To
					<el-time-select :picker-options="{ start: '00:00',step: '00:15',end: '24:00'}" v-model="manual_form['to']" placeholder="End time">
					</el-time-select>
				</label>
				<span class="info">Date format must be a valid one. For example:
					<strong>2018-08-09T01:50:00</strong>.</span>
				<button type="button" @click="addManually()" class="save">Add Event</button>
				<button type="button" class="close" @click="adding_manually = false">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
						<line x1="12" y1="5" x2="12" y2="19"></line>
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
				</button>
			</form>
		</div>
		<options>
			<label>Style
				<el-select v-model="calendar_settings['style']" placeholder="Style" size="small">
					<el-option value="material_design" label="Material Design"></el-option>
					<el-option value="flat_design" label="Flat Design"></el-option>
				</el-select>
			</label>
			<label>View Type
				<el-select v-model="calendar_settings['view_type']" placeholder="View Type" size="small">
					<el-option value="Day"></el-option>
					<el-option value="Month"></el-option>
				</el-select>
			</label>
			<label>Hour Base
				<el-select v-model.number="calendar_settings['split_value']" placeholder="Hour Base" size="small">
					<el-option value="5" label="5 minutes"></el-option>
					<el-option value="10" label="10 minutes"></el-option>
					<el-option value="15" label="15 minutes"></el-option>
					<el-option value="20" label="20 minutes"></el-option>
					<el-option value="30" label="30 minutes"></el-option>
				</el-select>
			</label>
			<label>Military Time
				<el-checkbox size="small" v-model="calendar_settings['military_time']"></el-checkbox>
			</label>
			<label>Cell Height
				<el-input size="small" type="number" name="cell-height" v-model.number="calendar_settings['cell_height']" />
			</label>
			<label>Day
				<el-date-picker size="small" v-model="calendar_settings['current_day']" type="date" placeholder="Pick a day" format="yyyy-MM-dd">
				</el-date-picker>
			</label>
			<label>Scroll to now
				<el-checkbox size="small" v-model="calendar_settings['scrollToNow']"></el-checkbox>
			</label>
			<label>Outline slots
				<el-checkbox size="small" v-model="outline_slots"></el-checkbox>
			</label>
		</options>
		<div class="calendar-component" :class="{'show-slots': outline_slots}">
			<kalendar :configuration="calendar_settings" :appointments="appointments" class="generate-shadow">
				<div slot="creating-card" slot-scope="{appointment_props}">
					<h4 class="appointment-title" style="text-align: left;">New Appointment</h4>
					<span class="time">{{getHours(appointment_props.start_value.value, appointment_props.end_value.value)}}
					</span>
				</div>
				<div slot="popup-form" slot-scope="{popup_scope}" style="display: flex; flex-direction: column;">
					<h4 style="margin-bottom: 10px">New Appointment</h4>
					<input v-model="new_appointment['title']" type="text" name="title" placeholder="Title">
					<textarea v-model="new_appointment['description']" type="text" name="description" placeholder="Description" rows="2"></textarea>
					<div class="buttons">
						<button class="cancel" @click="popup_scope.close_popup = true">Cancel</button>
						<button @click="completeAppointment(popup_scope, new_appointment)">Save</button>
					</div>
				</div>
				<div slot="details-card" slot-scope="{appointment_props}">
					<h4 class="appointment-title">{{appointment_props.data.title}}</h4>
					<small v-show="(appointment_props.end - appointment_props.start) > 2">{{appointment_props.data.description}}</small>
					<span class="time">{{appointment_props.start_value.value | normalizeDate('hh:mm A')}} - {{appointment_props.end_value.value | normalizeDate('hh:mm A')}}</span>
				</div>
			</kalendar>
		</div>
		<how-to></how-to>
	</div>
</template>
<script>
const existing_appointments = [{
	from: 'Wed Aug 01 2018 01:00:00',
	to: 'Wed Aug 01 2018 02:00:00',
	date: '2018-08-01',
	data: {
		title: 'Barber Checkin',
		description: 'Lorem ipsum dolor sit amet.',
	},
}, {
	from: 'Thu Aug 09 2018 01:00:00',
	to: 'Thu Aug 09 2018 02:00:00',
	date: '2018-08-09',
	data: {
		title: 'My Birthday',
		description: 'Lorem ipsum dolor sit amet.',
	},
}];
import Vue from 'vue';

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import format from 'date-fns/format';
import getTime from 'date-fns/get_time';

import Kalendar from '../kalendar-components/kalendar-container.vue';
//import { Kalendar } from 'kalendar-vue';
//import 'kalendar-vue/dist/kalendar-vue.css';

import { DatePicker, TimePicker, Select, Input, TimeSelect, Option, Checkbox } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import HowTo from './how-to.vue';

let new_appointment_model = {
	description: null,
	title: null,
};

let manual_appointment_model = { ...new_appointment_model,
	from: null,
	to: null,
	date: null,
};

export default {
	components: {
		Kalendar,
		options: () =>
			import ('./options.vue'),
		quickIntro: () =>
			import ('./quick-intro.vue'),
		elInput: Input,
		elSelect: Select,
		elTimePicker: TimePicker,
		elDatePicker: DatePicker,
		elTimeSelect: TimeSelect,
		elOption: Option,
		elCheckbox: Checkbox,
		HowTo,
	},
	data: () => ({
		appointments: existing_appointments,
		calendar_settings: {
			style: 'material_design',
			view_type: 'Month',
			split_value: 20,
			cell_height: 20,
			scrollToNow: false,
			current_day: new Date(),
			military_time: false,
		},
		outline_slots: false,
		new_appointment: JSON.parse(JSON.stringify(new_appointment_model)),
		manual_form: JSON.parse(JSON.stringify(manual_appointment_model)),
		adding_manually: false,
	}),
	methods: {
		getHours(start, end) {
			return `${format(start, 'hh:mm A')} - ${format(end, 'hh:mm A')}`;
		},
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
			this.new_appointment = JSON.parse(JSON.stringify(new_appointment_model));
			popup_data.close_popup = true;
		},
		addManually() {
			let { title, description, from, to, date } = this.manual_form;
			from = `${date}T${from}:00`;
			to = `${date}T${to}:00`;
			let payload = {
				data: { title, description },
				from,
				to,
				date: format(from, 'YYYY-MM-DD'),
			};
			this.appointments.push(payload);
			this.manual_form = JSON.parse(JSON.stringify(manual_appointment_model));
			this.adding_manually = false;
		},
	},
};

</script>
<style lang="scss">
$green: #00F0B5;
$red: #F61067;
$blue: #007FFF;
$yellow: #F5D547;
$dark: #3C3C3B;

body {
	margin: 0px;
	* {
		box-sizing: border-box;
	}
}

.calendar-component {
	//padding: 50px 0px;
	position: relative;
	z-index: 1;
}

.event-popup {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.event-popup .buttons {
	margin-top: 5px;
	display: flex;
	justify-content: space-between;
}

.event-popup .buttons button {
	border: none;
	color: #29771c;
	background-color: rgba($green, .04);
	padding: 5px 10px;
	&.cancel {
		background-color: rgba($red, .04);
		color: $red;
	}
}

.add-manual {
	border: none;
	background-color: $blue;
	color: white;
	svg {
		stroke: white;
	}
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0px;
	width: 60px;
	height: 60px;
	position: fixed;
	bottom: 20px;
	right: 20px;
	border-radius: 50%;
	z-index: 2;
}

.manual-add {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	z-index: 11;
	background-color: rgba(black, .7);
	>form {
		max-width: 540px;
		display: flex;
		flex-direction: column;
		background-color: white;
		border-radius: 8px;
		padding: 20px;
		position: relative;
	}
	label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		margin-bottom: 10px;
		border-bottom: solid 1px whitesmoke;
		padding-bottom: 10px;
	}
	.info {
		font-size: 12px;
		color: grey;
	}
	button.save {
		border: none;
		margin-top: 15px;
		padding: 10px;
		background-color: blue;
		color: white;
		font-size: 16px;
		border-radius: 8px;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
	}
	button.close {
		border: none;
		outline: none;
		transform: rotate(45deg);
		background: transparent;
		position: absolute;
		top: -25px;
		right: -25px;
		svg {
			stroke: white;
		}
	}
	.el-input,
	textarea {
		font-size: 14px;
		min-width: 160px;
		max-width: 200px;
		margin-left: auto;
	}
}

.show-slots .vue-portal-target {
	outline: dashed 1px red;
	outline-offset: -1px;
}

</style>
