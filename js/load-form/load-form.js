import { openModal } from '../popup.js';
import { loadNewButton, loadNewPopup, imageLoadForm } from './elements.js';
import { formValidator } from './validation.js';
import { resetScale } from './scaling.js';
import { resetEffect } from './effects-set.js';


loadNewButton.addEventListener('change', () => {

  openModal(loadNewPopup);

});

imageLoadForm.addEventListener('reset', () => {
  resetScale();
  formValidator.reset();
  resetEffect();
});

imageLoadForm.addEventListener('popup::hide', () => {
  imageLoadForm.reset();
}, true);

