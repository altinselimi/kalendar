import registerPromiseWorker from 'promise-worker/register'
import { format, addMinutes, getMinutes, startOfWeek, addDays } from 'date-fns'

/*import addMinutes from 'date-fns/add_minutes'; works
import getTime from 'date-fns/get_time'; doesnt work
import getHours from 'date-fns/get_hours'; doesnt work
import getMinutes from 'date-fns/get_minutes'; works
*/

registerPromiseWorker((message) => {
  const { type, data } = message;
  if (type === 'message') {
    return `Worker replies: ${JSON.stringify(message)}. At ${format(addMinutes(new Date(), 30), 'YYYY/MM/DD HH:mm')}`
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
  }
})

function getDays(dayString) {
  let date = new Date(dayString);
  date.setUTCHours(0, 0, 0, 0);
  let start_of_week = startOfWeek(date);
  let days = [];
  for (let idx = 0; idx < 7; idx++) {
    days.push({
      value: idx > 0 ? new Date(addDays(date, idx)).toISOString() : date.toISOString(),
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
  for (let idx = 0; idx < 6 * 24; idx++) {
    cells.push({
      value: idx > 0 ? new Date(addMinutes(day, idx * 10)).toISOString() : day.toISOString(),
      selected: false,
      isInBetween: false,
      index: idx,
      starter: false,
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
  if(events_for_this_day.length === 0) return {};
  let filtered_events = {};
  events_for_this_day.forEach(event => {
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

    const equalHours = (c1, c2) => {
      return new Date(c1.value).valueOf() === new Date(c2).valueOf();
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
      distance: diffMins + (diffInHrs * 60),
      status: 'completed'
    };

    if (filtered_events.hasOwnProperty(eventKey)) {
      filtered_events[eventKey].push(constructedEvent);
    } else {
      filtered_events[eventKey] = [constructedEvent];
    }
  });
  return filtered_events;
}