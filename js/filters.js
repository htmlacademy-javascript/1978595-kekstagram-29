import { rerenderGallery } from './gallery.js';
import { request } from './utils.js';
import { debounce } from './utils.js';

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
  const copiedData = structuredClone(data);
  const randomData = copiedData.sort(() => Math.random() - 0.5).splice(0, RANDOM_LIMIT);
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
