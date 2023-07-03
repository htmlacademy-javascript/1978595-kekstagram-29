import { openModal } from './popup.js';

const HASHTAG_ERROR_TEXT = 'Некорректный набор хештегов!';
const COMMENT_ERROR_TEXT = 'Слишком длинный комментарий!';

const loadNewButton = document.querySelector('.img-upload__input');
const loadNewPopup = document.querySelector('.img-upload__overlay');
const imageLoadForm = /** @type {HTMLFormElement} */(document.querySelector('.img-upload__form'));

const hashTagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div'
};

const formValidator = new Pristine(imageLoadForm, pristineConfig);

const hashTagInput = /** @type {HTMLInputElement} */(imageLoadForm.querySelector('.text__hashtags'));
const commentInput = /** @type {HTMLTextAreaElement} */(imageLoadForm.querySelector('.text__description'));
const submitButton = /** @type {HTMLButtonElement} */(loadNewPopup.querySelector('.img-upload__submit'));

/**
 * Валидация полей ввода хеш-тегов и комментария
 * @returns {boolean}
 */
const hashTagValidate = () => {
  const hashTagArray = hashTagInput.value.trim().toLowerCase().split(' ').filter((element) => element.trim().length !== 0);

  console.log(hashTagArray);

  if (hashTagArray.length > 5) {
    submitButton.disabled = true;
    return false;
  }

  if (hashTagArray.some((element) => !hashTagPattern.test(element))) {
    submitButton.disabled = true;
    return false;
  }

  if (hashTagArray.some((element) => hashTagArray.indexOf(element) !== hashTagArray.lastIndexOf(element))) {
    submitButton.disabled = true;
    return false;
  }

  submitButton.disabled = false;

  return true;
};

const commentValidate = () => {
  if (commentInput.value.length >= 3) {
    submitButton.disabled = true;
    return false;
  }
  submitButton.disabled = false;
  return true;
};

formValidator.addValidator(hashTagInput, hashTagValidate, HASHTAG_ERROR_TEXT);
formValidator.addValidator(commentInput, commentValidate, COMMENT_ERROR_TEXT);

/**
 * Сбрасывает состояние формы
 */
const resetForm = () => {
  imageLoadForm.reset();
  formValidator.reset();
  submitButton.disabled = false;
};

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
