/**
 * Разбивает строку слов на массив строк
 * @param {string} string
 * @returns {Array<string>}
 */
const segmentWords = (string) => string.toLowerCase().split(' ').filter(Boolean);

export {segmentWords};

/**
 *Функция принимает value и преобразует в строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.
 * @param {number | string} value
 * @returns {number}
 */
export const parseDigits = (value) => {
  value = String(value);
  let resultString = '';
  const strLength = value.length;

  for (let i = 0; i < strLength; i++) {
    if (
      value[i] === '0' ||
      value[i] === '1' ||
      value[i] === '2' ||
      value[i] === '3' ||
      value[i] === '4' ||
      value[i] === '5' ||
      value[i] === '6' ||
      value[i] === '7' ||
      value[i] === '8' ||
      value[i] === '9'
    ) {
      resultString += value[i];
    }
  }

  return resultString ? Number(resultString) : NaN;
};
