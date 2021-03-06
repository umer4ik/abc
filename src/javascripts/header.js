let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
export default {
  init: () => {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      let direction = 'to-bottom';
      const pageOffset = window.pageYOffset || document.documentElement.scrollTop;
      if (lastScroll > pageOffset) {
        direction = 'to-top';
      }
      lastScroll = pageOffset;
      if (direction === 'to-bottom' && pageOffset > 200) {
        header.classList.add('header--hide');
      } else {
        header.classList.remove('header--hide');
      }
    });
  },
  destroy: () => {},
};
