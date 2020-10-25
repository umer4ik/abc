// Load jQuery from NPM
/* eslint-disable no-new */
import initEye from './eye';
import initMagneticChart from './magnetic';
import initScrollSection from './scroll-section';
import initMenu from './image-hover';
import initCarousel from './carousel';
import initFlipText from './abc-text-flip';
import initLoader from './loader';
import initModals from './modals';
import initScroll from './smooth-scroll';
import initCursor from './cursor';
import initFabToTop from './fab-to-top';
import { PAGE } from './constants';

const projectsImagesMap = {};
const abcBoardMembersImagesMap = {};

function importAll(r, map) {
  r.keys().forEach((key) => {
    const m = map;
    m[key] = r(key);
  });
}

importAll(require.context('../images/projects/', true, /\.png$/), projectsImagesMap);
importAll(require.context('../images/abc-board-members/', true, /\.png$/), abcBoardMembersImagesMap);

const projectImages = Object.entries(projectsImagesMap);
const abcBoardMembersImages = Object.entries(abcBoardMembersImagesMap);

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
const pageFunctionsMap = {
  index: [
    // initEye,
    initMagneticChart,
    {
      func: initScrollSection,
      delay: 100,
    },
    {
      func: initMenu,
      params: [projectImages],
    },
    initCarousel,
    initModals,
    initScroll,
    initCursor,
  ],
  projects: [
    // initEye,
    {
      func: initScrollSection,
      params: [true],
    },
    initModals,
    initScroll,
    initCursor,
  ],
  about: [
    // initEye,
    {
      func: initScrollSection,
      params: [true],
    },
    initFlipText,
    {
      func: initMenu,
      params: [abcBoardMembersImages],
    },
    initModals,
    initScroll,
    initCursor,
  ],
};

setTimeout(() => {
  initEye();
  initFabToTop();
});

initLoader().then(() => {
  run(...pageFunctionsMap[PAGE]);
});
