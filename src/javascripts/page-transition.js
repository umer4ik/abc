import $ from 'jquery';

export default function initPageTransition(router) {
  $('body').on('click', 'a[href]', (e) => {
    const href = e.currentTarget.getAttribute('href');
    // console.log(href, e.currentTarget);
    if (!['#', 'mailto', 'tel', 'https'].some((skip) => href.indexOf(skip) > -1)) {
      router.navigate(href);
      e.preventDefault();
    }
  });
}
