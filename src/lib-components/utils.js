let creators_offset = new Date().getTimezoneOffset() / 60;
if (creators_offset * -1 >= 0) {
  creators_offset *= -1;
  creators_offset = `${(creators_offset + "").padStart(2, "0")}:00`;
  creators_offset = `+${creators_offset}`;
} else {
  creators_offset = `${(creators_offset + "").padStart(2, "0")}:00`;
  creators_offset = `-${creators_offset}`;
}

const getHourlessDate = date_string => {
  let today = date_string ? new Date(date_string) : new Date();
  let year = today.getFullYear() + "",
    month = (today.getMonth() + 1 + "").padStart(2, "0"),
    day = (today.getDate() + "").padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00.000Z`;
};

const getDatelessHour = (date_string, military) => {
  let time = addTimezoneInfo(date_string);
  if (military) return getLocaleTime(time).slice(11, 16);
  return formatAMPM(new Date(getLocaleTime(time)));
};

const getYearMonthDay = date_string => {
  return getHourlessDate(date_string).slice(0, 10);
};

const getTime = (date) => {
  let dateObj = new Date(date);
  let minutes = dateObj.getUTCHours().toString().padStart(2, "0");
  let seconds = dateObj.getUTCMinutes().toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
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

const startOfWeek = date => {
  let d = new Date(date);
  let day = d.getDay(),
    diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const endOfWeek = date => {
  let dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);
  let toAdd = 6 - dateObj.getDay();
  return addDays(dateObj, toAdd);
};

const generateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const cloneObject = object => JSON.parse(JSON.stringify(object));

const getLocaleTime = dateString => {
  let [date, hour] = new Date(dateString).toLocaleString("en-GB").split(", ");
  date = date.split("/").reverse().join("-");
  return `${date}T${hour}.000Z`;
};

const addTimezoneInfo = ISOdate => {
  if (new Date(ISOdate).toISOString() !== ISOdate) return;
  return `${ISOdate.slice(0, 19)}${creators_offset}`;
};

const isToday = date => {
  if (!date) return;
  let today = getLocaleTime(new Date()).slice(0, 10);
  return date.slice(0, 10) === today;
};

const isBefore = (date1, date2) => {
  if (!date1 || !date2) return;
  return new Date(date1) < new Date(date2);
};

const isWeekend = date => {
  if (!date) return;
  let day = new Date(date).getDay();
  return day === 6 || day === 0;
};

const formatAMPM = date => {
  let hours = date.getUTCHours();
  return `${hours % 12 === 0 ? 12 : hours % 12} ${hours >= 12 ? "PM" : "AM"}`;
};

export {
  addDays,
  addMinutes,
  addHours,
  startOfWeek,
  endOfWeek,
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
  formatAMPM,
  getTime,
};
