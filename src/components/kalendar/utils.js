let creators_offset = new Date().getTimezoneOffset() / 60;
if (creators_offset * -1 >= 0) {
  creators_offset *= -1;
  creators_offset = `${(creators_offset + '').padStart(2, '0')}:00`;
  creators_offset = `+${creators_offset}`;
} else {
  creators_offset = `${(creators_offset + '').padStart(2, '0')}:00`;
  creators_offset = `-${creators_offset}`;
}

const getHourlessDate = (date_string) => {
  let today = date_string ? new Date(date_string) : new Date();
  let year = today.getFullYear() + '',
    month = ((today.getMonth() + 1) + '').padStart(2, 0),
    day = (today.getDate() + '').padStart(2, 0);

  return `${year}-${month}-${day}T00:00:00.000Z`;
};

const getDatelessHour = (date_string, military) => {
  let time = addTimezoneInfo(date_string);
  if(military) return getLocaleTime(time).slice(11,16);
  return formatAMPM(new Date(getLocaleTime(time)));
}

const getYearMonthDay = (date_string) => {
  return getHourlessDate(date_string).slice(0, 10);
}

const getUTCDate = (date_string = Date.now()) => {
  const date = new Date(date_string);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

const addDays = (date, days) => {
  let dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

const addHours = (date, hours) => {
  return addMinutes(date, hours * 60);
};

const startOfWeek = (date) => {
  let d = new Date(date);
  let day = d.getDay(),
    diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const endOfWeek = (date) => {
  let dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);
  let toAdd = 6 - dateObj.getDay();
  return addDays(dateObj, toAdd);
};

const isMobile = () => {
  let check = false;
  (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

const generateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
};

const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};

const getDayDateID = (date) => {
  let year = `${date.getUTCFullYear()}`;
  let month = `${date.getUTCMonth()}`.padStart(2, 0);
  let day = `${date.getUTCDate()}`.padStart(2, 0);
  return `${year}-${month}-${day}`;
}

const getLocaleTime = (dateString) => {
  let [date, hour] = new Date(dateString).toLocaleString('en-GB')
    .split(', ');
  date = date.split('/').reverse().join('-');
  return `${date}T${hour}.000Z`;
}

const addTimezoneInfo = (ISOdate) => {
  if (new Date(ISOdate).toISOString() !== ISOdate) return;
  return `${ISOdate.slice(0,19)}${creators_offset}`;
}

const isToday = (date) => {
  if (!date) return
  let today = getLocaleTime(new Date()).slice(0, 10);
  return date.slice(0, 10) === today;
}

const isBefore = (date1, date2) => {
  if (!date1 || !date2) return;
  return new Date(date1) < new Date(date2);
}

const isWeekend = (date) => {
  if (!date) return;
  let day = new Date(date).getDay();
  return day === 6 || day === 0;
}

const formatAMPM = (date) => {
  let hours = date.getUTCHours();
  let result = `${hours % 12 === 0 ? 12 : hours % 12} ${hours >= 12 ? 'PM' : 'AM'}`;
  return result;
}

export default {
  addDays,
  addMinutes,
  addHours,
  startOfWeek,
  endOfWeek,
  isMobile,
  generateUUID,
  cloneObject,
  addTimezoneInfo,
  getHourlessDate,
  getDatelessHour,
  getYearMonthDay,
  getLocaleTime,
  isToday,
  isBefore,
  isWeekend,
  formatAMPM
};