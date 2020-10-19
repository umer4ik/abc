// Load jQuery from NPM
/* eslint-disable no-new */
import initEye from './eye';
import initMagneticChart from './magnetic';
import initScrollSection from './scroll-section';
import initMenu from './image-hover';
import initCarousel from './carousel';
import initFlipText from './abc-text-flip';

const run = (...functions) => functions.forEach((item) => {
  const { params = [] } = item;
  if (typeof item === 'function') {
    item();
  } else if (item.delay) {
    setTimeout(() => item.func(...params), item.delay);
  } else {
    item.func(...params);
  }
});

const PAGE = document.body.getAttribute('data-page');

const pageFunctionsMap = {
  index: [
    initEye,
    initMagneticChart,
    {
      func: initScrollSection,
      delay: 100,
    },
    initMenu,
    initCarousel,
  ],
  projects: [
    initEye,
    {
      func: initScrollSection,
      params: [true],
    },
  ],
  about: [
    initEye,
    {
      func: initScrollSection,
      params: [true],
    },
    initFlipText,
  ],
};

setTimeout(() => {
  run(...pageFunctionsMap[PAGE]);
}, 1000);
