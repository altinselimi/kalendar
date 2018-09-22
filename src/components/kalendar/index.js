import PortalVue from 'portal-vue'
import format from 'date-fns/format';
import smoothscroll from 'smoothscroll-polyfill';
import Kalendar from './kalendar-container';
import KalendarCell from './kalendar-cell';
import KalendarDay from './kalendar-day';
import KalendarEventpopup from './kalendar-eventpopup';
import KalendarWeekView from './kalendar-weekview';

// Install the components
export function install(Vue) {
	Vue.component('kalendar', Kalendar);
	Vue.component('kalendar-cell', KalendarCell);
	Vue.component('kalendar-day', KalendarDay);
	Vue.component('kalendar-eventpopup', KalendarEventpopup);
	Vue.component('kalendar-week-view', KalendarWeekView);
	Vue.use(PortalVue);
	Vue.filter("normalizeDate", (date, format_type = 'YYYY-MM-DD') => format(date, format_type));

	// kick off the polyfill!
	smoothscroll.polyfill();
}

// Expose the components
export {
	Kalendar,
	KalendarCell,
	KalendarDay,
	KalendarEventpopup,
	KalendarWeekView,
}