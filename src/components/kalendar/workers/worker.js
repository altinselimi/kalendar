import registerPromiseWorker from 'promise-worker/register'
import Utils from '../utils.js';
const { generateUUID, addDays, addMinutes, addHours } = Utils;

registerPromiseWorker((message) => {
  const { type, data } = message;
  if (type === 'message') {
    return `Worker replies: ${new Date().toISOString()}`
  }

  switch (type) {
    case 'getDays':
      return getDays(data.day);
    case 'getHours':
      return getHours();
    case 'getDayCells':
      return getDayCells(data.day, data.day_events, data.day_hours);
    case 'constructDayEvents':
      return constructDayEvents(data.day, data.events);
    case 'constructNewEvent':
      return constructNewEvent(data.event)
  }
})

function getDays(dayString) {
  console.log('DayString:', dayString);
  let date = new Date(dayString);
  date.setUTCHours(0, 0, 0, 0);
  let day_of_week = date.getDay();
  let days = [];
  for (let idx = 0; idx < 7; idx++) {
    days.push({
      value: addDays(date, idx - day_of_week).toISOString(),
      index: idx
    });
  }
  return days;
}

function getHours() {
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  let hours = [];
  for (let idx = 0; idx < 24; idx++) {
    hours.push({
      value: idx > 0 ? new Date(addMinutes(date, 60 * idx)).toISOString() : date.toISOString(),
      index: idx
    });
  }
  return hours;
}

const getDayCells = (dayString) => {
  const day = new Date(dayString);
  day.setUTCHours(0, 0, 0, 0);
  let cells = [];
  for (let idx = 0; idx < (6 * 24) + 1; idx++) {
    cells.push({
      value: idx > 0 ? new Date(addMinutes(day, idx * 10)).toISOString() : day.toISOString(),
      index: idx,
    })
  }
  return cells;
}

const constructDayEvents = (day, existing_events) => {
  let events_for_this_day = existing_events.filter(event => {
    let { from, to } = event;
    from = new Date(from);
    to = new Date(to);
    from.setUTCHours(0, 0, 0, 0);
    to.setUTCHours(0, 0, 0, 0);
    return from.valueOf() === new Date(day).valueOf();
  });
  console.log('Events for this day:', events_for_this_day);
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
  const fromData = {
    value: from,
    masked_value: new Date(from.getTime()),
    rounded: false,
    round_offset: null
  };
  const toData = {
    value: to,
    masked_value: new Date(to.getTime()),
    rounded: false,
    round_offset: null
  };

  let multipleOf10 = (dateStr) => new Date(dateStr).getMinutes() % 10;

  if (multipleOf10(fromData.value) !== 0) {
    fromData.rounded = true;
    fromData.round_offset = multipleOf10(fromData.value);
    let minutes = new Date(fromData.value).getMinutes();
    let maskedMinutes = (Math.floor(minutes / 10) * 10);
    fromData.masked_value.setMinutes(maskedMinutes);
  }

  let eventKey = fromData.masked_value.toISOString();

  // 1 minute equals 1 pixel in our view. That means we need to find the length
  // of the event by finding out the difference in minutes 
  const diffInMs = toData.value - fromData.value;
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