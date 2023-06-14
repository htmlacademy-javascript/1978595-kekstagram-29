const authorNames = [
  'Артем',
  'Сергей',
  'Дмитрий',
  'Антон',
  'Виктор'
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
  'Ну, как-то так.',
  'Не пытайтесь понять смысл этой фотографии, я сам его не понимаю.',
  'Это кошка.',
  'Отпуск в самом разгаре.'
];

/**
 * Функция генерирует случайное число из диапазона от min до max.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

/**
 *Функция генерирует функцию для генерации уникальных случайных чисел из диапазона от min до max
 * @param {number} min
 * @param {number} max
 * @returns {function}
 */
const getUnicRandomId = (min, max) => {
  /**
   * @type {number[]}
   */
  const previousValues = [];
  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 *Функция генерирует случайный уникальный идентификатор для фотографии
 @returns {number}
 */
const getPhotoId = getUnicRandomId(1,25);
/**
 * Функция генерирует случайный уникальный идентификатор для подстановки в путь к фотографии
 * @returns {number}
 */
const getIdForUrl = getUnicRandomId(1,25);
/**
 * Функция генерирует случайный уникальный идентификатор для комментария
 * @returns {number}
 */
const getCommentId = getUnicRandomId(1,10000);

/**
 * Функция генерирует объект, содержащий комментарий к фотографии
 * @returns {Object}
 */
const getComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: messages[getRandomInteger(0, messages.length - 1)],
  name: authorNames[getRandomInteger(0, authorNames.length - 1)]
});

/**
 * Функция генерирует от 1 до 30 случайных комментариев
 * @returns {Array<object>}
 */
const getSomeComments = () => {
  const commentArray = [];
  for (let i = 1; i <= getRandomInteger(1, 30); i++) {
    commentArray.push(getComment());
  }
  return commentArray;
};

/**
 * Функция генерирует набор свойств для фотографии
 * @returns {Object}
 */
const getPhotoAttributes = () => ({
  id: getPhotoId(),
  url: `photos/${getIdForUrl()}.jpg`,
  description: descriptions[getRandomInteger(0, descriptions.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: getSomeComments()
});

/**
 * Функция генерирует массив со свойствами для набора фотографий
 * @returns {Array<object>}
 */
const getPhotoAttributesArray = () => {
  let photoAttributesArray = [];

  photoAttributesArray = Array.from({length:25}, getPhotoAttributes);

  return photoAttributesArray;
};

getPhotoAttributesArray();



