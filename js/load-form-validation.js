import {imageLoadForm, hashTagInput, commentInput, submitButton } from './load-form-entities.js';

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

/**
 * Объект содержит состояния валидности полей ввода формы, методы сброса в исходное состояние и проверки на валидность всех полей.
 */
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
const commentValidate = () =>{
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

};

formValidator.addValidator(hashTagInput, hashTagCountValidate, 'Превышено число хеш-тегов', 1, true);
formValidator.addValidator(hashTagInput, hashTagPatternValidate, 'Один из хеш-тегов некорректный', 1, true);
formValidator.addValidator(hashTagInput, hashTagRepeatingValidate, 'Найдены повторяющиеся хеш-теги', 1, true);
formValidator.addValidator(commentInput, commentValidate, 'Слишком длинный комментарий!', 1, true);

export {formValidator, InputsValid};
