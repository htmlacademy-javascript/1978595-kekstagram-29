//git-ignored
import { getRandomInteger, getUnicRandomNumber } from './utils/random-numbers-generation.js';

const PICTURE_COUNT = 25;
const COMMENT_COUNT_MIN = 0;
const COMMENT_COUNT_MAX = 30;
const AVATAR_COUNT_MAX = 6;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;


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
 * Генерирует случайный уникальный идентификатор для фотографии
 */
const getPhotoId = getUnicRandomNumber(1,PICTURE_COUNT);
/**
 * Генерирует случайный уникальный идентификатор для подстановки в путь к фотографии
 */
const getIdForUrl = getUnicRandomNumber(1,PICTURE_COUNT);
/**
 * Генерирует случайный уникальный идентификатор для комментария
 */
const getCommentId = getUnicRandomNumber(1,10000);

/**
 * Генерирует объект, содержащий комментарий к фотографии
 * @returns {PictureComment}
 */
const getComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,AVATAR_COUNT_MAX)}.svg`,
  message: messages[getRandomInteger(0, messages.length - 1)],
  name: authorNames[getRandomInteger(0, authorNames.length - 1)]
});

/**
 * Генерирует от 1 до 30 случайных комментариев
 * @returns {Array<PictureComment>}
 */
const getSomeComments = () => {
  let commentArray = [];
  commentArray = Array.from({length: getRandomInteger(COMMENT_COUNT_MIN,COMMENT_COUNT_MAX)}, getComment);
  return commentArray;
};

/**
 * Генерирует набор свойств для фотографии
 * @returns {Picture}
 */
const getPhotoAttributes = () => ({
  id: getPhotoId(),
  url: `photos/${getIdForUrl()}.jpg`,
  description: descriptions[getRandomInteger(0, descriptions.length - 1)],
  likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
  comments: getSomeComments()
});

/**
 * Генерирует массив со свойствами для набора фотографий
 * @returns {Array<Picture>}
 */
const getPhotoAttributesArray = (length = PICTURE_COUNT) => {
  let photoAttributesArray = [];

  photoAttributesArray = Array.from({length}, getPhotoAttributes);

  return photoAttributesArray;
};

export {getPhotoAttributesArray};
