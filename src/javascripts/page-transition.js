import $ from 'jquery';

export default function initPageTransition(router) {
  $('body').on('click', 'a[href]:not([href^="mailto"]):not([href^="tel"])', (e) => {
    const href = e.target.getAttribute('href');
    e.preventDefault();
    router.navigate(href);
  });
}
