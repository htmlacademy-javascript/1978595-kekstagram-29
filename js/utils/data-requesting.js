/**
 *
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

export {request};
