/* eslint-disable no-new */
import ButtonCtrl from './buttonCtrl';

let button;

const magnetic = {
  init() {
    button = new ButtonCtrl(document.querySelector('.introduction__chart'));
  },
  destroy() {
    button.destroy();
  },
};

export default magnetic;
