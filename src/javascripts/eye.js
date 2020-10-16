/* eslint-disable */
import * as THREE from 'three'
const d = document.createElement('div');
d.innerHTML = `<svg id="base-eye" class="eye" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" fill="black">
<clipPath id="lids">
  <path id="lids-path"
    stroke-linejoin="round" stroke-linecap="round"
    d="M 50 500 Q 500 0 950 500 Q 500 850 50 500"
  />
</clipPath>
<g clip-path="url(#lids)">
  <rect class="whites" width="1000" height="1000" fill="#fff"/>
  <g class="pupil-group">
    <circle class="pupil" cx="500" cy="500" r="150" fill="#000"/>
    <circle class="glint" cx="450" cy="450" r="20" fill="#fff"/>
  </g>
</g>
<use href="#lids-path" class="lids" stroke="#000" stroke-width="20" />
</svg>`
const baseObject = d.children[0];
const grid = document.getElementById("grid");
let eyes, eyeCenters;
let eyeDensity = 1;
let numEyesX, numEyesY;
const center = new THREE.Vector2();
const mousePos = new THREE.Vector2();
const PI = Math.PI;
let maxDist;
const maxEyeTravelX = 275;
const maxEyeTravelY = 100;

// init();

export default function init() {
  window.addEventListener("resize", throttled(handleResize));
  window.addEventListener("mousemove", throttled(handleMouseMove));
  handleResize();
}

function handleMouseMove(event) {
  mousePos.set(event.clientX, event.clientY);
  eyes.forEach((eye, i) => {
    const vecToMouse = new THREE.Vector2().subVectors(mousePos, eyeCenters[i]);
    const angle = vecToMouse.angle();
    const dist = mousePos.distanceTo(eyeCenters[i]);
    const distPercent = map(dist, 0, maxDist, 0, 1);
    const clampedMouseX = clamp(vecToMouse.x, maxEyeTravelX * -1, maxEyeTravelX);
    const clampedMouseY = clamp(vecToMouse.y, maxEyeTravelY * -1, maxEyeTravelY);
    const pupilX = map(clampedMouseX, 0, maxEyeTravelX, 0, maxEyeTravelX);
    const pupilY = map(clampedMouseY, 0, maxEyeTravelY, 0, maxEyeTravelY);
    const scale = map(dist, 0, maxDist, 0.5, 1.25);
    
    eye.style.setProperty("--pupil-x", pupilX);
    eye.style.setProperty("--pupil-y", pupilY);
    eye.style.setProperty("--scale", scale);
  });
}

function handleResize() {
  
  // recreate the grid and elements 
  const largeSide = Math.max(innerWidth, innerHeight);
  const size = Math.round(largeSide / eyeDensity);
  numEyesX = Math.ceil(innerWidth / size);
  numEyesY = Math.ceil(innerHeight / size);
  grid.style.setProperty("--num-columns", numEyesX);
  grid.style.setProperty("--num-rows", numEyesY);
  grid.innerHTML = "";
  generateArrowGrid();
  
  center.set(innerWidth * 0.5, innerHeight * 0.5);
  maxDist = center.length() * 2;
  
  // send a fake mouse event to trigger the initial point
  handleMouseMove({clientX: center.x, clientY: center.y});
}

function generateArrowGrid() {
  eyes = [];  
  eyeCenters = [];
  for (let i = 0; i < numEyesX * numEyesY; i += 1) {
    
    // add the eye to the grid
    const newArrow = baseObject.cloneNode(true);
    newArrow.id = `eye-${i}`;
    newArrow.setAttribute("class", "eye");
    grid.appendChild(newArrow);
    eyes.push(newArrow);
    
    // save its center point for use later
    const eyeRect = newArrow.getBoundingClientRect();
    const eyeCenter = new THREE.Vector2(
      eyeRect.left + (newArrow.clientWidth * 0.5),
      eyeRect.top + (newArrow.clientHeight * 0.5),
    );
    eyeCenters.push(eyeCenter);
  }
}

// USEFUL FUNCTIONS
function throttled(fn) {
  let didRequest = false;
  return param => {
    if (!didRequest) {
      requestAnimationFrame(() => {
        fn(param);
        didRequest = false;
      });
      didRequest = true;
    }
  };
}
function map(value, min1, max1, min2, max2) {
  return (value - min1) * (max2 - min2) / (max1 - min1) + min2;
}
function clamp (value, min = 0, max = 1) {
  return value <= min ? min : value >= max ? max : value;
}