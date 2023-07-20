/**
 * Обработчик клика по кнопке окна Сообщения или за пределами окна
 * @param {MouseEvent & {target: Element, currentTarget: Element}} event
 */
const messageClickHandler = (event) => {
  if (event.target.matches('section, button')) {
    hideMessage(event.currentTarget);
  }
};

/**
 * Обработчик нажатия на клавишу Esc
 * @param {KeyboardEvent} event
 */
const keydownHandler = (event) => {
  if (event.key === 'Escape') {
    hideMessage(document.querySelector('.success, .error'));
    event.stopPropagation();
  }
};

/**
 * Скрывает окно с сообщением
 * @param {Element} modal
 */
function hideMessage(modal) {
  modal.remove();
  document.removeEventListener('keydown', keydownHandler, true);
  modal.removeEventListener('click', messageClickHandler);
}

/**
 * Отрисовывает окно типа type с сообщением title и текстом внутри кнопки butttonText
 * @param {MessageType} type
 * @param {string} title
 * @param {string} buttonText
 */
const showMessage = (type, title, buttonText) => {

  /** @type {HTMLTemplateElement} */
  const messageTemplate = document.querySelector(`#${type}`);

  const messageModal = /**@type {Element} */(messageTemplate.content.cloneNode(true));

  messageModal.querySelector(`.${type}__title`).textContent = title;

  messageModal.querySelector(`.${type}__button`).textContent = buttonText;

  messageModal.querySelector(`.${type}`).addEventListener('click', messageClickHandler);

  document.addEventListener('keydown', keydownHandler, true);

  document.body.append(messageModal);
};

export {showMessage};
