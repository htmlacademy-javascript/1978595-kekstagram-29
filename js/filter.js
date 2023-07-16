import { clearGallery, renderGallery } from './gallery.js';
import { request } from './utils/data-requesting.js';
import { debounce, throttle } from './utils/optimization.js';
import { getSomeRandomNumbers } from './utils/random-numbers-generation.js';

const RERENDER_DELAY = 500;

/**
 * Количество одновременно отображаемых случайных фотографий
 */
const RANDOM_MAX = 10;

const data = await request('https://29.javascript.pages.academy/kekstagram/data');

const filters = document.querySelector('.img-filters');

const defaultButton = filters.querySelector('#filter-default');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const changeActive = (button) => {
  filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const rerenderGallery = (newData) => {
  clearGallery();
  renderGallery(newData);
};

const debouncedRerenderGallery = debounce(rerenderGallery, RERENDER_DELAY);

const throttledRerenderGallery = throttle(rerenderGallery, RERENDER_DELAY);

const defaultClickHandler = (event) => {
  debouncedRerenderGallery(data);
  changeActive(event.target);
};

const randomClickHandler = (event) => {
  const randomIndexes = getSomeRandomNumbers(0, data.length - 1, RANDOM_MAX);
  //console.log(randomIndexes);
  const randomData = data.filter((element, index) => randomIndexes.includes(index));
  //console.log(newData);
  throttledRerenderGallery(randomData);
  changeActive(event.target);
};

const discussedClickHandler = (event) => {
  const copiedData = structuredClone(data);
  copiedData.sort((pic1, pic2) => pic2.comments.length - pic1.comments.length);
  //console.log(data);
  throttledRerenderGallery(copiedData);
  changeActive(event.target);
};

defaultButton.addEventListener('click', defaultClickHandler);
randomButton.addEventListener('click', randomClickHandler);
discussedButton.addEventListener('click', discussedClickHandler);

export {showFilters};
