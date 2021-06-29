const wrapAsync =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn.call(null, ...args, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      })
    );

const runAsync = (fn, ...args) => wrapAsync(fn)(...args);

module.exports.wrapAsync = wrapAsync;
module.exports.runAsync = runAsync;
