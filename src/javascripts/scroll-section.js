const rail = document.querySelector('.lp__scroll-rail');
const trigger = document.querySelector('.lp__scroll-trigger');
const title = document.querySelector('.lp__title');
const list = document.createElement('div');
const menuLists = document.querySelectorAll('.list');
list.className = 'lp__sections-list';
const sections = document.querySelectorAll('[data-section]');
const colorSections = document.querySelectorAll('[data-section-color]');

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

const getColorSection = (scrollTop) => {
  for (let i = 0; i < colorSections.length; i += 1) {
    const section = colorSections[i];
    const { offsetTop } = section;
    // console.log(scrollTop, offsetTop);
    if (offsetTop > scrollTop) {
      return i - 1;
    }
  }
  return colorSections.length - 1;
};

export default function init(onlyTrigger = false) {
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

  if (!onlyTrigger) {
    for (let i = 0; i < sections.length; i += 1) {
      const section = sections[i];
      list.innerHTML += `<div>${section.getAttribute('data-section')}</div>`;
    }
    title.innerHTML = '';
    title.appendChild(list);
  }
  window.addEventListener('scroll', () => {
    setTriggerPosition(window.scrollY);
    const sectionIndex = getNextSectionIndex(window.scrollY);
    if (!onlyTrigger) {
      list.style.transform = `translateY(${-16 * sectionIndex}px)`;
    }
    const colorSectionIndex = getColorSection(window.scrollY + window.innerHeight / 2);
    const color = colorSections[colorSectionIndex].getAttribute('data-section-color');
    document.body.style.backgroundColor = color;
    menuLists.forEach((el) => {
      const l = el;
      l.style.backgroundColor = color;
    });
  });
}
