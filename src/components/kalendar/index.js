import PortalVue from 'portal-vue'
import smoothscroll from 'smoothscroll-polyfill';
import Kalendar from './kalendar-container';
import KalendarCell from './kalendar-cell';
import KalendarDay from './kalendar-day';
import KalendarWeekView from './kalendar-weekview';
import Filters from './filters.js';

// Install the components
export function install(Vue) {
	Vue.prototype.$kalendar = {};
	for(let key in Filters) {
		Vue.filter(key, Filters[key]);
	}
	Vue.component('kalendar', Kalendar);
	Vue.component('kalendar-cell', KalendarCell);
	Vue.component('kalendar-day', KalendarDay);
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
	KalendarWeekView,
}