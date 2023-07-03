import { openModal } from './popup.js';

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

const InputsValid = {
  hashTagInput : true,
  commentInput : true,
  resetAll : function() {
    this.hashTagInput = true;
    this.commentInput = true;
  },
  isAllValid : function() {
    return (this.hashTagInput && this.commentInput);
  }
};

/**
 * Формирует массив хеш-тегов
 * @returns {Array<string>}
 */
const makeHashTagArray = () => hashTagInput.value.trim().toLowerCase().split(' ').filter((element) => element.trim().length !== 0);

/**
 * Валидация поля ввода хеш-тегов на превышение количества тегов
 * @returns {boolean}
 */
const hashTagCountValidate = () => {

  const hashTagArray = makeHashTagArray();

  if (hashTagArray.length > 5) {

    submitButton.disabled = true;
    InputsValid.hashTagInput = false;
    return false;
  }

  InputsValid.hashTagInput = true;

  if (InputsValid.isAllValid()) {
    submitButton.disabled = false;
  }

  return true;
};

/**
 * Валидация поля ввода хеш-тегов на превышение количества тегов
 * @returns {boolean}
 */
const hashTagPatternValidate = () => {

  const hashTagArray = makeHashTagArray();

  if (hashTagArray.some((element) => !hashTagPattern.test(element))) {

    submitButton.disabled = true;
    InputsValid.hashTagInput = false;
    return false;
  }

  InputsValid.hashTagInput = true;

  if (InputsValid.isAllValid()) {
    submitButton.disabled = false;
  }

  return true;
};

/**
 * Валидация поля ввода хеш-тегов на превышение количества тегов
 * @returns {boolean}
 */
const hashTagRepeatingValidate = () => {

  const hashTagArray = makeHashTagArray();

  if (hashTagArray.some((element) => hashTagArray.indexOf(element) !== hashTagArray.lastIndexOf(element))) {

    submitButton.disabled = true;
    InputsValid.hashTagInput = false;
    return false;
  }

  InputsValid.hashTagInput = true;

  if (InputsValid.isAllValid()) {
    submitButton.disabled = false;
  }

  return true;
};

/**
 * Валидация поля ввода комментария
 * @returns {boolean}
 */
function commentValidate() {
  if (commentInput.value.length >= 3) {

    submitButton.disabled = true;
    InputsValid.commentInput = false;
    return false;
  }

  InputsValid.commentInput = true;

  if (InputsValid.isAllValid()) {
    submitButton.disabled = false;
  }

  return true;

}

formValidator.addValidator(hashTagInput, hashTagCountValidate, 'Превышено число хеш-тегов', 1, true);
formValidator.addValidator(hashTagInput, hashTagPatternValidate, 'Один из хеш-тегов некорректный', 1, true);
formValidator.addValidator(hashTagInput, hashTagRepeatingValidate, 'Найдены повторяющиеся хеш-теги', 1, true);
formValidator.addValidator(commentInput, commentValidate, 'Слишком длинный комментарий!', 1, true);

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
