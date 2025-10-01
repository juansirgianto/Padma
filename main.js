// main.js - Optimized

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://esm.run/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { LumaSplatsThree } from './libs/luma-web.module.js';
import { initCarousel } from './carousel.js';
import { createPins } from './pin.js';

initCarousel();

// DOM Elements
const toggleBtn = document.getElementById("toggleBtn");
const menu = document.getElementById("menu");
const chev = document.getElementById("chev");
const amenitiesToggle = document.getElementById('amenitiesToggle');
const amenitiesDropdownMenu = document.getElementById('amenitiesDropdownMenu');
const amenitiesChevron = document.getElementById('amenitiesChevron');

// State variables
let open = false;
let amenitiesDropdownOpen = false;

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3);
camera.position.set(0.58, 0.95, -0.56);

const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
scene.background = new THREE.Color(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
document.body.appendChild(renderer.domElement);

const canvas = renderer.domElement;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const { pins, pinPOIs } = createPins(scene);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 0.9; 
controls.maxDistance = 1.2;  

const maxY = 1.5;
const minY = 0.5;
controls.addEventListener('change', () => {
  camera.position.y = Math.min(maxY, Math.max(minY, camera.position.y));
});

// Luma Splats
const splats = new LumaSplatsThree({
    source: 'https://lumalabs.ai/capture/1855032b-de68-4fdd-adc9-b9935cef2a93',
    particleRevealEnabled: false
});
splats.position.set(-0.4, 0.5, 0.40);
scene.add(splats);

// const axesHelper = new THREE.AxesHelper( 10 );
// axesHelper.position.y = 0;
// scene.add( axesHelper );

// caminfo
// const camInfo = document.getElementById('cam-info');

// Area buttons configuration
const areaButtons = [
  { id: 'btn-1', cameraPosition: [0.65, 0.73, -0.80], cameraTarget: [0.28, 0, -0.41], descriptionId: 'pooldescription' },
  { id: 'btn-2', cameraPosition: [0.18, 0.68, -0.27], cameraTarget: [-0.35, 0, 0], descriptionId: 'housedescription' },
  { id: 'btn-3', cameraPosition: [-1.56, 0.77, 0.42], cameraTarget: [-1, 0, 0.59], descriptionId: 'gardendescription' },
  { id: 'btn-4', cameraPosition: [-0.83, 0.81, 0.87], cameraTarget: [-0.38, 0, 0.96], descriptionId: 'arrivaldescription' },
  { id: 'btn-5', cameraPosition: [-0.84, 0.79, 1.31], cameraTarget: [-0.70, 0, 0.90], descriptionId: 'archdescription' },
  { id: 'btn-6', cameraPosition: [0.58, 0.95, -0.56], cameraTarget: [0, 0, 0], descriptionId: null }
];

// Functions
function toggleAmenitiesDropdown() {
  amenitiesDropdownOpen = !amenitiesDropdownOpen;
  
  if (amenitiesDropdownOpen) {
    amenitiesDropdownMenu.style.maxHeight = amenitiesDropdownMenu.scrollHeight + 'px';
    amenitiesDropdownMenu.style.opacity = '1';
    
    if (amenitiesChevron) {
      amenitiesChevron.setAttribute('data-lucide', 'chevron-up');
      window.lucide?.createElement(amenitiesChevron);
    }
    
    amenitiesToggle.dataset.active = "true";
  } else {
    amenitiesDropdownMenu.style.maxHeight = '0px';
    amenitiesDropdownMenu.style.opacity = '0';
    
    if (amenitiesChevron) {
      amenitiesChevron.setAttribute('data-lucide', 'chevron-down');
      window.lucide?.createElement(amenitiesChevron);
    }
    
    amenitiesToggle.dataset.active = "false";
  }
}

function resetAllActiveStates() {
  const elementsToReset = [
    document.querySelector('#btn-6'),
    amenitiesToggle,
    document.querySelector('a[href="/surrounding/"]')
  ];
  
  elementsToReset.forEach(el => {
    if (el) el.dataset.active = "false";
  });
  
  document.querySelectorAll('.area-button').forEach(b => b.dataset.active = "false");
}

function moveCameraTo(position, lookAt = null, duration = 1000) {
  needsRender = true;
  if (isCameraAnimating) return;
  isCameraAnimating = true;
  
  const start = camera.position.clone();
  const end = new THREE.Vector3(...position);
  const startTarget = controls.target.clone();
  const endTarget = lookAt ? new THREE.Vector3(...lookAt) : startTarget;
  const startTime = performance.now();

  function animateCamera(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    camera.position.lerpVectors(start, end, t);
    controls.target.lerpVectors(startTarget, endTarget, t);
    needsRender = true;

    if (t < 1) {
      requestAnimationFrame(animateCamera);
    } else {
      isCameraAnimating = false;
    }
  }
  requestAnimationFrame(animateCamera);
}

// Event Listeners
if (window.lucide) window.lucide.createIcons();

// Main menu toggle
toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  open = !open;

  if (open) {
    menu.style.maxHeight = "none";
    menu.style.opacity = "1";
    chev.style.transform = "rotate(180deg)";
  } else {
    menu.style.maxHeight = "0px";
    menu.style.opacity = "0";
    chev.style.transform = "rotate(0deg)";
    if (amenitiesDropdownOpen) toggleAmenitiesDropdown();
  }
});

