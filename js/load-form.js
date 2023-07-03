import { openModal } from './popup.js';
import {loadNewButton, loadNewPopup, imageLoadForm, hashTagInput, commentInput, submitButton } from './load-form-entities.js';
import { formValidator, InputsValid } from './load-form-validation.js';


/**
 * Возвращает состояние формы в исходное при закрытии
 */
const resetForm = () => {
  imageLoadForm.reset();
  formValidator.reset();
  submitButton.disabled = false;
  InputsValid.resetAll();
};

/**
 * Сброс состояния формы при закрытии по нажатию ESC
 * @param {KeyboardEvent} event
 */
function keydownHandler(event) {
  if (event.key === 'Escape') {
    resetForm();
    this.removeEventListener('keydown', keydownHandler);
  }
}

loadNewButton.addEventListener('input', () => {

  openModal(loadNewPopup);

  document.addEventListener('keydown', keydownHandler);

});

commentInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

hashTagInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

loadNewPopup.querySelector('.img-upload__cancel').addEventListener('click', () => {
  resetForm();
  document.removeEventListener('keydown', keydownHandler);
});


