/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-multi-assign */
/* eslint-disable no-new */

const MathUtils = {
  // map number x from range [a, b] to [c, d]
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  // linear interpolation
  lerp: (a, b, n) => (1 - n) * a + n * b,
  // Random float
  getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
};

// body element
const { body } = document;

// calculate the viewport size
// let winsize;
// const calcWinsize = () => {
//   winsize = { width: window.innerWidth, height: window.innerHeight }
// };
// calcWinsize();
// // and recalculate on resize
// window.addEventListener('resize', calcWinsize);

// scroll position
let docScroll;
// for scroll speed calculation
// let lastScroll;
// scroll position update function
const getPageYScroll = () => {
  docScroll = window.pageYOffset || document.documentElement.scrollTop;
};
window.addEventListener('scroll', getPageYScroll);

// SmoothScroll
class SmoothScroll {
  constructor() {
    // the <main> element
    this.DOM = { main: document.querySelector('main') };
    // the scrollable element
    // we translate this element when scrolling (y-axis)
    this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]');
    // the items on the page
    this.items = [];
    // here we define which property will change as we scroll the page
    // in this case we will be translating on the y-axis
    // we interpolate between the previous and current value to achieve the smooth scrolling effect
    this.renderedStyles = {
      translationY: {
        // interpolated value
        previous: 0,
        // current value
        current: 0,
        // amount to interpolate
        ease: 0.1,
        // current value setter
        // in this case the value of the translation will be the same like the document scroll
        setValue: () => docScroll,
      },
    };
    this.init();
  }

  init() {
    // set the body's height
    this.setSize();
    // set the initial values
    this.update();
    // the <main> element's style needs to be modified
    this.style();
    // init/bind events
    this.initEvents();
    // start the render loop
    this.requestRender();
  }

  requestRender() {
    this.lastFrame = requestAnimationFrame(() => this.render());
  }

  destroy() {
    if (this.lastFrame) {
      cancelAnimationFrame(this.lastFrame);
    }
  }

  update() {
    // sets the initial value (no interpolation) - translate the scroll value
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
    }
    // translate the scrollable element
    this.layout();
  }

  layout() {
    this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.renderedStyles.translationY.previous}px,0)`;
  }

  setSize() {
    // set the heigh of the body in order to keep the scrollbar on the page
    body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
  }

  style() {
    // the <main> needs to "stick" to the screen and not scroll
    // for that we set it to position fixed and overflow hidden
    this.DOM.main.style.position = 'fixed';
    this.DOM.main.style.width = this.DOM.main.style.height = '100%';
    this.DOM.main.style.top = this.DOM.main.style.left = 0;
    this.DOM.main.style.overflow = 'hidden';
  }

  initEvents() {
    // on resize reset the body's height
    window.addEventListener('resize', () => this.setSize());
  }

  render() {
    // Get scrolling speed
    // Update lastScroll
    // lastScroll = docScroll;

    // update the current and interpolated values
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].setValue();
      this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
    }
    // and translate the scrollable element
    this.layout();

    // for every item
    for (const item of this.items) {
      // if the item is inside the viewport call it's render function
      // this will update item's styles, based on the document scroll value and the item's position on the viewport
      if (item.isVisible) {
        if (item.insideViewport) {
          item.render();
        } else {
          item.insideViewport = true;
          item.update();
        }
      } else {
        item.insideViewport = false;
      }
    }

    // loop..
    this.requestRender();
  }
}
let smoothScrollInstance;
const initScroll = () => {
  getPageYScroll();
  if (!smoothScrollInstance) smoothScrollInstance = new SmoothScroll();
  else smoothScrollInstance.init();
};

const smoothScroll = {
  init() {
    initScroll();
  },
  destroy() {
    // if (smoothScrollInstance) smoothScrollInstance.destroy();
  },
};

export default smoothScroll;
