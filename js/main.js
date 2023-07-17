import { showFilters } from './filters.js';
import { renderGallery } from './gallery.js';
import { showMessage } from './message-modal.js';
import './upload-form/upload-form.js';
import { request } from './utils/data-requesting.js';


try {
  const data = await request('https://29.javascript.pages.academy/kekstagram/data');
  renderGallery(data);
  //console.log(data);
  showFilters();
} catch {
  showMessage('error', 'Не могу получить данные с сервера');
}
