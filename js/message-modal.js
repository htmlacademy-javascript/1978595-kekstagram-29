const messageClickHandler = (event) => {
  if (event.target.matches('section, button')) {
    hideMessage(event.currentTarget);
  }
};

const keydownHandler = (event) => {
  if (event.key === 'Escape') {
    hideMessage(document.querySelector('.success, .error'));
    event.stopPropagation();
  }
};

function hideMessage(modal) {
  modal.remove();
  document.removeEventListener('keydown', keydownHandler, true);
  modal.removeEventListener('click', messageClickHandler);
}

const showMessage = (type, title) => {
  /**
   * @type {HTMLTemplateElement}
   */
  const messageTemplate = document.querySelector(`#${type}`);

  const messageModal = /**@type {Element} */(messageTemplate.content.cloneNode(true));

  messageModal.querySelector(`.${type}__title`).textContent = title;

  messageModal.querySelector(`.${type}`).addEventListener('click', messageClickHandler);

  document.addEventListener('keydown', keydownHandler, true);

  document.body.append(messageModal);
};

export {showMessage};
