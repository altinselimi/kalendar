import Vue from "vue";
import format from 'date-fns/format';

Vue.filter("normalizeDate", (date, format_type = 'YYYY-MM-DD', locale) => format(date, format_type, { locale }));
