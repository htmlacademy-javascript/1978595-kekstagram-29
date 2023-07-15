import { closeModal, openModal } from '../modal.js';
import { formValidator } from './validation.js';
import { resetScale } from './scaling.js';
import { resetEffect } from './effects-set.js';
import { request } from '../utils/data-requesting.js';
import { showMessage } from '../message-modal.js';

const uploadNewButton = /**@type {HTMLInputElement} */(document.querySelector('.img-upload__input'));

const uploadNewModal = document.querySelector('.img-upload__overlay');

const imageUploadForm = /** @type {HTMLFormElement} */(document.querySelector('.img-upload__form'));

const /**@type {HTMLButtonElement} */submit = imageUploadForm.querySelector('.img-upload__submit');

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

const sendFormData = async () => {
  const url = imageUploadForm.getAttribute('action');
  const method = imageUploadForm.getAttribute('method');
  const body = new FormData(imageUploadForm);

  await request(url, {method, body});
};

const formSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    submit.disabled = true;
    await sendFormData();
    submit.disabled = false;
    showMessage('success', 'Изображение успешно загружено');
    imageUploadForm.reset();
    closeModal(uploadNewModal);
  } catch {
    showMessage('error', 'Ошибка загрузки файла');
  } finally {
    submit.disabled = false;
  }
};

imageUploadForm.addEventListener('submit', formSubmitHandler);
