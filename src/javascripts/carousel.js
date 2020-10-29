/* eslint-disable no-new */
import { tns } from 'tiny-slider/src/tiny-slider';
import $ from 'jquery';

let projectsCarousel;

const initCarousel = () => {
  projectsCarousel = tns({
    container: '.projects-carousel',
    items: 2,
    slideBy: 'slide',
    mouseDrag: true,
    center: true,
    loop: false,
    swipeAngle: false,
    gutter: 8,
    nav: false,
    controls: false,
  });
  projectsCarousel.events.on('indexChanged', (info) => {
    const i = info.displayIndex - 1;
    $('.projects-section__carousel-nav-item').removeClass('active');
    $(`.projects-section__carousel-nav-item[data-slide="${i}"]`).addClass('active');
  });

  $('.projects-section__carousel-nav-item').on('click', (e) => {
    projectsCarousel.goTo($(e.currentTarget).attr('data-slide'));
  });

  const container = document.querySelector('.projects-carousel');
  container.addEventListener('mousedown', () => {
    container.classList.add('dragging');
  });
  container.addEventListener('mouseup', () => {
    container.classList.remove('dragging');
  });
};

const carousel = {
  init: () => {
    initCarousel();
  },
  destroy: () => {
    if (projectsCarousel) {
      projectsCarousel.destroy();
    }
  },
};

export default carousel;
