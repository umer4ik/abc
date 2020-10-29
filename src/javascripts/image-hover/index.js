/* eslint-disable no-new */
import Menu from './menu';

// menu (<nav> element)

// preload the images set as data attrs in the menu items
let menu;
const imageHover = {
  init(images) {
    const menuEl = document.querySelector('.list');
    menu = new Menu(menuEl, images);
  },
  destroy() {
    menu.destroy();
  },
};

export default imageHover;
