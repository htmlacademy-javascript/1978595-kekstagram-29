const START_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

/**
 * Форма загрузки нового изображения
 * @type {HTMLFormElement}
 */
const imageUploadForm = document.querySelector('.img-upload__form');

const pictureImage = /** @type {HTMLImageElement} */(imageUploadForm.querySelector('.img-upload__preview img'));

const scaleInput = /** @type {HTMLInputElement} */(imageUploadForm.querySelector('.scale__control--value'));

const scaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');

const scaleBigger = imageUploadForm.querySelector('.scale__control--bigger');

let currentScale = Number.parseFloat(scaleInput.getAttribute('value'));

const setScale = (scale) => {
  scaleInput.value = `${scale}%`;
  pictureImage.style.transform = `scale(${scale / 100})`;
};

/**
 * Обработчик клика по кнопке увеличения масштаба
 */
const scaleBiggerHandler = () => {
  if (currentScale !== MAX_SCALE) {
    currentScale += SCALE_STEP;
    setScale(currentScale);
  }
};

/**
 * Обработчик клика по кнопке уменьшения масштаба
 */
const scaleSmallerHandler = () => {
  if (currentScale !== MIN_SCALE) {
    currentScale -= SCALE_STEP;
    setScale(currentScale);
  }
};

/**
 * Возвращает значение масштаба к 100%
 */
const resetScale = () => {
  currentScale = START_SCALE;
  setScale(currentScale);
};


scaleBigger.addEventListener('click', scaleBiggerHandler);
scaleSmaller.addEventListener('click', scaleSmallerHandler);

export {resetScale};

