import { closeModal, openModal } from '../modal.js';
import { formValidator } from './validation.js';
import { resetScale } from './scaling.js';
import { resetEffect } from './effects-set.js';
import { request } from '../utils.js';
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

const effectPreviews = /** @type {NodeListOf<HTMLSpanElement>} */(imageUploadForm.querySelectorAll('.effects__preview'));

const /**@type {HTMLButtonElement} */submitButton = imageUploadForm.querySelector('.img-upload__submit');

uploadNewButton.addEventListener('change', () => {

  const file = uploadNewButton.files[0];

  if (!(FILE_TYPES.some((ext) => file.name.endsWith(ext)))) {

    showMessage('error', 'Неподдерживаемый тип файла', 'Закрыть');
    imageUploadForm.reset();

  } else {

    const fileURL = URL.createObjectURL(file);
    uploadPreview.src = fileURL;
    effectPreviews.forEach((el) => {
      el.style.setProperty('background-image', `url(${fileURL})`);
    });
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

/**
 * Отправляет данные на сервер
 */
const sendFormData = async () => {
  const url = imageUploadForm.getAttribute('action');
  const method = imageUploadForm.getAttribute('method');
  const body = new FormData(imageUploadForm);

  await request(url, {method, body});
};

/**
 * Обработчик клика по кнопке загрузки нового изображения на сервер
 * @param {SubmitEvent} event
 * @returns {Promise}
 */
const formSubmitHandler = async (event) => {
  event.preventDefault();
  if (!formValidator.validate()) {
    return;
  }
  try {
    submitButton.disabled = true;
    await sendFormData();
    showMessage('success', 'Изображение успешно загружено', 'OK');
    imageUploadForm.reset();
    closeModal(uploadNewModal);
  } catch {
    showMessage('error', 'Ошибка загрузки файла', 'Попробовать еще раз');
  } finally {
    submitButton.disabled = false;
  }
};

imageUploadForm.addEventListener('submit', formSubmitHandler);
