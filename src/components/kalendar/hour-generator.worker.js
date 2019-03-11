self.postMessage({
  message: 'wazuuupp'
});

onmessage = function(e, ...params) {
  switch (e) {
    case 'getHours':
      getHours(params.day);
      break;
    case 'getDayCells':
      getDayCells(params.day, params.day_events, params.day_hours);
      break;
  }
};

const getHours = (day) => {
  let hours = [];
  for (let idx = 0; i < 60 * 24; i++) {
    hours.push({
      value: index > 0 ? addMinutes(e.day_date, index) : e.day_date,
      selected: false,
      isInBetween: false,
      event_id: null,
      index: index,
      starter: false,
    })
  }
  postMessage({
    message: 'generated-hours',
    hours: hours
  });
}

const populateWithExistingEvents = (day_date, existing_events, day_hours) => {

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

  postMessage({
    message: 'generated-hours',
    hours: day_hours
  });

  postMessage({
    message: 'filtered-events',
    events: filtered_events
  })
}