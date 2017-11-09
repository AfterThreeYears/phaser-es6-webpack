const promiseify = (fn, ctx) => {
  return (args) => {
    return new Promise((resolve, reject) => {
      fn.call(ctx, args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
};

module.exports = {
  promiseify,
};
