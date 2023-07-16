import { clearGallery, renderGallery } from './gallery.js';
import { showMessage } from './message-modal.js';
import { request } from './utils/data-requesting.js';
import { getSomeRandomNumbers } from './utils/random-numbers-generation.js';

/**
 * Количество одновременно отображаемых случайных фотограффий
 */
const RANDOM_MAX = 10;


const filters = document.querySelector('.img-filters');

const defaultButton = filters.querySelector('#filter-default');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const defaultClickHandler = async (event) => {
  try {
    const data = await request('https://29.javascript.pages.academy/kekstagram/data');
    clearGallery();
    renderGallery(data);
    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
  } catch {
    showMessage('error', 'Не могу получить данные с сервера');
  }
};

const randomClickHandler = async (event) => {
  try {
    const data = await request('https://29.javascript.pages.academy/kekstagram/data');
    const randomIndexes = getSomeRandomNumbers(0, data.length - 1, RANDOM_MAX);
    //console.log(randomIndexes);
    const newData = data.filter((element, index) => randomIndexes.includes(index));
    //console.log(newData);
    clearGallery();
    renderGallery(newData);
    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
  } catch {
    showMessage('error', 'Не могу получить данные с сервера');
  }
};

const discussedClickHandler = async (event) => {
  try {
    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
    const data = await request('https://29.javascript.pages.academy/kekstagram/data');
    clearGallery();
    data.sort((pic1, pic2) => pic2.comments.length - pic1.comments.length);
    //console.log(data);
    renderGallery(data);
  } catch {
    showMessage('error', 'Не могу получить данные с сервера');
  }
};

defaultButton.addEventListener('click', defaultClickHandler);
randomButton.addEventListener('click', randomClickHandler);
discussedButton.addEventListener('click', discussedClickHandler);

export {showFilters};
