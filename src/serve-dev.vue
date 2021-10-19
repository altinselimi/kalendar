<template>
	<div>
		<kalendar 
			:configuration="calendar_settings" 
			:events.sync="events"
			:work_time.sync="work_time"
		>
			<div slot="workTimeEdit">
				<button class="main-button" @click="addWorkTime()" v-if="!calendar_settings.working_hours">
					Время работы
				</button>
				<template v-else>
					<button class="main-button --gray" @click="resetWorkTime()">
						Сбросить
					</button>
					<button class="main-button --red" @click="cancelWorkTime()">
						Отменить
					</button>
					<button class="main-button" @click="saveWorkTime()">
						Сохранить
					</button>
				</template>	
			</div>
		</kalendar>
	</div>
</template>
<script>

const _existing_events = [
	// {
	// 	from: '2021-10-07T04:00:00.300Z',
	// 	to: '2021-10-08T04:10:00.300Z',
	// 	data: {
	// 		title: 'Right now',
	// 		description: 'Lorem ipsum',
  //     students: [],
  //     materials: [],
	// 	},
	// },
	// {
	// 	from: '2019-07-11T10:22:00-07:00.000Z',
	// 	to: '2019-07-31T11:55:00-07:00.000Z',
	// 	data: {
	// 		title: 'Truth',
	// 		description: 'Look.',
  //     students: [],
  //     materials: [],
	// 	},
	// },
	// {
	// 	from: '2019-07-11T10:22:00-07:00.000Z',
	// 	to: '2019-07-31T11:20:00-07:00.000Z',
	// 	data: {
	// 		title: 'Side',
	// 		description: 'Look.2',
  //     students: [],
  //     materials: [],
	// 	},
	// },
	{
		from: '2019-07-11T10:22:00.000Z',
		to: '2019-07-31T16:20:00.000Z',
		data: {
			title: 'Europe',
			description: 'Final Countdown',
      students: [],
      materials: [],
		},
	},
];

const _existing_working_hours = {
	'2021-10-05T07:20:00.000Z': '',
	'2021-10-05T07:30:00.000Z': ''
}

let today = new Date();
// change the dates on _existing events to this week
const startDate = new Date(_existing_events[0].from).getUTCDate();

function makeNow(dateString) {
	const d = new Date(dateString);
	d.setYear(today.getUTCFullYear());
	d.setMonth(today.getUTCMonth());
	d.setDate(today.getUTCDate() + (d.getUTCDate() - startDate));
	return d.toISOString();
}
const existing_events = _existing_events.map(ev => ({
	...ev,
	from: makeNow(ev.from),
	to: makeNow(ev.to),
}));
import Kalendar from '@/lib-components/kalendar-container.vue';

export default {
	components: {
		Kalendar,
	},
	data() {
		return {
			events: existing_events,
			work_time: _existing_working_hours,
			calendar_settings: {
				view_type: 'week',
				cell_height: 10,
				scrollToNow: false,
				//start_day: getCurrentDay(),
				military_time: false,
				working_hours: false,
				read_only: false,
				day_starts_at: 0,
				day_ends_at: 19,
				overlap: false, // перекрытие событий
				hide_dates: ['2019-08-09'],
				hide_days: [],
				past_event_creation: true,
			}
		};
	},
	methods: {
		changeWorkTime() {
			this.calendar_settings.working_hours = !this.calendar_settings.working_hours
			this.calendar_settings.read_only = !this.calendar_settings.read_only
		},
		addWorkTime() {
			this.changeWorkTime()
		},
		saveWorkTime() {
			this.changeWorkTime()
			this.$kalendar.saveWorkHours()
		},
		resetWorkTime() {
			this.$kalendar.resetWorkHours()
		},
		cancelWorkTime() {
			this.changeWorkTime()
			this.$kalendar.cancelWorkHours()
		}
	},
};
</script>
<style lang="scss">
$green: #00f0b5;
$red: #f61067;
</style>
