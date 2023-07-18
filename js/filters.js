import { debouncedRerenderGallery } from './gallery.js';
import { data } from './main.js';

/**
 * Количество одновременно отображаемых случайных фотографий
 */
const RANDOM_LIMIT = 10;

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

/**
 * Обрабатывает клик по кнопке фильтра "По-умолчанию"
 * @param MouseEvent & {target: Element}
 */
const defaultClickHandler = (event) => {
  debouncedRerenderGallery(data);
  changeActive(event.target);
};

/**
 * Обрабатывает клик по кнопке фильтра "Случайные"
 * @param MouseEvent & {target: Element}
 */
const randomClickHandler = (event) => {
  const copiedData = structuredClone(data);
  const randomData = copiedData.sort(() => Math.random() - 0.5).splice(0, RANDOM_LIMIT);
  debouncedRerenderGallery(randomData);
  changeActive(event.target);
};

/**
 * Обрабатывает клик по кнопке фильтра "Обсуждаемые"
 * @param MouseEvent & {target: Element}
 */
const discussedClickHandler = (event) => {
  const copiedData = structuredClone(data);
  copiedData.sort((pic1, pic2) => pic2.comments.length - pic1.comments.length);
  debouncedRerenderGallery(copiedData);
  changeActive(event.target);
};

defaultButton.addEventListener('click', defaultClickHandler);
randomButton.addEventListener('click', randomClickHandler);
discussedButton.addEventListener('click', discussedClickHandler);

export { showFilters };
