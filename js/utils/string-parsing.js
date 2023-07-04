/**
 * Разбивает строку слов на массив строк
 * @param {string} string
 * @returns {Array<string>}
 */
const segmentWords = (string) => string.toLowerCase().split(' ').filter(Boolean);

export {segmentWords};
