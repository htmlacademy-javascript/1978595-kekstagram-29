import { openModal } from './popup.js';

const HASHTAG_ERROR_TEXT = 'Некорректный набор хештегов!';
const COMMENT_ERROR_TEXT = 'Слишком длинный комментарий!';

const loadNewButton = document.querySelector('.img-upload__input');
const loadForm = document.querySelector('.img-upload__overlay');
const imageLoadForm = document.querySelector('.img-upload__form');

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

const hashTagValidate = () => {
  const hashTagArray = hashTagInput.value.trim().toLowerCase().split(' ').filter((element) => element.trim().length !== 0);

  console.log(hashTagArray);

  if (hashTagArray.length > 5) {
    return false;
  }

  if (hashTagArray.some((element) => !hashTagPattern.test(element))) {
    return false;
  }

  if (hashTagArray.some((element) => hashTagArray.indexOf(element) !== hashTagArray.lastIndexOf(element))) {
    return false;
  }

  return true;
};

const commentValidate = () => commentInput.value.length <= 3;

formValidator.addValidator(hashTagInput, hashTagValidate, HASHTAG_ERROR_TEXT);
formValidator.addValidator(commentInput, commentValidate, COMMENT_ERROR_TEXT);


loadNewButton.addEventListener('input', () => {
  openModal(loadForm);
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
