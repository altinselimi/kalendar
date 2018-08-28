import Kalendar from './kalendar-components/kalendar-container';
import KalendarCell from './kalendar-components/kalendar-cell';
import KalendarDay from './kalendar-components/kalendar-day';
import KalendarEventpopup from './kalendar-components/kalendar-eventpopup';
import KalendarWeekView from './kalendar-components/kalendar-weekview';
import PortalVue from 'portal-vue'
import format from 'date-fns/format';
import smoothscroll from 'smoothscroll-polyfill';

// Install the components
export function install(Vue) {
	Vue.component('kalendar', Kalendar);
	Vue.component('kalendar-cell', KalendarCell);
	Vue.component('kalendar-day', KalendarDay);
	Vue.component('kalendar-eventpopup', KalendarEventpopup);
	Vue.component('kalendar-week-view', KalendarWeekView);
	Vue.use(PortalVue);
	Vue.filter("normalizeDate", (date, format_type = 'YYYY-MM-DD', locale) => format(date, format_type, { locale }));

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