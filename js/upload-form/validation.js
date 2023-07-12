import { segmentWords } from '../utils/string-parsing.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

/**
 * Форма загрузки нового изображения
 */
const imageUploadForm = /** @type {HTMLFormElement} */(document.querySelector('.img-upload__form'));

/**Поле ввода хеш-тегов */
const hashTagInput = /** @type {HTMLInputElement} */(imageUploadForm.querySelector('.text__hashtags'));

/**
 * Поле ввода комментариев
 */
const commentInput = /** @type {HTMLTextAreaElement} */(imageUploadForm.querySelector('.text__description'));

/**
 * Кнопка отправки
 */
const submitButton = /** @type {HTMLButtonElement} */(imageUploadForm.querySelector('.img-upload__submit'));

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div'
};

//@ts-ignore
const formValidator = new Pristine(imageUploadForm, pristineConfig);

/**Шаблон для проверки хеш-тега на недопустимые сомволы */
const hashTagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

/**
 * Валидация поля ввода хеш-тегов на превышение количества тегов
 * @returns {boolean}
 */
const validateCount = () => segmentWords(hashTagInput.value).length <= MAX_HASHTAG_COUNT;

/**
 * Валидация поля ввода хеш-тегов на соответствие шаблону
 * @returns {boolean}
 */
const validatePattern = () => segmentWords(hashTagInput.value).every((element) => hashTagPattern.test(element));


/**
 * Валидация поля ввода хеш-тегов на повторы
 * @returns {boolean}
 */
const validateRepeating = () => {
  const hashTagArray = segmentWords(hashTagInput.value);
  return hashTagArray.every((element) => hashTagArray.indexOf(element) === hashTagArray.lastIndexOf(element));
};

/**
 * Валидация поля ввода комментария
 * @returns {boolean}
 */
const validateComment = () => commentInput.value.length <= MAX_COMMENT_LENGTH;


imageUploadForm.addEventListener('input', () => {

  submitButton.toggleAttribute('disabled', !formValidator.validate());

});

formValidator.addValidator(hashTagInput, validateCount, 'Превышено число хеш-тегов', 1, true);
formValidator.addValidator(hashTagInput, validatePattern, 'Один из хеш-тегов некорректный', 1, true);
formValidator.addValidator(hashTagInput, validateRepeating, 'Найдены повторяющиеся хеш-теги', 1, true);
formValidator.addValidator(commentInput, validateComment, 'Слишком длинный комментарий!', 1, true);

imageUploadForm.addEventListener('reset', () => {

  formValidator.reset();

});


export {formValidator};
