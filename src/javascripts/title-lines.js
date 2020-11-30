import { gsap, Power4 } from 'gsap';

const titleLinesLayout = () => {
  document.querySelectorAll('.split-line').forEach((line) => {
    const l = line;
    if (line.querySelector('split-line__transparent-text')) {
      return;
    }
    if (line.classList.contains('split-line--skip-mobile') && window.innerWidth < 1024) {
      return;
    }
    l.innerHTML = `<span class="split-line__transparent-text">${line.innerHTML}</span><span class="split-line__hidden-text">${line.innerHTML}</span>`;
  });
};

const s = '.split-line__hidden-text';

let titleLines;
const titleLinesInstance = {
  layout: titleLinesLayout,
  getElements: () => document.querySelectorAll(`.introduction__title ${s}, .about__row ${s}`),
  getConfig: (page) => (page === 'index' ? ({
    y: 0,
    duration: 1.5,
    stagger: 0.1,
    ease: Power4.easeInOut,
  }) : ({
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: Power4.easeInOut,
  })),
  init: () => {
    titleLines = titleLinesInstance.getElements();
    gsap
      .timeline()
      .to(titleLines, titleLinesInstance.getConfig());
  },
  destroy: () => {
    gsap.killTweensOf(titleLines);
  },
};
export default titleLinesInstance;
