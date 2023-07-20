import './upload-form/upload-form.js';
import { initFilters } from './filters.js';
import { request } from './utils.js';
import { renderGallery } from './gallery.js';
import { showMessage } from './message-modal.js';

try {
  /**
 * Данные картинок с сервера
 * @type {Array<Picture>}
 */
  const data = await request('https://29.javascript.pages.academy/kekstagram/data');
  renderGallery(data);
  initFilters(data);
} catch {
  showMessage('error', 'Не могу получить данные с сервера', 'Закрыть');
}
