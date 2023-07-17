import './upload-form/upload-form.js';
import { initGallery } from './gallery.js';


// try {
//   const data = await request('https://29.javascript.pages.academy/kekstagram/data');
//   renderGallery(data);
//   //console.log(data);
//   showFilters();
// } catch {
//   showMessage('error', 'Не могу получить данные с сервера');
// }

const data = await initGallery('https://29.javascript.pages.academy/kekstagram/data');

export {data};
