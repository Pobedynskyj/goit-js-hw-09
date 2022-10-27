let getEl = selector => document.querySelector(selector);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = getEl('[data-start]');
const btnStop = getEl('[data-stop]');
const body = document.body;

btnStart.addEventListener('click', clickStart);
btnStop.addEventListener('click', clickStop);

btnStop.setAttribute('disabled', true);
let interval = null;
const DELAY = 1000;

function clickStart() {
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
}

function clickStop() {
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
  clearInterval(interval);
}
