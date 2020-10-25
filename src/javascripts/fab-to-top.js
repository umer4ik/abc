const initFabToTop = () => {
  const fab = document.querySelector('.to-top-faw');
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
      fab.classList.add('visible');
    } else {
      fab.classList.remove('visible');
    }
  });
};

export default initFabToTop;
