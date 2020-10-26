import { gsap, Power0, Power4 } from 'gsap';

function pad(inputNum, size) {
  let num = inputNum.toString();
  while (num.length < size) num = `0${num}`;
  return num;
}

const layout = () => {
  document.querySelectorAll('.split-line').forEach((line) => {
    const l = line;
    l.innerHTML = `<span class="split-line__transparent-text">${line.innerHTML}</span><span class="split-line__hidden-text">${line.innerHTML}</span>`;
  });
};

const initLoader = () => new Promise((resolve) => {
  const loader = document.querySelector('.loader');
  const finish = () => {
    setTimeout(() => {
      document.body.classList.add('ready');
      return resolve();
    });
  };
  if (!loader || window.innerWidth <= 1024) {
    finish();
    return;
  }
  layout();
  const titleLines = document.querySelectorAll('.introduction__title .split-line__hidden-text');
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
    window.scrollTo(0, 0);
  }, 2000);
  setTimeout(() => {
    renderPercents();
  }, 600);
  gsap.timeline()
    .to(progress, {
      width: '100%',
      duration: 3,
    });
  gsap
    .timeline()
    .to(frames, {
      width: '100%',
      duration: 2,
      delay: 0.4,
      stagger: 0.2,
      ease: Power0.easeNone,
    })
    .to(loader, {
      borderRadius: '50%',
      duration: 0.5,
      ease: Power0.easeNone,
    })
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
          duration: 1,
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
          duration: 1,
          ease: Power0.easeNone,
        };
      }

      return gsap
        .timeline()
        .to(loader, loaderConfig, '-=.5')
        .to(frames, {
          height: 364,
          marginTop: 0,
          marginLeft: 0,
          paddingLeft: 0,
          top: 0,
          left: 0,
          duration: 1,
          ease: Power0.easeNone,
        }, '-=1')
        .to(lines, {
          width: 1440,
          marginLeft: -710,
          marginTop: 16,
          duration: 1,
          ease: Power0.easeNone,
        }, '-=1')
        .to(titleLines, {
          y: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: Power4.easeInOut,
        }, '-=1')
        .to(loader, {
          opacity: 0,
          duration: 1,
        }, '-=1')
        .to(chart, {
          opacity: 1,
          duration: 1,
        }, '-=1');
    })
    .then(finish);
});

export default initLoader;
