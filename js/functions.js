//Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
const isShorter = (string = '', strLengthMax = 0) => string.length <= strLengthMax;


//Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string = '') => {

  string = string.replaceAll(' ','');
  string = string.toLowerCase();

  const strLength = string.length;
  const strStart = 0;
  const strEnd = strLength - 1;

  for (let i = strStart, j = strEnd; i < j; i++, j--) {
    if (string[i] !== string[j]) {
      return false;
    } else {
      continue;
    }
  }

  return true;

};

/*Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.*/
export const getNumber = (string = '') => {
  if (typeof(string) !== 'string') {
    string = String(string);
  }
  let resultString = '';
  const strLength = string.length;
  for (let i = 0; i < strLength; i++) {
    if (string[i] === '0' ||
    string[i] === '1' ||
    string[i] === '2' ||
    string[i] === '3' ||
    string[i] === '4' ||
    string[i] === '5' ||
    string[i] === '6' ||
    string[i] === '7' ||
    string[i] === '8' ||
    string[i] === '9') {

      resultString = resultString + string[i];
    }
  }

  if (resultString === '') {
    return NaN;
  }
  const result = Number(resultString);
  return result;
};


isShorter();
isPalindrome();
getNumber();
