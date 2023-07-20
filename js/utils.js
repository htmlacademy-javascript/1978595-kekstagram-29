/**
 * Отправляет HTTP-запрос на указанный url с настройками options
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns
 */
const request = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Ошибка получения данных!\n${response.status}: ${response.statusText}`);
  }
  return response.json();
};

/**
 * @template {Function} T
 * @param {T} callback
 * @param {number} timeoutDelay
 * @returns {T}
 */
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  //@ts-ignore
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/**
 * Разбивает строку слов на массив строк
 * @param {string} string
 * @returns {Array<string>}
 */
const segmentWords = (string) => string.toLowerCase().split(' ').filter(Boolean);


export {request, debounce, segmentWords};
