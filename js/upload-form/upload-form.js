import { openModal } from '../modal.js';
import { formValidator } from './validation.js';
import { resetScale } from './scaling.js';
import { resetEffect } from './effects-set.js';

const uploadNewButton = /**@type {HTMLInputElement} */(document.querySelector('.img-upload__input'));

const uploadNewModal = document.querySelector('.img-upload__overlay');

const imageUploadForm = /** @type {HTMLFormElement} */(document.querySelector('.img-upload__form'));

uploadNewButton.addEventListener('change', () => {

  openModal(uploadNewModal);

});

imageUploadForm.addEventListener('reset', () => {
  resetScale();
  formValidator.reset();
  resetEffect();
});

imageUploadForm.addEventListener('modal::hide', () => {
  imageUploadForm.reset();
}, true);

