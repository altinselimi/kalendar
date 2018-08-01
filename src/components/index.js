import Kalendar from './kalendar-components/kalendar-container';
import KalendarCell from './kalendar-components/kalendar-cell';
import KalendarDay from './kalendar-components/kalendar-day';
import KalendarEventpopup from './kalendar-components/kalendar-eventpopup';
import KalendarWeekView from './kalendar-components/kalendar-weekview';
// Install the components
export function install(Vue) {
	Vue.component('kalendar', Kalendar),
	Vue.component('kalendar-cell', KalendarCell);
	Vue.component('kalendar-day', KalendarDay );
	Vue.component('kalendar-eventpopup', KalendarEventpopup);
	Vue.component('kalendar-week-view', KalendarWeekView);
}

// Expose the components
export {
	Kalendar,
	KalendarCell,
	KalendarDay,
	KalendarEventpopup,
	KalendarWeekView,
}