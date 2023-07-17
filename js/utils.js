/**
 * Отправляет HTTP-запрос на указанный url с настройками options
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns
 */
async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Ошибка получения данных!\n${response.status}: ${response.statusText}`);
  }
  return response.json();
}

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/**
 * Генерирует случайное число из диапазона от min до max.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

/**
 * Генерирует функцию для генерации уникальных случайных чисел из диапазона от min до max
 * @param {number} min
 * @param {number} max
 * @returns {() => number}
 */
const getUnicRandomNumber = (min, max) => {
  /**
   * @type {number[]}
   */
  const previousValues = [];
  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 * Разбивает строку слов на массив строк
 * @param {string} string
 * @returns {Array<string>}
 */
const segmentWords = (string) => string.toLowerCase().split(' ').filter(Boolean);


export {request, debounce, getRandomInteger, getUnicRandomNumber, segmentWords};
