import { Effects } from './effects.js';

const imageUploadForm = /** @type {HTMLFormElement} */(document.querySelector('.img-upload__form'));

const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');

const effectSlider = imageUploadForm.querySelector('.effect-level__slider');

const effectFieldSet = /** @type {HTMLFieldSetElement}*/(imageUploadForm.querySelector('.effects'));

const pictureImage = /** @type {HTMLImageElement} */(imageUploadForm.querySelector('.img-upload__preview img'));

const effectInput = /** @type {HTMLInputElement} */(imageUploadForm.querySelector('.effect-level__value'));

//@ts-ignore
noUiSlider.create (effectSlider, {
  start: [100],
  range: {min: [0], max: [0]},
  step: 0,
  connect: 'lower'
});

let currentEffect = 'none';

const resetEffect = () => {
  sliderContainer.classList.add('hidden');
  pictureImage.style.filter = 'none';
};

const setEffect = (effect) => {
  sliderContainer.classList.remove('hidden');
  const {max, min, step, unit, style} = Effects[effect];

  effectSlider.noUiSlider.updateOptions({
    start: max,
    range: {min: min, max:max},
    step: step,
    format: {
      to: (value) => `${style}(${value}${unit})`,
      from: (value) => Number.parseFloat(value)
    }
  });
  pictureImage.style.filter = effectSlider.noUiSlider.get();
  effectInput.value = effectSlider.noUiSlider.get(true);
};

const changeEffectLevel = () => {
  const level = effectSlider.noUiSlider.get(true);
  effectInput.value = level;
  pictureImage.style.filter = effectSlider.noUiSlider.get();
};

resetEffect();

effectSlider.noUiSlider.on('update', () => changeEffectLevel());

effectFieldSet.addEventListener('change', (event) => {

  currentEffect = /** @type {HTMLInputElement}*/(event.target).value;

  if (currentEffect === 'none') {
    resetEffect();
  } else {
    setEffect(currentEffect);
  }

});

export {resetEffect};
