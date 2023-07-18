/**
 * Проверяет элемент на принадлежность к полям текстового ввода
 * @param {Element} elem
 * @returns {boolean}
 */
const isTextInputFocused = (elem) => elem.matches('input[type="text"], textarea');

/**
 * Обработчик нажатия кдавиши Esc
 * @param {KeyboardEvent} event
 */
const keydownHandler = (event) => {
  if (event.key === 'Escape' && !isTextInputFocused(document.activeElement)) {
    closeModal(document.querySelector('.overlay:not(.hidden)'));
  }
};

/**
 * Обработчик клика по кнопке закрытия окна
 * @param {PointerEvent & {target: Element, currentTarget: Element}} event
 */
const modalClickHandler = (event) => {
  if (event.target.closest('.cancel')) {
    closeModal(event.currentTarget);
  }
};

/**
 *
 * @param {Element} modal
 */
function openModal(modal) {
  modal.classList.remove('hidden');
  modal.addEventListener('click', modalClickHandler);

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keydownHandler);
}

/**
 * @param {Element} modal
 */
function closeModal (modal) {
  modal.classList.add('hidden');
  modal.removeEventListener('click', modalClickHandler);

  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownHandler);

  modal.dispatchEvent(new Event('modal::hide'));
}

export {closeModal, openModal};
