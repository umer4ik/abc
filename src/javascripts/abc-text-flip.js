function makeWord(word, slices, color = 'white', offset = 0, className) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('flip-wrapper');
  const container = document.querySelector('#abc-container');
  container.appendChild(wrapper);

  const template = document.createElement('div');
  template.classList.add('flip-template');
  template.textContent = word;
  wrapper.appendChild(template);

  const sliceArray = [];

  while (sliceArray.length < slices) {
    const slice = document.createElement('div');
    slice.classList.add('flip-slice');
    slice.classList.add(`flip-slice-${sliceArray.length}`);
    if (className) slice.classList.add(className);
    slice.style.color = color;
    slice.style.animationDelay = `${0.1 * sliceArray.length + offset}s`;
    const mask = document.createElement('div');
    mask.classList.add('flip-mask');
    mask.style.height = `${100 / slices}%`;
    mask.style.top = `${(sliceArray.length / slices) * 100}%`;
    slice.appendChild(mask);
    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = word;
    content.style.transform = `translate3d(0, -${`${(sliceArray.length / slices) * 100}%`}, 0)`;
    mask.appendChild(content);
    wrapper.appendChild(slice);
    sliceArray.push(slice);
  }
}

export default () => {
  makeWord('ABC', 10);
  makeWord('ABC', 10, 'white', 0, 'opposite');
};
