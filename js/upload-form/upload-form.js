import { closeModal, openModal } from '../modal.js';
import { formValidator } from './validation.js';
import { resetScale } from './scaling.js';
import { resetEffect } from './effects-set.js';
import { request } from '../utils/data-requesting.js';
import { showMessage } from '../message-modal.js';

/**
 * Кнопка загрузки нового изображения
 * @type {HTMLInputElement}
 */
const uploadNewButton = document.querySelector('.img-upload__input');

const FILE_TYPES = uploadNewButton.getAttribute('accept').split(', ');

const uploadNewModal = document.querySelector('.img-upload__overlay');

/**
 * Загружаемое на сервер изображение
 * @type {HTMLImageElement}
 */
const uploadPreview = uploadNewModal.querySelector('.img-upload__preview img');

const imageUploadForm = /** @type {HTMLFormElement} */(document.querySelector('.img-upload__form'));

const /**@type {HTMLButtonElement} */submitButton = imageUploadForm.querySelector('.img-upload__submit');

uploadNewButton.addEventListener('change', () => {

  const file = uploadNewButton.files[0];

  if (!(FILE_TYPES.some((ext) => file.name.endsWith(ext)))) {

    showMessage('error', 'Неподдерживаемый тип файла');

  } else {

    uploadPreview.src = URL.createObjectURL(file);
    openModal(uploadNewModal);
  }

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
    submitButton.disabled = true;
    await sendFormData();
    showMessage('success', 'Изображение успешно загружено');
    imageUploadForm.reset();
    closeModal(uploadNewModal);
  } catch {
    showMessage('error', 'Ошибка загрузки файла');
  } finally {
    submitButton.disabled = false;
  }
};

imageUploadForm.addEventListener('submit', formSubmitHandler);
