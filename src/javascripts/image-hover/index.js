/* eslint-disable no-new */
import Menu from './menu';

// menu (<nav> element)

// preload the images set as data attrs in the menu items
let menu;
const imageHover = {
  init() {
    const menuEl = document.querySelector('.list');
    const images = [];
    menuEl.querySelectorAll('.item__hidden-img').forEach((img) => {
      images.push(img.src);
    });
    menu = new Menu(menuEl, images);
  },
  destroy() {
    menu.destroy();
  },
};

export default imageHover;
