import { sliderContainer, effectSlider, effectFieldSet, pictureImage, effectInput } from './elements.js';
import { Effects } from './effects.js';

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
  effectSlider.noUiSlider.updateOptions({
    start: Effects[effect].max,
    range: {min: Effects[effect].min, max:Effects[effect].max},
    step: Effects[effect].step
  });
  pictureImage.style.filter = `${Effects[effect].style}(${Effects[effect].max}${Effects[effect].unit})`;
  effectInput.value = effectSlider.noUiSlider.get();
};

const changeEffectLevel = (effect) => {
  const level = effectSlider.noUiSlider.get();
  pictureImage.style.filter = `${Effects[effect].style}(${level}${Effects[effect].unit})`;
  effectInput.value = `${level}`;
  console.log(level, pictureImage.style.filter, effectInput.value);
};

resetEffect();

effectSlider.noUiSlider.on('update',() => changeEffectLevel(currentEffect));

effectFieldSet.addEventListener('change', (event) => {

  currentEffect = /** @type {HTMLInputElement}*/ (/** @type {Element}*/(event.target).closest('.effects__radio')).value;

  switch (currentEffect) {

    case 'none': resetEffect(); break;

    default: setEffect(currentEffect);

  }

});

export {resetEffect};
