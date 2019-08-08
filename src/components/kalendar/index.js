import PortalVue from 'portal-vue'
import smoothscroll from 'smoothscroll-polyfill';
import Kalendar from './kalendar-container';
import KalendarCell from './kalendar-cell';
import KalendarEvent from './kalendar-event';
import KalendarDay from './kalendar-day';
import KalendarWeekView from './kalendar-weekview';
// window.crypto = window.crypto || window.msCrypto; // IE11 Polyfill

// Install the components
export function install(Vue) {
	Vue.component('kalendar', Kalendar);
	Vue.component('kalendar-cell', KalendarCell);
	Vue.component('kalendar-day', KalendarDay);
	Vue.component('kalendar-week-view', KalendarWeekView);
	Vue.component('kalendar-event', KalendarEvent);
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
	KalendarEvent
}