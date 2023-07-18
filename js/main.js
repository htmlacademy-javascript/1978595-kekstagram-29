import './upload-form/upload-form.js';
import { initGallery } from './gallery.js';
import './filters.js';

/**
 * Данные картинок с сервера
 * @type {Array<Picture>}
 */
const data = await initGallery('https://29.javascript.pages.academy/kekstagram/data');

export {data};
