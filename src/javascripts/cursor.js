export default () => {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-drag');
  cursor.innerHTML = `
    <div class="cursor-drag__inner">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="39" transform="rotate(-90 40 40)" fill="#1E1F21" />
        <ellipse rx="2" ry="2" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 60 40)" fill="white" />
        <ellipse rx="2" ry="2" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 21 40)" fill="white" />
      </svg>
    </div>
    <div class="cursor-drag__circle-copy"></div>
  `;

  document.body.appendChild(cursor);

  const cursorCircle = cursor.querySelector('.cursor-drag__inner');

  const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
  const pos = { x: 0, y: 0 }; // cursor's coordinates
  const speed = 0.1; // between 0 and 1

  const updateCoordinates = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  let rotateEnabled = true;

  window.addEventListener('mousemove', updateCoordinates);

  function getAngle(diffX, diffY) {
    return (Math.atan2(diffY, diffX) * 180) / Math.PI;
  }

  function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
      diffX * diffX + diffY * diffY,
    );
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
  }

  const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = `scale(${1 + squeeze}, ${1 - squeeze})`;
    const rotate = `rotate(${angle}deg)`;
    const translate = `translate3d(${pos.x}px ,${pos.y}px, 0)`;

    cursor.style.transform = translate;
    if (rotateEnabled) {
      cursorCircle.style.transform = rotate + scale;
    } else {
      cursorCircle.style.transform = 'none';
    }
  };

  function loop() {
    updateCursor();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // cursor modifiers
  document.body.addEventListener('mouseover', (e) => {
    if (e.target.matches('[data-cursor-class]')) {
      rotateEnabled = false;
      const className = e.target.getAttribute('data-cursor-class');
      cursor.classList.add(className);
    }
  });
  document.body.addEventListener('mouseout', (e) => {
    if (e.target.matches('[data-cursor-class]')) {
      rotateEnabled = true;
      const className = e.target.getAttribute('data-cursor-class');
      cursor.classList.remove(className);
    }
  });
};
