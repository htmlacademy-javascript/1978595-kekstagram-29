/**
 *Функция для проверки длины строки. Она принимает строку string, которую нужно проверить, и максимальную длину strLengthMax и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
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

/**
 * Преобразует строку вида ЧЧ:ММ в количество минут
 * @param {string} timeStr
 * @returns {number}
 */
const timeToPureMinutes = (timeStr) => {
  const timeStrArray = timeStr.split(':').map((element) => Number(element));
  return timeStrArray[0] * 60 + timeStrArray[1];
};

/**
 * Принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
 * @param {string} startTime - строка в формате часы:минуты
 * @param {string} endTime  - строка в формате часы:минуты
 * @param {string} meetingStartTime  - строка в формате часы:минуты
 * @param {number} meetingDuration - время в минутах
 * @returns {boolean}
 */
const withinTheWorkingDay = (startTime, endTime, meetingStartTime, meetingDuration) => {

  const startTimeInMinutes = timeToPureMinutes(startTime);
  const endTimeInMinutes = timeToPureMinutes(endTime);
  const meetingStartTimeInMinutes = timeToPureMinutes(meetingStartTime);

  if (
    meetingStartTimeInMinutes < startTimeInMinutes ||
    meetingStartTimeInMinutes > endTimeInMinutes ||
    meetingStartTimeInMinutes + meetingDuration > endTimeInMinutes
  ) {
    return false;
  }
  return true;
};

export {withinTheWorkingDay};


isShorter();
isPalindrome(123321);
parseDigits('es2022');


// console.log(withinTheWorkingDay('08:00', '17:30', '14:00', 90));
// console.log(withinTheWorkingDay('8:0', '10:0', '8:0', 120));
// console.log(withinTheWorkingDay('08:00', '14:30', '14:00', 90));
// console.log(withinTheWorkingDay('14:00', '17:30', '08:0', 90));
// console.log(withinTheWorkingDay('8:00', '17:30', '08:00', 900));
