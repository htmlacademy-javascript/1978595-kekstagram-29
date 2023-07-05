import {imageLoadForm, hashTagInput, commentInput, submitButton } from './elements.js';
import { segmentWords } from '../utils/string-parsing.js';

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


imageLoadForm.addEventListener('input', () => {

  submitButton.toggleAttribute('disabled', !formValidator.validate());

});


/**
 * Валидация поля ввода хеш-тегов на превышение количества тегов
 * @returns {boolean}
 */
const hashTagCountValidate = () => segmentWords(hashTagInput.value).length <= 5;

/**
 * Валидация поля ввода хеш-тегов на соответствие шаблону
 * @returns {boolean}
 */
const hashTagPatternValidate = () => segmentWords(hashTagInput.value).every((element) => hashTagPattern.test(element));


/**
 * Валидация поля ввода хеш-тегов на повторы
 * @returns {boolean}
 */
const hashTagRepeatingValidate = () => segmentWords(hashTagInput.value).every((element) => segmentWords(hashTagInput.value).indexOf(element) === segmentWords(hashTagInput.value).lastIndexOf(element));

/**
 * Валидация поля ввода комментария
 * @returns {boolean}
 */
const commentValidate = () => commentInput.value.length <= 3;

formValidator.addValidator(hashTagInput, hashTagCountValidate, 'Превышено число хеш-тегов', 1, true);
formValidator.addValidator(hashTagInput, hashTagPatternValidate, 'Один из хеш-тегов некорректный', 1, true);
formValidator.addValidator(hashTagInput, hashTagRepeatingValidate, 'Найдены повторяющиеся хеш-теги', 1, true);
formValidator.addValidator(commentInput, commentValidate, 'Слишком длинный комментарий!', 1, true);

imageLoadForm.addEventListener('reset', () => {

  formValidator.reset();

});


export {formValidator};
