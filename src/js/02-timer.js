import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix, { Notify } from 'notiflix';

let getEl = selector => document.querySelector(selector);

const input = getEl(`#datetime-picker`);
const btnStart = getEl(`button`);
const days = getEl(`[data-days]`);
const hours = getEl(`[data-hours]`);
const minutes = getEl(`[data-minutes]`);
const seconds = getEl(`[data-seconds]`);

let timerId = null;
btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let now = new Date().getTime();
  },
};
flatpickr(`input[type="text"]`, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
//       let roundVal = selectedDates[0] - date;
//       let dataValues = convertMs(roundVal) {
//           days.textContent = dataValues.days.toString().padStart(2, 0);
//   hours.textContent = dataValues.hours.toString().padStart(2, 0);
//   minutes.textContent = dataValues.minutes.toString().padStart(2, 0);
//   seconds.textContent = dataValues.seconds.toString().padStart(2, 0);
