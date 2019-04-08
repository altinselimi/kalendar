import format from 'date-fns/format';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

export default {
  formatUTCDate(value, how) {
    return format(getUTCDate(value), how);
  },
  formatDate(value, how) {
    return format(getUTCDate(value), how);
  },
}

const getUTCDate = (dateString = Date.now()) => {
  const date = new Date(dateString);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};