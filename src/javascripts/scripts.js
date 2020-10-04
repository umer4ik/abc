// Load jQuery from NPM
import $ from 'jquery';
import { tns } from 'tiny-slider/src/tiny-slider';

window.jQuery = $;
window.$ = $;

const projectsCarousel = tns({
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
