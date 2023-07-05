import { openModal } from '../popup.js';
import { loadNewButton, loadNewPopup, imageLoadForm } from './elements.js';
import { formValidator } from './validation.js';
import { resetScale } from './scaling.js';
import './effects.js';


loadNewButton.addEventListener('change', () => {

  openModal(loadNewPopup);

});

imageLoadForm.addEventListener('reset', () => {
  resetScale();
  formValidator.reset();
});

imageLoadForm.addEventListener('popup::hide', () => {
  imageLoadForm.reset();
}, true);

