const rail = document.querySelector('.lp__scroll-rail');
const trigger = document.querySelector('.lp__scroll-trigger');
const title = document.querySelector('#lp-title');
const list = document.createElement('div');
list.className = 'lp__sections-list';
const backToTop = document.createElement('div');
backToTop.innerHTML = 'Back to top';
backToTop.setAttribute('data-cursor-class', 'hover-link');
const arrowsSection = document.querySelector('.lp__sections-list--arrow');
const backToTopArrow = document.querySelector('.lp__arrow--flip');
const pointDown = document.querySelector('.lp__point');

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
    if (offsetTop > scrollTop - window.innerHeight / 2) {
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

const onBackToTopClick = () => {
  window.scrollTo(0, 0);
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
    arrowsSection.style.transform = 'translateY(0)';
    updateSections();
    document.body.style.backgroundColor = colorSections[0].getAttribute('data-section-color');
    const setTriggerPosition = (scrollTop) => {
      trigger.style.transform = `translateX(${-scrollTop * ratio}px)`;
    };
    setTriggerPosition(window.scrollY);
    pointDown.classList.remove('lp__point--up');
    title.innerHTML = '';
    list.innerHTML = '';
    if (!onlyTrigger) {
      for (let i = 0; i < sections.length; i += 1) {
        const section = sections[i];
        list.innerHTML += `<div>${section.getAttribute('data-section')}</div>`;
      }
    } else {
      list.innerHTML = `<svg class="lp__arrow" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.706493 9.44926C0.334111 9.76844 0.331865 10.3438 0.701744 10.6659L5.17903 14.5646C5.2907 14.6618 5.45697 14.6618 5.56865 14.5646L10.0459 10.6659C10.4158 10.3438 10.4136 9.76844 10.0412 9.44926C9.75005 9.19972 9.32321 9.19052 9.02161 9.42729L5.37384 12.2909L1.72606 9.4273C1.42446 9.19052 0.99762 9.19972 0.706493 9.44926Z" fill="#1E1F21"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.37316 -3.4752e-08C4.93407 -1.5559e-08 4.57813 0.355949 4.57813 0.795034L4.57813 11.9255C4.57813 12.3646 4.93407 12.7205 5.37316 12.7205C5.81224 12.7205 6.16819 12.3646 6.16819 11.9255L6.16819 0.795034C6.16819 0.355949 5.81224 -5.39451e-08 5.37316 -3.4752e-08Z" fill="#1E1F21"/>
      </svg>`;
    }
    list.appendChild(backToTop);
    title.appendChild(list);
    scrollListener = () => {
      setTriggerPosition(window.scrollY);
      const sectionIndex = getNextSectionIndex(window.scrollY);
      if (!onlyTrigger) {
        list.style.transform = `translateY(${-16 * sectionIndex}px)`;
        if (window.scrollY > document.body.scrollHeight - window.innerHeight - 100) {
          list.style.transform = `translateY(${-16 * sections.length}px)`;
        }
      } else if (window.scrollY > document.body.scrollHeight - window.innerHeight - 100) {
        list.style.transform = 'translateY(-16px)';
      } else {
        list.style.transform = 'none';
      }
      const colorSectionIndex = getColorSection(window.scrollY + window.innerHeight / 2);
      const color = colorSections[colorSectionIndex].getAttribute('data-section-color');
      document.body.style.backgroundColor = color;
      if (window.scrollY + window.innerHeight > document.body.offsetHeight - 100) {
        arrowsSection.style.transform = 'translateY(-14px)';
        pointDown.classList.add('lp__point--up');
      } else {
        arrowsSection.style.transform = 'translateY(0)';
        pointDown.classList.remove('lp__point--up');
      }
    };
    window.addEventListener('scroll', scrollListener);
    backToTop.addEventListener('click', onBackToTopClick);
    backToTopArrow.addEventListener('click', onBackToTopClick);
  },
  destroy() {
    list.style.transform = 'none';
    backToTop.removeEventListener('click', onBackToTopClick);
    backToTopArrow.removeEventListener('click', onBackToTopClick);
    window.removeEventListener('scroll', scrollListener);
  },
};

export default scrollSection;
