import { gsap, Power0, Power4 } from 'gsap';
import titleLinesInstance from './title-lines';

function pad(inputNum, size) {
  let num = inputNum.toString();
  while (num.length < size) num = `0${num}`;
  return num;
}

const MAX_LOADER_TIME = 4000;

const initLoader = () => new Promise((resolve) => {
  let finished = false;
  const isMobile = window.innerWidth <= 1024;
  const loader = document.querySelector('.loader');
  const page = document.body.getAttribute('data-page');
  const isIndexPage = page === 'index';
  /* eslint-disable-next-line */
  const finish = () => {
    if (!finished) {
      finished = true;
      document.body.classList.add('ready');
      return resolve();
    }
  };
  if (!loader) {
    finish();
    return;
  }
  setTimeout(() => {
    finish();
  }, MAX_LOADER_TIME);
  titleLinesInstance.layout();
  const titleLines = titleLinesInstance.getElements();
  const chart = document.querySelector('.introduction__chart');
  let finalX; let finalY;
  const frames = loader.querySelectorAll('.loader__frame');
  const lines = loader.querySelectorAll('img');
  const progress = loader.querySelector('.loader__progress');
  const percents = loader.querySelector('.loader__progress-percent');

  const renderPercents = () => {
    let i = 0;
    const step = 0.7;
    const renderFrame = () => {
      i += step;
      const r = Math.round(i) > 100 ? 100 : Math.round(i);
      percents.innerHTML = pad(r, 3);
      if (i < 100) {
        requestAnimationFrame(renderFrame);
      }
    };
    renderFrame();
  };
  setTimeout(() => {
    // window.scrollTo(0, 0);
  }, 2000);
  setTimeout(() => {
    renderPercents();
  }, 600);
  gsap.timeline()
    .to(progress, {
      width: '100%',
      duration: 0,
    });
  const bdrsConfig = isMobile ? {} : {
    borderRadius: '50%',
    duration: 0,
    ease: Power0.easeNone,
  };
  gsap
    .timeline()
    .to(frames, {
      width: '100%',
      duration: 0,
      delay: 0.4,
      stagger: 0.2,
      ease: Power0.easeNone,
    })
    .to(loader, bdrsConfig)
    .then(() => {
      let loaderConfig = {};
      if (chart) {
        ({ top: finalY, left: finalX } = chart.getBoundingClientRect());
        loaderConfig = {
          top: finalY,
          left: finalX,
          marginTop: 0,
          marginLeft: 0,
          width: 364,
          height: 364,
          borderRadius: '50%',
          duration: 0,
          ease: Power0.easeNone,
        };
      } else {
        loaderConfig = {
          top: '50%',
          left: '50%',
          marginTop: 0,
          marginLeft: 0,
          width: 0,
          height: 0,
          borderRadius: '50%',
          duration: 0,
          ease: Power0.easeNone,
        };
      }
      if (isMobile) {
        loaderConfig = {
          y: '100%',
          // opacity: 0,
          duration: 0,
          ease: Power0.easeNone,
        };
        let line = gsap
          .timeline()
          .to(loader, loaderConfig, '+=0');
        if (isIndexPage) {
          line = line.to(titleLines, {
            y: 0,
            duration: 0,
            stagger: 0.1,
            ease: Power4.easeInOut,
          }, '-=.5');
        }
        // `finish` callback fires too late if it's inside `line.then(finish)`
        setTimeout(() => {
          finish();
        }, 1000);
        return line;
      }

      const result = gsap
        .timeline()
        .to(loader, loaderConfig, '-=.5')
        .to(frames, {
          height: 364,
          marginTop: 0,
          marginLeft: 0,
          paddingLeft: 0,
          top: 0,
          left: 0,
          duration: 0,
          ease: Power0.easeNone,
        }, '-=1')
        .to(lines, {
          width: 1440,
          marginLeft: -710,
          marginTop: 16,
          duration: 0,
          ease: Power0.easeNone,
        }, '-=1');
      if (titleLinesInstance.getElements().length) {
        result.to(titleLines, titleLinesInstance.getConfig(page), '-=1');
      }
      result
        .to(loader, {
          opacity: 0,
          duration: 0,
        }, '-=.5')
        .to(chart, {
          opacity: 1,
          duration: 0,
        }, '-=.5');
      return result;
    })
    .then(finish);
});

export default initLoader;
