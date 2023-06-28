/**
 * Обновляет содержимое окна картинки
 * @param {Picture} picture - объект со свойствами картинки
 */
const updateInfo = (picture) => {

  const {url, description, likes, comments} = picture;

  const pictureWindow = document.querySelector('.big-picture');

  pictureWindow.querySelector('.big-picture__img img').setAttribute('src', url);
  pictureWindow.querySelector('.social__caption').textContent = description;
  pictureWindow.querySelector('.likes-count').textContent = String(likes);
  pictureWindow.querySelector('.comments-count').textContent = String(comments.length);

  const commentBlock = pictureWindow.querySelector('.social__comments');
  const commentBlockItem = commentBlock.querySelector('.social__comment');

  const commentMarkup = comments.map((comment)=> {

    const {avatar, name, message} = comment;

    const newComment = /**@type {HTMLElement} */ (commentBlockItem.cloneNode(true));

    newComment.querySelector('.social__picture').setAttribute('src',avatar);
    newComment.querySelector('.social__picture').setAttribute('alt',name);
    newComment.querySelector('.social__text').textContent = message;

    return newComment;
  });

  pictureWindow.querySelector('.social__comments').replaceChildren();

  commentBlock.append(...commentMarkup);

};

export {updateInfo};
