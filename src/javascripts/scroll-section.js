const rail = document.querySelector('.lp__scroll-rail');
const trigger = document.querySelector('.lp__scroll-trigger');
const title = document.querySelector('.lp__title');
const list = document.createElement('div');
list.className = 'lp__sections-list';

let sections; let colorSections;

const updateSections = () => {
  sections = document.querySelectorAll('[data-section]');
  colorSections = document.querySelectorAll('[data-section-color]');
};

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

let scrollListener;

const scrollSection = {
  init(onlyTrigger = false) {
    const railWidth = rail.getBoundingClientRect().height;
    const windowTotalHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const ratio = railWidth / windowTotalHeight;
    const triggerWidth = windowHeight * ratio;
    trigger.style.width = `${triggerWidth}px`;
    updateSections();
    document.body.style.backgroundColor = colorSections[0].getAttribute('data-section-color');
    const setTriggerPosition = (scrollTop) => {
      trigger.style.transform = `translateX(${-scrollTop * ratio}px)`;
    };
    setTriggerPosition(window.scrollY);

    title.innerHTML = '';
    if (!onlyTrigger) {
      for (let i = 0; i < sections.length; i += 1) {
        const section = sections[i];
        list.innerHTML += `<div>${section.getAttribute('data-section')}</div>`;
      }
      title.appendChild(list);
    } else {
      title.innerHTML = `<svg class="lp__arrow" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.706493 9.44926C0.334111 9.76844 0.331865 10.3438 0.701744 10.6659L5.17903 14.5646C5.2907 14.6618 5.45697 14.6618 5.56865 14.5646L10.0459 10.6659C10.4158 10.3438 10.4136 9.76844 10.0412 9.44926C9.75005 9.19972 9.32321 9.19052 9.02161 9.42729L5.37384 12.2909L1.72606 9.4273C1.42446 9.19052 0.99762 9.19972 0.706493 9.44926Z" fill="#1E1F21"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.37316 -3.4752e-08C4.93407 -1.5559e-08 4.57813 0.355949 4.57813 0.795034L4.57813 11.9255C4.57813 12.3646 4.93407 12.7205 5.37316 12.7205C5.81224 12.7205 6.16819 12.3646 6.16819 11.9255L6.16819 0.795034C6.16819 0.355949 5.81224 -5.39451e-08 5.37316 -3.4752e-08Z" fill="#1E1F21"/>
      </svg>`;
    }
    scrollListener = () => {
      setTriggerPosition(window.scrollY);
      const sectionIndex = getNextSectionIndex(window.scrollY);
      if (!onlyTrigger) {
        list.style.transform = `translateY(${-16 * sectionIndex}px)`;
      }
      const colorSectionIndex = getColorSection(window.scrollY + window.innerHeight / 2);
      const color = colorSections[colorSectionIndex].getAttribute('data-section-color');
      document.body.style.backgroundColor = color;
    };
    window.addEventListener('scroll', scrollListener);
  },
  destroy() {
    window.removeEventListener('scroll', scrollListener);
  },
};

export default scrollSection;
