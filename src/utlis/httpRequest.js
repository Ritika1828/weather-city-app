/**
 * Performs an HTTP request with retry functionality.
 *
 * @param {object} options - The options for the HTTP request.
 * @param {string} options.method - The HTTP method (default is 'GET').
 * @param {string} options.url - The URL to make the request to.
 * @param {string} options.params - The URL parameters.
 * @param {object} options.payload - The request payload.
 * @param {object} options.headers - The request headers.
 * @param {number} options.retryLimit - The maximum number of retries (default is 3).
 * @returns {Promise} A promise that resolves with the response data or rejects with an error message.
 */

export const httpRequest = ({ method = 'GET', url, params, payload, headers, retryLimit = 3 }) => {
  const URL = `${url}${params}`;
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    (function retryFunction() {
      Promise.race([
        fetch(URL, {
          method,
          data: payload,
          headers,
          signal: controller?.signal
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('api failure');
          }, 15000);
        })
      ])
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          controller?.abort();
          if (retryLimit-- > 0) {
            retryFunction();
          } else {
            if (e?.response?.data?.error?.message) {
              reject(e?.response?.data?.error?.message);
            }
            reject(`error in fetching data: ${e}`);
          }
        });
    })();
  });
};
