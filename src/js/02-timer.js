import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix, { Notify } from 'notiflix';

refs = {
  input: document.querySelector(`#datetime-picker`),
  btnStart: document.querySelector(`[data-start]`),
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
};

let timerId = null;
const DELAY = 1000;
refs.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();
    let exam = currentDate < selectedDates[0];
    if (exam) {
      refs.btnStart.removeAttribute('disabled');
      refs.btnStart.addEventListener('click', () => {
        timerId = setInterval(() => {
          refs.btnStart.setAttribute('disabled', true);
          refs.btnStart.setAttribute('disabled', true);
          currentDate = new Date();
          let delta = selectedDates[0] - currentDate;
          let values = convertMs(delta);
          addLeadingZero(values);
          if (delta < 1000) {
            clearInterval(timerId);
            Notify.success('Timeout');
          }
        }, DELAY);
      });
    } else {
      refs.btnStart.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
    }
  },
};

function addLeadingZero(values) {
  refs.days.textContent = values.days.toString().padStart(2, '0');
  refs.hours.textContent = values.hours.toString().padStart(2, '0');
  refs.minutes.textContent = values.minutes.toString().padStart(2, '0');
  refs.seconds.textContent = values.seconds.toString().padStart(2, '0');
}

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
