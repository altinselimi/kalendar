import registerPromiseWorker from 'promise-worker/register'
import Utils from '../utils.js';
const {
  generateUUID,
  addDays,
  addMinutes,
  addHours,
  getYearMonthDay,
  getLocaleTime
} = Utils;
import hourUtils from '../hours.js';

registerPromiseWorker((message) => {
  const { type, data } = message;
  if (type === 'message') {
    return `Worker replies: ${new Date().toISOString()}`
  }

  switch (type) {
    case 'getDays':
      return getDays(data.day, data.options);
    case 'getHours':
      return getHours(data.hourOptions);
    case 'getDayCells':
      return getDayCells(data.day, data.hourOptions);
    case 'constructDayEvents':
      return constructDayEvents(data.day, data.events);
    case 'constructNewEvent':
      return constructNewEvent(data.event)
  }
})

function getDays(dayString, { hide_dates, hide_days, view_type }) {
  let date = new Date(`${dayString}T00:00:00.000Z`);
  let day_of_week = date.getUTCDay() - 1;
  let days = [];
  if (view_type === 'day') {
    days = [{
      value: date.toISOString(),
      index: 0
    }];
  } else {
    for (let idx = 0; idx < 7; idx++) {
      days.push({
        value: addDays(date, idx - day_of_week).toISOString(),
        index: idx,
      });
    }
  }
  if (hide_dates && hide_dates.length > 0) {
    days = days.filter(({ value }) => {
      return hide_dates.indexOf(value.slice(0, 10)) < 0;
    });
  }
  if (hide_days && hide_days.length > 0) {
    days = days.filter(({ index }) => {
      return hide_days.indexOf(index) < 0;
    });
  }
  return days;
}

function getHours(day_options) {
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  let iso_date = getYearMonthDay(date);

  let day_hours = hourUtils.getFullHours();
  if (day_options) {
    let { start_hour, end_hour } = day_options;
    day_hours = day_hours.slice(start_hour, end_hour)
  }
  let hours = [];
  for (let idx = 0; idx < day_hours.length; idx++) {
    let value = `${iso_date}T${day_hours[idx]}.000Z`;
    hours.push({
      value,
      index: idx,
      visible: true
    });
  }
  return hours;
}

const getDayCells = (dayString, day_options) => {
  if (new Date(dayString).toISOString() !== dayString) {
    throw new Error('Unsupported dayString parameter provided');
  };

  let cells = [];
  let date_part = dayString.slice(0, 10);
  let all_hours = hourUtils.getAllHours();
  if (day_options) {
    let { start_hour, end_hour } = day_options;
    let start_index = start_hour * 6;
    let end_index = (end_hour * 6) + 1;
    all_hours = all_hours.slice(start_index, end_index);
  }
  for (let hourIdx = 0; hourIdx < all_hours.length; hourIdx++) {
    let hour = all_hours[hourIdx];
    let value = `${date_part}T${hour}.000Z`;
    cells.push({
      value,
      index: hourIdx,
      visible: true
    });
  }
  return cells;
}

const constructDayEvents = (day, existing_events) => {
  let events_for_this_day = existing_events
    .map(event => {
      let { from, to } = event;
      from = getLocaleTime(from);
      to = getLocaleTime(to);
      return {
        ...event,
        from,
        to
      }
    }).filter(({ from }) => {
      return from.slice(0, 10) === day.slice(0, 10);
    });

  if (events_for_this_day.length === 0) return {};
  let filtered_events = {};
  events_for_this_day.forEach(event => {
    const constructedEvent = constructNewEvent(event);
    let { key } = constructedEvent;
    if (filtered_events.hasOwnProperty(key)) {
      filtered_events[key].push(constructedEvent);
    } else {
      filtered_events[key] = [constructedEvent];
    }
  });
  return filtered_events;
}

const constructNewEvent = (event) => {
  let { from, to } = event;

  from = new Date(from);
  to = new Date(to);

  from.setUTCSeconds(0, 0);
  to.setUTCSeconds(0, 0);
  let from_value = from.toISOString();
  let masked_from = new Date(from.getTime());
  let masked_to = new Date(to.getTime());
  const fromData = {
    value: from_value,
    masked_value: masked_from.toISOString(),
    rounded: false,
    round_offset: null
  };
  const to_value = to.toISOString();
  const toData = {
    value: to_value,
    masked_value: masked_to.toISOString(),
    rounded: false,
    round_offset: null,
  };

  let multipleOf10 = (dateStr) => new Date(dateStr).getMinutes() % 10;

  if (multipleOf10(fromData.value) !== 0) {
    fromData.rounded = true;
    fromData.round_offset = multipleOf10(fromData.value);
    let minutes = new Date(fromData.value).getMinutes();
    let maskedMinutes = (Math.floor(minutes / 10) * 10);
    masked_from.setMinutes(maskedMinutes);
    fromData.masked_value = masked_from.toISOString();
  }

  let eventKey = masked_from.toISOString();

  // 1 minute equals 1 pixel in our view. That means we need to find the length
  // of the event by finding out the difference in minutes 
  const diffInMs = to - from;
  const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);
  const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);

  let constructedEvent = {
    start: fromData,
    end: toData,
    data: event.data,
    id: event.id || generateUUID(),
    distance: diffMins + (diffInHrs * 60),
    status: 'completed',
    key: eventKey
  };

  console.log('Constructed event:', constructedEvent);

  return constructedEvent;
}

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
const getDaysInMonth = (month, year) => {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}