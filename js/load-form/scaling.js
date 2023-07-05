import {pictureImage, scaleInput, scaleSmaller, scaleBigger} from './elements.js';
import { parseDigits } from '../functions.js';

const START_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

let currentScale = parseDigits(scaleInput.getAttribute('value'));

const scaleBiggerHandler = () => {
  if (currentScale !== MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleInput.setAttribute('value', `${currentScale}%`);
    pictureImage.style.transform = `scale(${currentScale / 100})`;
  }
};

const scaleSmallerHandler = () => {
  if (currentScale !== MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleInput.setAttribute('value', `${currentScale}%`);
    pictureImage.style.transform = `scale(${currentScale / 100})`;
  }
};

const resetScale = () => {
  currentScale = START_SCALE;
  scaleInput.setAttribute('value', `${currentScale}%`);
  pictureImage.style.transform = `scale(${currentScale / 100})`;
};


scaleBigger.addEventListener('click', scaleBiggerHandler);
scaleSmaller.addEventListener('click', scaleSmallerHandler);

export {resetScale};
