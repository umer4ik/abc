/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { gsap } from 'gsap';
import { EventEmitter } from 'events';
import {
  lerp,
  getMousePos,
  // calcWinsize,
  distance,
} from './utils';

// body color

// Calculate the viewport size
// let winsize = calcWinsize();
// window.addEventListener('resize', () => { winsize = calcWinsize(); });

// Track the mouse position
let mousepos = { x: 0, y: 0 };
window.addEventListener('mousemove', (ev) => { mousepos = getMousePos(ev); });

export default class ButtonCtrl extends EventEmitter {
  constructor(el) {
    super();
    // DOM elements
    // el: main button
    // text: inner text element
    this.DOM = { el };
    // this.DOM.text = this.DOM.el.querySelector('.button__text');
    // this.DOM.textinner = this.DOM.el.querySelector('.button__text-inner');
    this.DOM.deco = this.DOM.el.querySelector('svg');
    // this.DOM.filler = this.DOM.deco.querySelector('.button__deco-filler');
    // amounts the button will translate/scale
    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.1 },
      ty: { previous: 0, current: 0, amt: 0.1 },
      scale: { previous: 1, current: 1, amt: 0.2 },
    };

    // button state (hover)
    this.state = {
      hover: false,
    };
    // calculate size/position
    this.calculateSizePosition();
    // init events
    this.initEvents();
    // loop fn
    requestAnimationFrame(() => this.render());
  }

  calculateSizePosition() {
    // size/position
    this.rect = this.DOM.el.getBoundingClientRect();
    // the movement will take place when the distance from the mouse to the center of the button is lower than this value
    this.distanceToTrigger = this.rect.width * 1.5;
  }

  initEvents() {
    this.onResize = () => this.calculateSizePosition();
    window.addEventListener('resize', this.onResize);
  }

  render() {
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => this.render());
      this.DOM.el.style.transform = 'none';
      this.DOM.deco.style.transform = 'none';
      return;
    }
    // calculate the distance from the mouse to the center of the button
    const distanceMouseButton = distance(mousepos.x, mousepos.y, this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2);
    // new values for the translations and scale
    let x = 0;
    let y = 0;

    if (distanceMouseButton < this.distanceToTrigger) {
      if (!this.state.hover) {
        this.enter();
      }
      x = (mousepos.x - (this.rect.left + this.rect.width / 2)) * 0.3;
      y = (mousepos.y - (this.rect.top + this.rect.height / 2)) * 0.3;
    } else if (this.state.hover) {
      this.leave();
    }

    this.renderedStyles.tx.current = x;
    this.renderedStyles.ty.current = y;

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
    }

    this.DOM.el.style.transform = `translate3d(${this.renderedStyles.tx.previous}px, ${this.renderedStyles.ty.previous}px, 0) scale(${this.renderedStyles.scale.previous})`;
    // this.DOM.text.style.transform = `translate3d(${-this.renderedStyles.tx.previous * 0.2}px, ${-this.renderedStyles.ty.previous * 0.2}px, 0)`;
    this.DOM.deco.style.transform = `translate3d(${-this.renderedStyles.tx.previous}px, ${-this.renderedStyles.ty.previous}px, 0)`;

    requestAnimationFrame(() => this.render());
  }

  enter() {
    this.emit('enter');
    this.state.hover = true;

    this.DOM.el.classList.add('hover');
    // document.body.classList.add('active');

    this.renderedStyles.scale.current = 1.1;

    // gsap.killTweensOf(this.DOM.filler);
    // gsap.killTweensOf(this.DOM.textinner);
    gsap.killTweensOf(document.body);

    gsap
      .timeline();
    // .to(document.body, 0.2);
    // .to(this.DOM.filler, 0.5, {
    //   ease: 'Power3.easeOut',
    //   startAt: { y: '75%' },
    //   y: '0%',
    // }, 0)
    // .to(this.DOM.textinner, 0.4, {
    //   ease: 'Expo.easeOut',
    //   scale: 0.8,
    // }, 0);
  }

  leave() {
    this.emit('leave');
    this.state.hover = false;

    this.DOM.el.classList.remove('hover');
    // document.body.classList.remove('active');

    this.renderedStyles.scale.current = 1;

    gsap.killTweensOf(document.body);
    // gsap.killTweensOf(this.DOM.filler);

    gsap
      .timeline();
    // .to(document.body, 0.2);
    // .to(this.DOM.filler, 0.4, {
    //   ease: 'Power3.easeOut',
    //   y: '-75%',
    // }, 0)
    // .to(this.DOM.textinner, 0.4, {
    //   ease: 'Expo.easeOut',
    //   scale: 1,
    // }, 0);
  }
}
