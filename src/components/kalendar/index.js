import PortalVue from 'portal-vue'
import smoothscroll from 'smoothscroll-polyfill';
import Kalendar from './kalendar-container';
import KalendarCell from './kalendar-cell';
import KalendarDay from './kalendar-day';
import KalendarEventpopup from './kalendar-eventpopup';
import KalendarWeekView from './kalendar-weekview';
import Filters from './filters.js';

// Install the components
export function install(Vue) {
	for(let key in Filters) {
		Vue.filter(key, Filters[key]);
		console.log('Reigstered:', key);
		console.log('Which had ufnciton:', Filters[key]);
	}
	//Vue.filter("normalizeDate", (date, format_type = 'YYYY-MM-DD') => format(date, format_type));
	Vue.component('kalendar', Kalendar);
	Vue.component('kalendar-cell', KalendarCell);
	Vue.component('kalendar-day', KalendarDay);
	Vue.component('kalendar-eventpopup', KalendarEventpopup);
	Vue.component('kalendar-week-view', KalendarWeekView);
	Vue.use(PortalVue);

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