import { renderGallery } from './gallery.js';
import './upload-form/upload-form.js';

fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => renderGallery(data))
  .catch(() => console.log('Ошибка'));


