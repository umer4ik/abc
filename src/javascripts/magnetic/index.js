/* eslint-disable no-new */
import ButtonCtrl from './buttonCtrl';

// initialize custom cursor
export default function init() {
  new ButtonCtrl(document.querySelector('.introduction__chart'));
}
