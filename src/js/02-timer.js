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
    console.log(selectedDates[0]);
    let currentDate = new Date();

    let exam = Boolean(currentDate < selectedDates[0]);
    if (exam) {
      refs.btnStart.removeAttribute('disabled');
      refs.btnStart.addEventListener('click', () => {
        refs.btnStart.setAttribute('disabled', true);
        timerId =
          (() => {
            currentDate = new Date();
            let delta = selectedDates[0] - currentDate;
            convertMs(delta);

            // if (!exam) {
            //   clearInterval(timerId);
            //   Notify.success('Timeout');
            // }
          },
          DELAY);
      });
    }
  },
};

flatpickr(`input[type="text"]`, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
