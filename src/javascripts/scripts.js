// Load jQuery from NPM
/* eslint-disable no-new */
import Navigo from 'navigo';
import initEye from './eye';
import magneticChart from './magnetic';
import scrollSection from './scroll-section';
import imageHover from './image-hover';
import carousel from './carousel';
import initFlipText from './abc-text-flip';
import initLoader from './loader';
import modals from './modals';
import smoothScroll from './smooth-scroll';
import cursor from './cursor';
import initFabToTop from './fab-to-top';
import scrollAnimation from './scroll-animation';
import initPageTransition from './page-transition';
import curtain from './curtain';

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

const run = (nameOfTheRunner = 'init') => (...initializers) => initializers.forEach((initializer) => {
  const runner = initializer[nameOfTheRunner];
  const { params = [] } = runner;
  if (typeof runner === 'function') {
    runner();
  } else if (runner.delay) {
    setTimeout(() => runner.func(...params), runner.delay);
  } else {
    runner.func(...params);
  }
});
window.scrollSection = scrollSection;
window.carousel = carousel;
window.smoothScroll = smoothScroll;
const pageFunctionsMap = {
  index: [
    {
      init: cursor.init,
      destroy: cursor.destroy,
    },
    {
      init: {
        func: magneticChart.init,
        delay: 100,
      },
      destroy: magneticChart.destroy,
    },
    {
      init: {
        func: scrollSection.init,
        delay: 100,
      },
      destroy: scrollSection.destroy,
    },
    {
      init: {
        func: imageHover.init,
        params: [projectImages],
      },
      destroy: imageHover.destroy,
    },
    {
      init: carousel.init,
      destroy: carousel.destroy,
    },
    {
      init: modals.init,
      destroy: modals.destroy,
    },
    {
      init: {
        func: smoothScroll.init,
        delay: 75,
      },
      destroy: smoothScroll.destroy,
    },
    {
      init: scrollAnimation.init,
      destroy: scrollAnimation.destroy,
    },
  ],
  projects: [
    {
      init: cursor.init,
      destroy: cursor.destroy,
    },
    {
      init: {
        func: scrollSection.init,
        delay: 100,
        params: [true],
      },
      destroy: scrollSection.destroy,
    },
    {
      init: modals.init,
      destroy: modals.destroy,
    },
    {
      init: {
        func: smoothScroll.init,
        delay: 75,
      },
      destroy: smoothScroll.destroy,
    },
    {
      init: scrollAnimation.init,
      destroy: scrollAnimation.destroy,
    },
  ],
  about: [
    {
      init: cursor.init,
      destroy: cursor.destroy,
    },
    {
      init: {
        func: scrollSection.init,
        delay: 100,
        params: [true],
      },
      destroy: scrollSection.destroy,
    },
    {
      init: initFlipText,
      destroy: () => {},
    },
    {
      init: {
        func: imageHover.init,
        params: [abcBoardMembersImages],
      },
      destroy: imageHover.destroy,
    },
    {
      init: modals.init,
      destroy: modals.destroy,
    },
    {
      init: {
        func: smoothScroll.init,
        delay: 75,
      },
      destroy: smoothScroll.destroy,
    },
    {
      init: scrollAnimation.init,
      destroy: scrollAnimation.destroy,
    },
  ],
};

setTimeout(() => {
  initEye();
  initFabToTop();
});

const curtainTime = 1000;

initLoader().then(() => {
  run('init')(...pageFunctionsMap[document.body.getAttribute('data-page')]);
  // init common things for all of the pages, which shouldn't be updated
  const router = new Navigo();
  router.hooks({
    before: (done) => {
      // show curtain
      curtain.show();

      // destroy initializers

      setTimeout(() => {
        run('destroy')(...pageFunctionsMap[document.body.getAttribute('data-page')]);
        done();
        // hide curtain
      }, curtainTime);
    },
    after() {
      window.scrollTo(0, 0);
    },
  });
  const createRouterHandler = (href, page) => () => {
    fetch(href)
      .then((response) => response.text())
      .then((pageContent) => {
        const parser = new DOMParser();
        const d = parser.parseFromString(pageContent, 'text/html');
        const mainContainerContent = d.querySelector('.main__container').innerHTML;
        const mainContainer = document.querySelector('.main__container');
        const innerImages = d.querySelectorAll('img');
        let willBeLoaded = 0;
        let loaded = 0;
        innerImages.forEach((img) => {
          if (img.src.indexOf('.gif') === -1) {
            const image = document.createElement('img');
            image.src = img.src;
            willBeLoaded += 1;
            image.onload = () => {
              loaded += 1;
              if (loaded === willBeLoaded) {
                mainContainer.innerHTML = mainContainerContent;
                document.body.setAttribute('data-page', page);
                run('init')(...pageFunctionsMap[page]);
                curtain.hide();
              }
            };
          }
        });
      });
  };
  router.on({
    'about.html': createRouterHandler('about.html', 'about'),
    'projects.html': createRouterHandler('projects.html', 'projects'),
    '': createRouterHandler('index.html', 'index'),
  });

  initPageTransition(router);
});
