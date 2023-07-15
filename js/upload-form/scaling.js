const imageUploadForm = /** @type {HTMLFormElement} */(document.querySelector('.img-upload__form'));

const pictureImage = /** @type {HTMLImageElement} */(imageUploadForm.querySelector('.img-upload__preview img'));

const scaleInput = /** @type {HTMLInputElement} */(imageUploadForm.querySelector('.scale__control--value'));

const scaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');

const scaleBigger = imageUploadForm.querySelector('.scale__control--bigger');

const START_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

let currentScale = Number.parseFloat(scaleInput.getAttribute('value'));

const scaleBiggerHandler = () => {
  if (currentScale !== MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleInput.value = `${currentScale}%`;
    pictureImage.style.transform = `scale(${currentScale / 100})`;
  }
};

const scaleSmallerHandler = () => {
  if (currentScale !== MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleInput.value = `${currentScale}%`;
    pictureImage.style.transform = `scale(${currentScale / 100})`;
  }
};

const resetScale = () => {
  currentScale = START_SCALE;
  scaleInput.value = `${currentScale}%`;
  pictureImage.style.transform = `scale(${currentScale / 100})`;
};


scaleBigger.addEventListener('click', scaleBiggerHandler);
scaleSmaller.addEventListener('click', scaleSmallerHandler);

export {resetScale};
