import { openModal } from '../popup.js';
import {loadNewButton, loadNewPopup, imageLoadForm} from './entities.js';
import { formValidator } from './validation.js';


loadNewButton.addEventListener('input', () => {

  openModal(loadNewPopup);

});

imageLoadForm.addEventListener('reset', () => {
  formValidator.reset();
});

imageLoadForm.addEventListener('popup::hide', () => {
  imageLoadForm.reset();
}, true);

