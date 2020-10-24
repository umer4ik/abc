const initLoader = (ms = 1000) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, ms);
});

export default initLoader;