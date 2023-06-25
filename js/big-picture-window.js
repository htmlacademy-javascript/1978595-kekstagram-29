import { pictureData } from './main.js';
import { makeHiddenModal, makeVisibleModal } from './utils/window-showing.js';


const pictureContainer = document.querySelector('.pictures');

const pictureWindow = document.querySelector('.big-picture');

/**
 * Обработчик нажатия кдавиши Esc
 * @param {KeyboardEvent} evt
 */
const escKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    pictureWindow.querySelector('.big-picture__cancel').removeEventListener('click', closePictureWindowHandler);
    document.removeEventListener('keydown', escKeydownHandler);
    makeHiddenModal(pictureWindow);
  }
};

/**
 * Обработчик клика по кнопке закрытия окна
 */
function closePictureWindowHandler() {
  pictureWindow.querySelector('.big-picture__cancel').removeEventListener('click', closePictureWindowHandler);
  document.removeEventListener('keydown', escKeydownHandler);
  makeHiddenModal(pictureWindow);
}


/**
 * Обновляет содержимое окна картинки
 * @param {number} neededId - идентификатор открываумой картинки
 */
const updateInfo = (neededId) => {
  const currentPicture = pictureData.find((element) => element.id === neededId);

  const {url, description, likes, comments} = currentPicture;

  pictureWindow.querySelector('.big-picture__img img').setAttribute('src', url);
  pictureWindow.querySelector('.social__caption').textContent = description;
  pictureWindow.querySelector('.likes-count').textContent = String(likes);
  pictureWindow.querySelector('.comments-count').textContent = String(comments.length);

  const commentBlock = pictureWindow.querySelector('.social__comments');
  const commentBlockItem = commentBlock.querySelector('.social__comment');

  pictureWindow.querySelector('.social__comments').replaceChildren();

  for (const comment of comments) {

    const {avatar, name, message} = comment;

    const newComment = /** @type {HTMLUListElement} */(commentBlockItem.cloneNode(true));

    newComment.querySelector('.social__picture').setAttribute('src',avatar);
    newComment.querySelector('.social__picture').setAttribute('alt',name);
    newComment.querySelector('.social__text').textContent = message;

    commentBlock.appendChild(newComment);
  }
};

/**
 * Обработчик клика по миниатюре
 * @param {PointerEvent} evt
 */
const thumbnailsClickHandler = (evt) => {
  if (/** @type {HTMLImageElement} */(evt.target).nodeName === 'IMG') {
    makeVisibleModal(pictureWindow);
    pictureWindow.querySelector('.big-picture__cancel').addEventListener('click', closePictureWindowHandler);
    const pictureId = Number(/** @type {HTMLImageElement} */(evt.target).getAttribute('id'));
    updateInfo(pictureId);
    document.addEventListener('keydown',escKeydownHandler);
  }
};

/**
 * Добавляет обработчики событий для миниатюр
 */
const addThumbnailsEventListeners = () => {
  pictureContainer.addEventListener('click', thumbnailsClickHandler);
};


export {addThumbnailsEventListeners};
