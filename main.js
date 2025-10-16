// main.js - Using @mkkellogg/gaussian-splats-3d

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import * as GS from 'https://unpkg.com/@mkkellogg/gaussian-splats-3d/build/gaussian-splats-3d.module.js';
import { initCarousel } from './carousel.js';
import { createPins } from './pin.js';

initCarousel();

// DOM Elements
const amenitiesToggle = document.getElementById('amenitiesToggle');
const amenitiesDropdownMenu = document.getElementById('amenitiesDropdownMenu');
const amenitiesChevron = document.getElementById('amenitiesChevron');

// Three.js Scene Setup
const threeScene = new THREE.Scene();
threeScene.background = new THREE.Color(0x606060);

// Axes Helper (optional, uncomment to debug)
// const axesHelper = new THREE.AxesHelper(10);
// threeScene.add(axesHelper);

// Gaussian Splats Viewer
const viewer = new GS.Viewer({
  antialiased: false,
  sharedMemoryForWorkers: false,
  initialCameraPosition: [-1.84, 2.04, 0.51],
  initialCameraLookAt: [0, 0, 0],
  threeScene,
  devicePixelRatio: Math.min(window.devicePixelRatio, 1.25),
  enablePointerLockControls: false,
  enableMouseControls: true,
});

// Pastikan canvas viewer ada di body dan di-style dengan benar
viewer.renderer.domElement.style.position = 'absolute';
viewer.renderer.domElement.style.top = '0';
viewer.renderer.domElement.style.left = '0';
viewer.renderer.domElement.style.width = '100%';
viewer.renderer.domElement.style.height = '100%';
viewer.renderer.domElement.style.display = 'block';
viewer.renderer.domElement.style.zIndex = '1'; // Di atas background, tapi di bawah UI

// Tambahkan z-index ke sidebar agar lebih tinggi dari canvas
const sidebar = document.getElementById('sidebar');
if (sidebar) sidebar.style.zIndex = '30';

// Pastikan description boxes juga punya z-index tinggi
document.querySelectorAll('.description-box').forEach(box => {
  box.style.zIndex = '30';
});

// Load Splat Scene - Ganti dengan path model .ply Anda
await viewer.addSplatScene('/models/padma_final.ply', {
  splatAlphaRemovalThreshold: 25,
  showLoadingUI: true,
  scale: [1, -1, -1],
  position: [0, 0, 0],
});

// Access camera and controls
const camera = viewer.camera;
const controls = viewer.controls;

// set rotasi
controls.rotateSpeed = -1;

// Configure controls
controls.minDistance = 1;
controls.maxDistance = 4;
controls.enableDamping = true;

const maxY = 4;
const minY = 0.1;
controls.addEventListener('change', () => {
  camera.position.y = Math.min(maxY, Math.max(minY, camera.position.y));
});

// Setup raycaster and pins
const canvas = viewer.renderer.domElement;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const { pins, pinPOIs } = createPins(threeScene);

// Start viewer
viewer.start();

// Camera info display (optional, uncomment to debug)
// const camInfo = document.createElement('div');
// camInfo.style.cssText = 'position:absolute;top:10px;left:10px;color:#fff;font:12px monospace;background:rgba(0,0,0,.4);padding:6px 10px;border-radius:6px;z-index:1000';
// document.body.appendChild(camInfo);
// function updateCameraInfo() {
//   const pos = camera.position;
//   camInfo.innerHTML = `x: ${pos.x.toFixed(2)}, y: ${pos.y.toFixed(2)}, z: ${pos.z.toFixed(2)}`;
//   requestAnimationFrame(updateCameraInfo);
// }
// updateCameraInfo();

// Area buttons configuration
const areaButtons = [
  { id: 'btn-1', cameraPosition: [-0.85, 0.80 , 1.47], cameraTarget: [0.15, 0, 1.2], descriptionId: 'pooldescription' },
  { id: 'btn-2', cameraPosition: [-0.85, 1.14 , 1.47], cameraTarget: [0.45, 0, 1.1], descriptionId: 'housedescription' },
  { id: 'btn-3', cameraPosition: [0.26, 0.80, -0.01], cameraTarget: [1.7, 0, 0], descriptionId: 'gardendescription' },
  { id: 'btn-4', cameraPosition: [-0.83, 0.81, 0.87], cameraTarget: [-0.38, 0, 0.96], descriptionId: 'arrivaldescription' },
  { id: 'btn-5', cameraPosition: [-0.84, 0.79, 1.31], cameraTarget: [-0.70, 0, 0.90], descriptionId: 'archdescription' },
];

function resetAllActiveStates() {
  const elementsToReset = [
    document.querySelector('#btn-6'),
    document.querySelector('a[href="/Padma/surrounding/"]')
  ];
  
  elementsToReset.forEach(el => {
    if (el) el.dataset.active = "false";
  });
  
  document.querySelectorAll('.area-button').forEach(b => b.dataset.active = "false");
}

let isCameraAnimating = false;

function moveCameraTo(position, lookAt = null, duration = 1000) {
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
    controls.update();

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

// Amenities toggle
amenitiesToggle.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Reset states
  resetAllActiveStates();
  
  // Set Properties button active
  amenitiesToggle.dataset.active = "true";
  
  // Toggle dropdown
  window.toggleAmenitiesDropdown();
  
  // Tutup description boxes
  document.querySelectorAll('.description-box').forEach(d => d.style.display = 'none');
});

// Home button
document.querySelector('#btn-6').addEventListener('click', (e) => {
  e.preventDefault();
  resetAllActiveStates();
  e.target.closest('a').dataset.active = "true";
  
  if (window.amenitiesOpen) window.toggleAmenitiesDropdown();
  moveCameraTo([-1.84, 2.04, 0.51], [0, 0, 0]);
  document.querySelectorAll('.description-box').forEach(d => d.style.display = 'none');
});

// Area buttons
areaButtons.slice(0, 5).forEach(({ id, cameraPosition, cameraTarget, descriptionId }) => {
  const button = document.querySelector(`#${id}`);
  if (button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      resetAllActiveStates();
      amenitiesToggle.dataset.active = "true";
      button.dataset.active = "true";
      
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
document.querySelector('a[href="/Padma/surrounding/"]').addEventListener('click', () => {
  resetAllActiveStates();
  document.querySelector('a[href="/Padma/surrounding/"]').dataset.active = "true";
  if (window.amenitiesOpen) window.toggleAmenitiesDropdown();
});

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
      if (!window.menuOpen) {
        window.toggleMainMenu(true);
      }
      if (!window.amenitiesOpen) window.toggleAmenitiesDropdown();

      moveCameraTo(pinPOI.camera_position.toArray(), pinPOI.camera_target.toArray());
      
      document.querySelectorAll('.description-box').forEach(d => d.style.display = 'none');
      const desc = document.getElementById(pinPOI.descriptionId);
      if (desc) desc.style.display = 'block';

      document.querySelectorAll('.area-button').forEach(b => b.dataset.active = "false");
      const index = pinPOIs.indexOf(pinPOI);
      const targetBtn = document.querySelectorAll('.area-button')[index];
      if (targetBtn) targetBtn.dataset.active = "true";

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
  if (isCameraAnimating) return;
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

// Cleanup
window.addEventListener('blur', () => { 
  if (rafId) cancelAnimationFrame(rafId); 
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  viewer.renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.menuOpen) {
    const menu = document.getElementById('menu');
    if (menu) menu.style.maxHeight = menu.scrollHeight + "px";
  }
});