/**
 *  Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
 * @param {string} string
 * @param {number} strLengthMax
 * @returns {boolean}
 */
const isShorter = (string = '', strLengthMax = 0) => string.length <= strLengthMax;


//Функция для проверки, является ли строка палиндромом.

/**
 * проверяет, является ли value палиндромом
 * @param {string | number} value
 * @returns {boolean}
 */
const isPalindrome = (value) => {

  value = String(value).replaceAll(' ','').toLowerCase();

  for (let i = 0, k = value.length - 1 ; i < k; i++, k--) {
    if (value[i] !== value[k]) {
      return false;
    }
  }

  return true;

};

/**
 *Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.
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


isShorter();
isPalindrome();
parseDigits();