// Amenities toggle
amenitiesToggle.addEventListener('click', (e) => {
  e.preventDefault();
  resetAllActiveStates();
  toggleAmenitiesDropdown();
});

// Home button
document.querySelector('#btn-6').addEventListener('click', (e) => {
  e.preventDefault();
  resetAllActiveStates();
  e.target.closest('a').dataset.active = "true";
  
  if (amenitiesDropdownOpen) toggleAmenitiesDropdown();
  moveCameraTo([0.58, 0.95, -0.56], [0, 0, 0]);
  document.querySelectorAll('.description-box').forEach(d => d.style.display = 'none');
});

// Area buttons (optimized single loop)
areaButtons.slice(0, 5).forEach(({ id, cameraPosition, cameraTarget, descriptionId }) => {
  const button = document.querySelector(`#${id}`);
  if (button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Reset and set active states
      resetAllActiveStates();
      amenitiesToggle.dataset.active = "true";
      button.dataset.active = "true";
      
      // Camera and description
      moveCameraTo(cameraPosition, cameraTarget);
      document.querySelectorAll('.description-box').forEach(el => el.style.display = 'none');
      if (descriptionId) {
        const descEl = document.getElementById(descriptionId);
        if (descEl) descEl.style.display = 'block';
      }
    });
  }
});

// Close description buttons
document.querySelectorAll('.close-description').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.description-box').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.area-button').forEach(b => b.dataset.active = "false");
  });
});

// Surrounding link
document.querySelector('a[href="/surrounding/"]').addEventListener('click', () => {
  resetAllActiveStates();
  document.querySelector('a[href="/surrounding/"]').dataset.active = "true";
  if (amenitiesDropdownOpen) toggleAmenitiesDropdown();
});

// Render loop
let isCameraAnimating = false;
let needsRender = true;
let warmingUp = true;
const WARMUP_MS = 3000;
const warmUpEndAt = performance.now() + WARMUP_MS;

function renderLoop(){
  requestAnimationFrame(renderLoop);
  if (controls.update()) needsRender = true;
  if (warmingUp) {
    needsRender = true;
    if (performance.now() >= warmUpEndAt) warmingUp = false;
  }
  if (!needsRender) return;

// caminfo
//   if (camInfo) {
//     camInfo.textContent = `x: ${camera.position.x.toFixed(2)}, 
// y: ${camera.position.y.toFixed(2)}, 
// z: ${camera.position.z.toFixed(2)}`;
//   }
  renderer.render(scene, camera);
  needsRender = false;
}
renderLoop();

// Pin interactions
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(
    pins.map(p => p.children[0]).filter(c => c instanceof THREE.Sprite)
  );

  if (intersects.length > 0) {
    const clickedSprite = intersects[0].object;
    const pinPOI = pinPOIs.find(p => p.mesh === clickedSprite.parent);
    
    if (pinPOI) {
      // Open menu and dropdown
      if (!open) {
        open = true;
        menu.style.maxHeight = "none";
        menu.style.opacity = "1";
        chev.style.transform = "rotate(180deg)";
      }
      if (!amenitiesDropdownOpen) toggleAmenitiesDropdown();

      // Camera and description
      moveCameraTo(pinPOI.camera_position.toArray(), pinPOI.camera_target.toArray());
      needsRender = true;
      
      document.querySelectorAll('.description-box').forEach(d => d.style.display = 'none');
      const desc = document.getElementById(pinPOI.descriptionId);
      if (desc) desc.style.display = 'block';

      // Set active states
      document.querySelectorAll('.area-button').forEach(b => b.dataset.active = "false");
      const index = pinPOIs.indexOf(pinPOI);
      const targetBtn = document.querySelectorAll('.area-button')[index];
      if (targetBtn) targetBtn.dataset.active = "true";

      // Visual feedback
      clickedSprite.material.color.set(0xffffff);
    }
  }
});

// Pin hover effects
const pickables = pins.map(p => p.children[0]).filter(c => c instanceof THREE.Sprite);
const pointer = new THREE.Vector2();
let hoveredSprite = null;
let rafId = null;
let pendingPick = false;
let lastX = 0, lastY = 0;

raycaster.near = 0.1;
raycaster.far = 5.0;

canvas.addEventListener('pointermove', (event) => {
  if (controls.dragging || isCameraAnimating) return;
  if (Math.abs(event.clientX - lastX) < 2 && Math.abs(event.clientY - lastY) < 2) return;
  
  lastX = event.clientX; 
  lastY = event.clientY;

  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  if (pendingPick) return;
  pendingPick = true;

  rafId = requestAnimationFrame(() => {
    pendingPick = false;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(pickables, false);

    if (intersects.length > 0) {
      const sprite = intersects[0].object;
      if (hoveredSprite !== sprite) {
        if (hoveredSprite) hoveredSprite.material.color.setHex(0xffffff);
        sprite.material.color.setHex(0x757641);
        needsRender = true;
        hoveredSprite = sprite;
      }
      canvas.style.cursor = 'pointer';
    } else {
      if (hoveredSprite) hoveredSprite.material.color.setHex(0xffffff);
      hoveredSprite = null;
      canvas.style.cursor = 'default';
    }
  });
}, { passive: true });

// Cleanup and resize
window.addEventListener('blur', () => { 
  if (rafId) cancelAnimationFrame(rafId); 
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (open) menu.style.maxHeight = menu.scrollHeight + "px";
});