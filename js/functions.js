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
 * @param {string} time
 * @returns {number}
 */
const parseTime = (time) => {
  const parts = time.split(':').map(Number);
  const [hours, minutes] = parts;

  return hours * 60 + minutes;
};

/**
 * Принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
 * @param {string} workStart - строка в формате часы:минуты
 * @param {string} workEnd  - строка в формате часы:минуты
 * @param {string} meetingStart  - строка в формате часы:минуты
 * @param {number} meetingDuration - время в минутах
 * @returns {boolean}
 */
const isWithinWorkingDay = (workStart, workEnd, meetingStart, meetingDuration) => {

  const workStartTime = parseTime(workStart);
  const workEndTime = parseTime(workEnd);
  const meetingStartTime = parseTime(meetingStart);

  // if (
  //   meetingStartTimeInMinutes < startTimeInMinutes ||
  //   meetingStartTimeInMinutes > endTimeInMinutes ||
  //   meetingStartTimeInMinutes + meetingDuration > endTimeInMinutes
  // ) {
  //   return false;
  // }
  // return true;
  return (
    meetingStartTime >= workStartTime &&
    meetingDuration <= workEndTime - meetingStartTime
  );
};

export {isWithinWorkingDay};


isShorter();
isPalindrome(123321);
parseDigits('es2022');


// console.log(withinTheWorkingDay('08:00', '17:30', '14:00', 90));
// console.log(withinTheWorkingDay('8:0', '10:0', '8:0', 120));
// console.log(withinTheWorkingDay('08:00', '14:30', '14:00', 90));
// console.log(withinTheWorkingDay('14:00', '17:30', '08:0', 90));
// console.log(withinTheWorkingDay('8:00', '17:30', '08:00', 900));
