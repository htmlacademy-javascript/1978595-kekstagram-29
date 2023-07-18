import { Effects } from './effects.js';

/**
 * Форма загрузки нового изображения
 * @type {HTMLFormElement}
 */
const imageUploadForm = document.querySelector('.img-upload__form');

const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');

const effectSlider = imageUploadForm.querySelector('.effect-level__slider');

/** @type {HTMLFieldSetElement}*/
const effectFieldSet = imageUploadForm.querySelector('.effects');

/** @type {HTMLImageElement} */
const pictureImage = imageUploadForm.querySelector('.img-upload__preview img');

/** @type {HTMLInputElement} */
const effectInput = imageUploadForm.querySelector('.effect-level__value');


noUiSlider.create (effectSlider, {
  start: [100],
  range: {min: [0], max: [0]},
  step: 0,
  connect: 'lower'
});

/**@type {EffectType} */
let currentEffect = 'none';

/**
 * Возвращает слайдер к 100%
 */
const resetEffect = () => {
  sliderContainer.classList.add('hidden');
  pictureImage.style.filter = 'none';
};

/**
 * Переключает эффект на выбранный
 * @param {EffectType} effect
 */
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

/**
 * Меняет уровень эффекта при перемешении слайдера
 */
const changeEffectLevel = () => {
  const level = effectSlider.noUiSlider.get(true);
  effectInput.value = level;
  pictureImage.style.filter = effectSlider.noUiSlider.get();
};

resetEffect();

effectSlider.noUiSlider.on('update', () => changeEffectLevel());

effectFieldSet.addEventListener('change', (event) => {

  currentEffect = /**@type {EffectType} */(/** @type {HTMLInputElement} */(event.target).value);

  if (currentEffect === 'none') {
    resetEffect();
  } else {
    setEffect(currentEffect);
  }

});

export {resetEffect};
