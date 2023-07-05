import { openModal } from './popup.js';

const popup = document.querySelector('.big-picture');
const commentTemplate = popup.querySelector('.social__comment');

/**
 * @type {ReturnType<createCommentsRenderer>}
 */
let renderNextComments;

/**
   * @param {PictureComment} data
   * @returns {HTMLLIElement}
   */
const createComment = (data) => {
  const {avatar, name, message} = data;

  const comment = /**@type {HTMLLIElement} */ (commentTemplate.cloneNode(true));

  comment.querySelector('.social__picture').setAttribute('src',avatar);
  comment.querySelector('.social__picture').setAttribute('alt',name);
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

/**
 *
 * @param {MouseEvent & {target: Element}} event
 */
const popupClickHandler = (event) => {
  if (event.target.closest('.social__comments-loader')) {
    renderNextComments();
  }
};

/**
 * @param {Array<PictureComment>} data
 * @param {number} step
 * @return {() => void}
 */
const createCommentsRenderer = (data, step = 5) => {
  const discussion = popup.querySelector('.social__comments');
  const loadMoreButton = popup.querySelector('.social__comments-loader');
  const [commentCount, commentTotal] = popup.querySelectorAll('.comments-count');

  data = structuredClone(data);
  discussion.replaceChildren();
  commentTotal.textContent = String(data.length);

  return () => {
    discussion.append(...data.splice(0, step).map(createComment));
    commentCount.textContent = String(discussion.childElementCount);
    loadMoreButton.classList.toggle('hidden', data.length === 0);
  };
};

/**
 * Обновляет содержимое окна картинки
 * @param {Picture} picture - объект со свойствами картинки
 */
const renderPopup = (picture) => {
  const {url, description, likes, comments} = picture;

  popup.querySelector('.big-picture__img img').setAttribute('src', url);
  popup.querySelector('.social__caption').textContent = description;
  popup.querySelector('.likes-count').textContent = String(likes);

  renderNextComments = createCommentsRenderer(comments);
  renderNextComments();
  popup.addEventListener('click', popupClickHandler);

  openModal(popup);

};

export {renderPopup};
