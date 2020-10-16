const rail = document.querySelector('.lp__scroll-rail');
const trigger = document.querySelector('.lp__scroll-trigger');
const list = document.querySelector('.lp__sections-list');
const sections = document.querySelectorAll('[data-section]');

const getNextSectionIndex = (scrollTop) => {
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const { offsetTop } = section;
    // console.log(scrollTop, offsetTop);
    if (offsetTop > scrollTop) {
      return i;
    }
  }
  return sections.length - 1;
};

export default function init() {
  const railWidth = rail.getBoundingClientRect().height;
  const windowTotalHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const ratio = railWidth / windowTotalHeight;
  const triggerWidth = windowHeight * ratio;
  trigger.style.width = `${triggerWidth}px`;

  const setTriggerPosition = (scrollTop) => {
    trigger.style.transform = `translateX(${-scrollTop * ratio}px)`;
  };
  setTriggerPosition(window.scrollY);

  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    list.innerHTML += `<div>${section.getAttribute('data-section')}</div>`;
  }
  window.addEventListener('scroll', () => {
    const sectionIndex = getNextSectionIndex(window.scrollY);
    setTriggerPosition(window.scrollY);
    list.style.transform = `translateY(${-16 * sectionIndex}px)`;
  });
}
