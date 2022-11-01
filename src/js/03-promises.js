import Notiflix from 'notiflix';
let refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSub);

function onFormSub(event) {
  event.preventDefault();
  let formDelay = Number(event.currentTarget[0].value);
  let formStep = Number(event.currentTarget[1].value);
  let formAmount = Number(event.currentTarget[2].value);

  for (let i = 0; i <= formAmount - 1; i += 1) {
    createPromise(i + 1, formDelay + formStep * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    console.log(formDelay);
    // formDelay += formStep
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
