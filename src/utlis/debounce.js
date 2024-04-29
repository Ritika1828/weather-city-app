/**
 * Debounces a function.
 *
 * @param {*} func The function to be debounced.
 * @param {*} timeout The debounce timeout in milliseconds.
 * @returns {Function} A debounced version of the input function.
 */

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default debounce;
