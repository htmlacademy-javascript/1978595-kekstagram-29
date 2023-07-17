import { rerenderGallery } from './gallery.js';
import { request } from './utils/data-requesting.js';
import { debounce } from './utils/optimization.js';
import { getSomeRandomNumbers } from './utils/random-numbers-generation.js';

/**
 * Задержка отрисовки
 */
const RERENDER_DELAY = 500;

/**
 * Количество одновременно отображаемых случайных фотографий
 */
const RANDOM_LIMIT = 10;

const data = await request('https://29.javascript.pages.academy/kekstagram/data');

/**
 * Панель с фильтрами
 */
const filters = document.querySelector('.img-filters');

const defaultButton = filters.querySelector('#filter-default');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');

/**
 * Снимает скрывающий класс с панели с фильтрами
 */
const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

/**
 * Меняет стиль активного фильтра
 * @param {HTMLButtonElement} button
 */
const changeActive = (button) => {
  filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};


const debouncedRerenderGallery = debounce(rerenderGallery, RERENDER_DELAY);

const defaultClickHandler = (event) => {
  debouncedRerenderGallery(data);
  changeActive(event.target);
};

const randomClickHandler = (event) => {
  const randomIndexes = getSomeRandomNumbers(0, data.length - 1, RANDOM_LIMIT);
  //console.log(randomIndexes);
  const randomData = data.filter((element, index) => randomIndexes.includes(index));
  //console.log(newData);
  debouncedRerenderGallery(randomData);
  changeActive(event.target);
};

const discussedClickHandler = (event) => {
  const copiedData = structuredClone(data);
  copiedData.sort((pic1, pic2) => pic2.comments.length - pic1.comments.length);
  //console.log(data);
  debouncedRerenderGallery(copiedData);
  changeActive(event.target);
};

defaultButton.addEventListener('click', defaultClickHandler);
randomButton.addEventListener('click', randomClickHandler);
discussedButton.addEventListener('click', discussedClickHandler);

export { showFilters };
