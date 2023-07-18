import { openModal } from './modal.js';

const modal = document.querySelector('.big-picture');
const commentTemplate = modal.querySelector('.social__comment');

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
const modalClickHandler = (event) => {
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
  const discussion = modal.querySelector('.social__comments');
  const loadMoreButton = modal.querySelector('.social__comments-loader');
  const [commentCount, commentTotal] = [modal.querySelector('.comments-shown-count'), modal.querySelector('.comments-count')];

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
const renderModal = (picture) => {
  const {url, description, likes, comments} = picture;

  modal.querySelector('.big-picture__img img').setAttribute('src', url);
  modal.querySelector('.social__caption').textContent = description;
  modal.querySelector('.likes-count').textContent = String(likes);

  renderNextComments = createCommentsRenderer(comments);
  renderNextComments();
  modal.addEventListener('click', modalClickHandler);

  openModal(modal);

};

export {renderModal};
