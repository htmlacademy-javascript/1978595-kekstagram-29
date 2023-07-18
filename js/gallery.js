import { renderModal } from './gallery-modal.js';
import { debounce } from './utils.js';

/**
 * Задержка отрисовки
 */
const RERENDER_DELAY = 500;


const pictureContainer = document.querySelector('.pictures');
/**
 * @type {HTMLTemplateElement}
 */
const pictureTemplate = document.querySelector('#picture');

/**
 * Создает разметку для одной миниатюры
 * @param {Picture} picture - данные одной картинки
 * @returns HTMLAnchorElement - разметка одной миниатюры
 */
const createThumbnail = (picture) => {
  const newPicture = /** @type {HTMLAnchorElement} */ (
    pictureTemplate.content.cloneNode(true)
  );
  const {url, description, comments, likes} = picture;

  newPicture.querySelector('.picture__img').setAttribute('src',url);
  newPicture.querySelector('.picture__img').setAttribute('alt',description);
  newPicture.querySelector('.picture__comments').textContent = String(comments.length);
  newPicture.querySelector('.picture__likes').textContent = String(likes);

  newPicture.querySelector('.picture').addEventListener('click', (event) => {
    event.preventDefault();
    renderModal(picture);
  });

  return newPicture;
};

/**
 * Отрисовывает миниатюры
 * @param {Array<Picture>} data  - массив с данными для картинок
 */
const renderGallery = (data) => {
  const newThumbnails = data.map(createThumbnail);
  pictureContainer.append(...newThumbnails);
};

const clearGallery = () => {

  pictureContainer.querySelectorAll('.picture').forEach((element) => element.remove());

};

/**
 * Перерисовывает галерею
 * @param {Array<Picture>} newData
 */
const rerenderGallery = (newData) => {
  clearGallery();
  renderGallery(newData);
};

/**
 * Перерисовывает галерею с задержкой после последнего клика
 */
const debouncedRerenderGallery = debounce(rerenderGallery, RERENDER_DELAY);


export {renderGallery, clearGallery, rerenderGallery, debouncedRerenderGallery};
