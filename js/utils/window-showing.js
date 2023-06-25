/**
 *
 * @param {*} window
 */
const makeVisibleModal = (window) => {
  window.classList.remove('hidden');
  document.body.classList.add('modal-open');
};
const makeHiddenModal = (window) => {
  window.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export {makeHiddenModal, makeVisibleModal};
