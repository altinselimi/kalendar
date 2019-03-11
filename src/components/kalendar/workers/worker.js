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
  }
})

function getDays(dayString) {
  let date = new Date(dayString);
  date.setUTCHours(0,0,0,0);
  let start_of_week = startOfWeek(date);
  let days = [];
  for(let idx = 0; idx < 7; idx++) {
    days.push({
      value: idx > 0 ? new Date(addDays(date, idx)).toISOString() : date.toISOString(),
      index: idx
    });
  }
  return days;
}

function getHours() {
  let date = new Date();
  date.setUTCHours(0,0,0,0);
  let hours = [];
  for(let idx = 0; idx < 24; idx++) {
    hours.push({
      value: idx > 0 ? new Date(addMinutes(date, 60 * idx)).toISOString() : date.toISOString(),
      index: idx
    });
  }
  return hours;
}


const getDayCells = (dayString) => {
  const day = new Date(dayString);
  day.setUTCHours(0,0,0,0);
  let cells = [];
  for (let idx = 0; idx < 60 * 12; idx++) {
    cells.push({
      value: idx > 0 ? new Date(addMinutes(day, idx)).toISOString() : day.toISOString(),
      selected: false,
      isInBetween: false,
      event_id: null,
      index: idx,
      starter: false,
    })
  }
  return cells;
}


/*const getDayCells = (day_date, existing_events, day_hours) => {

  let has_existing_events = existing_events
    .filter(event => event.date === day_date);

  let filtered_events = {};

  if (has_existing_events.length > 0) {
    has_existing_events.forEach(event => {
      let { from, to } = event;

      let target_hour_from = day_hours.find(hour => getTime(hour.value) === getTime(from));
      let target_hour_to = day_hours.find(hour => getTime(hour.value) === getTime(to));

      //there's a chance user selected last cell
      if (!target_hour_from || !target_hour_to) {
        let last_hour_index = day_hours.length - 1;
        let start_is_midnight = from.getHours() + from.getMinutes() === 0;
        let end_is_midnight = to.getHours() + to.getMinutes() === 0;
        if (start_is_midnight) {
          target_hour_from = day_hours[last_hour_index];
        }
        if (end_is_midnight) {
          target_hour_to = day_hours[last_hour_index];
          //so we take care of the -1 later
          target_hour_to = { ...target_hour_to, ['index']: target_hour_to.index + 1 };
        }
      }

      if (!target_hour_from || !target_hour_to) return;

      let uuid = utils.generateUUID();

      filtered_events[uuid] = {
        start: target_hour_from.index,
        end: target_hour_to.index - 1,
        data: event.data,
        status: 'completed',
      };
      for (let i = target_hour_from.index; i < target_hour_to.index; i++) {
        day_hours[i] = { ...day_hours[i], ['event_id']: uuid };
      }
    });
  }

  return {
  	message: 'completed-hour-calculation',
  	data: {
  		filtered_events,
  		day_hours
  	}
  }
}*/