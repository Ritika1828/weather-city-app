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
        }).then((data) => {
          return data.json();
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('api failure');
          }, 15000);
        })
      ])
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
