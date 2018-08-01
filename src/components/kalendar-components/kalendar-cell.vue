<template>
	<li @mouseover.self="mouseMove($event)" @mousedown.self="mouseDown()" @mouseup.self="mouseUp()" :class="{'selected': cellData.selected, 'inbetween': isInBetween, 'first_of_appointment': cell_data.first, 'last_of_appointment': cell_data.last, 'is-an-hour': (index+1)%(60/calendarOptions.split_value) === 0}" :style="`height: ${calendarOptions.cell_height}px`">
		<div v-if="cell_data" class="creator_block" :style="`height: ${distance-1}px`">
			<portal-target name="calendar-card" :slot-props="appointment_props" v-if="!appointment_props.data">
			</portal-target>
			<portal-target name="calendar-card-details" :slot-props="appointment_props" v-if="appointment_props.data">
			</portal-target>
			<div class="popup-parent" v-if="status === 'popup-initiated'" ref="popupRef">
				<div>
					<kalendar-eventpopup :appointment-props="appointment_props" @closePopup="clearPopups('popup-initiated')"></kalendar-eventpopup>
				</div>
			</div>
		</div>
		<div v-if="cell_data && status === 'created'" class="created-appointment">
			<slot></slot>
		</div>
	</li>
</template>
<script>
import differenceInHours from 'date-fns/difference_in_hours';
import format from 'date-fns/format';

export default {
	props: ['creator', 'day', 'index', 'cellData'],
	inject: ['calendarOptions'],
	components: {
		kalendarEventpopup: () =>
			import ('./kalendar-eventpopup.vue'),
	},
	computed: {
		appointments: {
			set(val) {
				this.existing_appointments = val;
			},
			get() {
				return this.calendarOptions.existing_appointments;
			}
		},
		distance() {
			if (!this.cell_data) return false;
			let appointment = this.appointments[this.cellData.appointment_id];
			return ((appointment.end - appointment.start) + 1) * this.calendarOptions.cell_height;
		},
		isInBetween() {
			let l_appointment = this.appointments[this.cellData.appointment_id];
			let { index } = this.cellData;
			return l_appointment && index > l_appointment['start'] && index < l_appointment['end'];
		},
		cell_data() {
			let appoints = this.appointments;
			let cd_id = this.cellData.appointment_id;
			if (!cd_id) return false;
			return appoints.hasOwnProperty(cd_id) && { first: parseInt(appoints[cd_id]['start']) === this.cellData.index, last: parseInt(appoints[cd_id]['end']) === this.cellData.index };
		},
		status() {
			if (!this.appointment) return;
			return this.appointments[this.cellData.appointment_id]['status'];
		},
		appointment() {
			return this.appointments[this.cellData.appointment_id];
		},
		appointment_props() {
			if (!this.appointment) return;
			let { start, end } = this.appointment;
			let hour_start_data = this.day.date_hours[start];
			let hour_end_data = this.day.date_hours[end + 1];
			if (!hour_end_data) {
				hour_end_data = this.day.date_hours[end];
				hour_end_data['value'] = new Date(this.day.date);
				hour_end_data['value'].setHours(24, 0, 0);
			}
			return { ...this.appointment, ['start_value']: hour_start_data, ['end_value']: hour_end_data };
		},
	},
	methods: {
		mouseDown() {
			this.clearPopups('popup-initiated');
			this.calendarOptions.currently_working_on_date = this.day.date;

			if (this.cellData.appointment_id && this.appointment) {
				this.resetCreator();
				return;
			}
			if (this.creator.status !== null) {
				this.resetCreator();
			}
			let payload = {
				creating: true,
				starting_cell_index: this.index,
				current_cell_index: this.index,
				appointment_id: this.generateUUID(),
			};
			this.$emit('select', { index: this.index, payload: payload });
		},
		mouseMove(event) {
			if (this.creator && !this.creator.creating) return;
			//index is the index of this component, whereas this.creator is the object which is used for the day component
			let { starting_cell_index, creating, appointment_id } = this.creator;
			let cells_index = this.index;
			let ending_index = cells_index;
			if (this.cellData.appointment_id && !this.appointment) {
				this.cellData.appointment_id = null;
			}
			if (!!this.cellData.appointment_id && appointment_id !== this.cellData.appointment_id) {
				this.mouseUp();
				return;
			}
			if (cells_index < starting_cell_index) {
				ending_index = this.appointments[appointment_id].end;
				starting_cell_index = cells_index;
			}
			if (creating) {
				let payload = { ...this.creator,
					['current_cell_index']: this.index,
					['starting_cell_index']: starting_cell_index,
					['ending_cell_index']: ending_index,
					['status']: 'pending',
				};
				this.$emit('select', { payload: payload, index: this.index });
			}
		},
		mouseUp() {
			if (this.creator.creating) {
				this.$emit('initiatePopup');
			}
		},
		resetCreator() {
			this.$emit('reset');
		},
		generateUUID() {
			return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
				(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
			)
		},
		clearPopups(status) {
			this.calendarOptions.currently_working_on_date = null;
			let { existing_appointments } = this.calendarOptions;
			for (let key in existing_appointments) {
				if (existing_appointments[key]['status'] === 'popup-initiated') {
					this.$delete(existing_appointments, key);
				}
			}
		},
	},
}
</script>
<style lang="scss">
$creator-bg: #34aadc;
$creator-content: white;

li {
	font-size: 13px;
	position: relative;
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
		.creator_block {
			display: none; //opacity: .85;
		}
		&.first_of_appointment.last_of_appointment  {
			.new-event, .existing-event {
				font-size: 80%;
			}
			.time {
				opacity: 0;
			}
		}
		&.first_of_appointment .creator_block {
			display: flex;
			flex-direction: column;
			>* {
				flex: 1;
			}
			position: absolute;
			pointer-events: none;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0; //z-index: 20!important;
			//background-color: rgba($creator-bg, .85);
			color: $creator-content;
			width: 100%;
			user-select: none;
			will-change: height; //padding: 4px 6px;
		}
		.time {
			position: absolute;
			bottom: 4px;
			right: 6px;
			font-size: 11px;
		}
	}
	.popup-parent {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		pointer-events: auto;
		z-index: 3;
		left: 0px;
		user-select: all;
		>div {
			position: relative;
			width: 100%;
			height: 100%; // margin-left: 10px;
		}
	}
}


div.creator_block {
	h4,
	p,
	span {
		margin: 0px;
	}
}
</style>