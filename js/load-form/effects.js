import { sliderContainer, effectSlider } from './elements.js';

noUiSlider.create (effectSlider, {
  start: [100],
  range: {min: [0], max: [100]}
});
