import Vue from 'vue';
import { DateTime } from 'luxon';

export default {
    created() {
        Vue.filter('formatToHours', (value) => {
            let dt = DateTime.fromISO(value);
            return dt.toLocaleString(DateTime.TIME_24_SIMPLE);
        });
    }
}