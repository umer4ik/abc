import $ from 'jquery';

const toScrollAnimationElement = (el) => {
  const element = el;
  element.showed = false;
  element.additionalOffset = 0;
  if (element.classList.contains('offset-100')) {
    element.additionalOffset = 100;
  }
  return element;
};

let docScroll = 0;
let innerHeight;

const getPageYScroll = () => {
  docScroll = window.pageYOffset || document.documentElement.scrollTop;
};

const getInnerHeight = () => {
  innerHeight = window.innerHeight;
};
window.addEventListener('scroll', getPageYScroll);
window.addEventListener('resize', getInnerHeight);

class ScrollAnimation {
  constructor(selector = '.animate-showing', showingClassName = 'animate-showing--showed') {
    this.selector = selector;
    this.showingClassName = showingClassName;
    this.scrollTarget = window;
    this.init();
  }

  requestRender() {
    this.lastFrame = requestAnimationFrame(() => this.render());
  }

  init() {
    this.DOM = { elements: Array.from(document.querySelectorAll(this.selector)).map(toScrollAnimationElement) };
    getPageYScroll();
    getInnerHeight();
    this.requestRender();
  }

  destroy() {
    if (this.lastFrame) {
      cancelAnimationFrame(this.lastFrame);
    }
  }

  render() {
    // console.log('render');
    [...this.DOM.elements].forEach((el) => {
      const element = el;
      if (element.showed) {
        return;
      }
      if (docScroll > $(element).offset().top - innerHeight + element.additionalOffset) {
        element.classList.add(this.showingClassName);
        element.showed = true;
      }
    });
    this.requestRender();
  }
}

let scrollAnimationInstance;

const scrollAnimation = {
  init() {
    if (scrollAnimationInstance) {
      scrollAnimationInstance.init();
    } else {
      scrollAnimationInstance = new ScrollAnimation();
    }
  },
  destroy() {
    if (scrollAnimationInstance) scrollAnimationInstance.destroy();
  },
};

export default scrollAnimation;
