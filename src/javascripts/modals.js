import $ from 'jquery';

window.$ = $;
window.jQuery = $;
require('jquery-modal');

const initModals = () => {
  $('[data-open-modal]').on('click', function openModal() {
    const id = this.getAttribute('data-open-modal');
    $(id).modal({
      escapeClose: false,
      clickClose: false,
      showClose: false,
    });
  });
  $('.modal').on($.modal.BEFORE_OPEN, function beforeOpen() {
    setTimeout(() => {
      $(this).addClass('open');
    });
  });
  $('.modal__close').on('click', function beforeClose() {
    $(this).closest('.modal').removeClass('open');
    setTimeout(() => {
      $(this).closest('.blocker').fadeOut(200, 'swing', () => {
        $.modal.close();
      });
    }, 350);
  });
  $('body').on('click', '.blocker', function onBlockierClick(e) {
    if (!$(e.target).hasClass('blocker')) {
      return;
    }
    $(this).find('.modal').removeClass('open');
    setTimeout(() => {
      $(this).fadeOut(200, 'swing', () => {
        $.modal.close();
      });
    }, 350);
  });
  $('.member__btn').on('click', function toggleMemberInfo() {
    $('.member__btn').each((index, btn) => {
      if (btn === this) return;
      $(btn).removeClass(['round-outline-btn--no-hover', 'round-outline-btn--no-outline'])
        .addClass('round-outline-btn--solid').closest('.member__info')
        .removeClass('open');
    });
    $(this).toggleClass(['round-outline-btn--no-hover']).closest('.member__info').toggleClass('open');
    setTimeout(() => {
      $(this).toggleClass(['round-outline-btn--solid', 'round-outline-btn--no-outline']);
    }, 300);
  });
};

export default initModals;
