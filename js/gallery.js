import { renderPopup } from './gallery-popup.js';

const pictureContainer = document.querySelector('.pictures');
/**
 * @type {HTMLTemplateElement}
 */
const pictureTemplate = document.querySelector('#picture');

/**
 * Отрисовывает миниатюры
 * @param {Array<Picture>} data - массив с данными для картинок
 */
const renderThumbnails = (data) => {
  const fragment = document.createDocumentFragment();

  for (const picture of data) {

    const newPicture = /** @type {HTMLAnchorElement} */ (
      pictureTemplate.content.cloneNode(true)
    );
    const {url, description, comments, likes, id} = picture;

    newPicture.querySelector('.picture__img').setAttribute('src',url);
    newPicture.querySelector('.picture__img').setAttribute('alt',description);
    newPicture.querySelector('.picture__comments').textContent = String(comments.length);
    newPicture.querySelector('.picture__likes').textContent = String(likes);
    newPicture.querySelector('.picture__img').setAttribute('id', String(id));

    newPicture.querySelector('.picture').addEventListener('click', (event) => {
      event.preventDefault();
      renderPopup(picture);
    });


    fragment.appendChild(newPicture);
  }
  pictureContainer.appendChild(fragment);

};

export {renderThumbnails};
