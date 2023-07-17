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
 * Возвращает массив из count уникальных случайных чисел из диапазона от min до max
 * @param {number} min
 * @param {number} max
 * @param {number} count
 * @return {Array<number>}
 */
const getSomeRandomNumbers = (min, max, count) => {
  const someRandomNumbers = [];
  const getUnicNumber = getUnicRandomNumber(min, max);
  for (let i = 0; i < count; i++) {
    someRandomNumbers.push(getUnicNumber());
  }
  return someRandomNumbers;
};

export {getRandomInteger, getUnicRandomNumber, getSomeRandomNumbers};
