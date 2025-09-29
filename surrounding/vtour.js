import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';

// Helper: buat elemen marker foto bulat + tooltip
function createCircleMarker(imgSrc, label) {
    const wrap = document.createElement('div');
    wrap.style.cssText = `
    width: 76px; height: 76px; border-radius: 9999px; overflow: hidden;
    box-shadow: 0 12px 28px rgba(0,0,0,.35);
    border: 3px solid #fff;
    position: relative;
    cursor: pointer;
    transform: translateZ(0);
    background: #000;
    `;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = label;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    wrap.appendChild(img);

    const tip = document.createElement('div');
    tip.textContent = label;
    tip.style.cssText = `
    position:absolute; bottom: calc(100% + 10px); left:50%; transform:translateX(-50%);
    background: rgba(46,48,71,.95); color:#fff; padding:6px 10px; border-radius:9999px;
    white-space:nowrap; font-size:12px; font-weight:600; opacity:0; pointer-events:none;
    transition: opacity .25s;
    `;
    wrap.appendChild(tip);

    const caret = document.createElement('div');
    caret.style.cssText = `
    position:absolute; top: -6px; left:50%; transform:translateX(-50%);
    width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;
    border-top:6px solid rgba(46,48,71,.95);
    `;
    tip.appendChild(caret);

    wrap.addEventListener('mouseenter', () => (tip.style.opacity = '1'));
    wrap.addEventListener('mouseleave', () => (tip.style.opacity = '0'));

    return wrap;
}

// util deg string (PSV v5 menerima "deg" string atau radian number)
const deg = (v) => `${v}deg`;

// ------- INIT VIEWER + PLUGIN -------
const container = document.getElementById('viewer');
const viewer = new Viewer({
    container,
    defaultZoomLvl: 0,
    navbar: ['fullscreen'],
    plugins: [MarkersPlugin],
});

const markers = viewer.getPlugin(MarkersPlugin);

// ------- DEFINISI SCENE -------
/** @typedef {'entrance'|'studyroom'|'kitchen'|'kitchenpatio'|'patio'|'lounge'|'bedroom'|'balcony'|'bathroom'} SceneId */

/** @type {Record<SceneId, { panorama: string, markers: Array<{id:string,to:SceneId,img:string,label:string,position:{yaw:string|number,pitch:string|number}}>} >} */
const scenes = {
    entrance: {
    panorama: '/vtour/ENTRANCE_.jpg',
    markers: [
      { id:'to-study',   to:'studyroom', img:'/vtour/study.jpg',   label:'Study',   position:{ yaw:deg(75),  pitch:deg(-10) } },
      { id:'to-kitchen', to:'kitchen',   img:'/vtour/kitchen.jpg', label:'Kitchen', position:{ yaw:deg(12),  pitch:deg(-6) } },
      { id:'to-bedroom', to:'bedroom',   img:'/vtour/bedroom.jpg', label:'Bedroom', position:{ yaw:deg(-6),  pitch:deg(23) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Entrance',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/ENTRANCE_.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/ENTRANCE_.jpg',
        '/vtour/study.jpg',
        '/vtour/bedroom.jpg',
        ]
    }
  },
    studyroom: {
    panorama: '/vtour/study.jpg',
    markers: [
        { id: 'back-entrance', to: 'entrance', img: ' /vtour/ENTRANCE_.jpg', label: 'Entrance', position: { yaw: deg(-86), pitch: deg(-10) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Study Room',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/study.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/study.jpg',
        '/vtour/ENTRANCE_.jpg',
        ]
    }
    },
    kitchen: {
    panorama: '/vtour/kitchen.jpg',
    markers: [
        { id: 'back-entrance',  to: 'entrance',     img: ' /vtour/ENTRANCE_.jpg',     label: 'Entrance',     position: { yaw: deg(-200), pitch: deg(-8) } },
        { id: 'to-kitchenpatio',to: 'kitchenpatio', img: ' /vtour/kitchenpatio.jpg', label: 'Kitchen Patio', position: { yaw: deg(-17),  pitch: deg(-6) } },
        { id: 'to-lounge',      to: 'lounge',       img: ' /vtour/lounge.jpg',       label: 'Lounge',        position: { yaw: deg(-100), pitch: deg(-6) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Kitchen',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/kitchen.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/kitchen.jpg',
        '/vtour/lounge.jpg',
        '/vtour/kitchentopatio.jpg',
        '/vtour/entrance.jpg',
        ]
    }
    },
    kitchenpatio: {
    panorama: '/vtour/kitchenpatio.jpg',
    markers: [
        { id: 'back-entrance', to: 'entrance', img: ' /vtour/ENTRANCE_.jpg', label: 'Entrance', position: { yaw: deg(149), pitch: deg(-5) } },
        { id: 'to-patio',      to: 'patio',    img: ' /vtour/patio.jpg',    label: 'Patio',    position: { yaw: deg(12),  pitch: deg(-6) } },
        { id: 'to-lounge',     to: 'lounge',   img: ' /vtour/lounge.jpg',   label: 'Lounge',   position: { yaw: deg(183), pitch: deg(-6) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Kitchen to Patio',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/kitchenpatio.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/kitchenpatio.jpg',
        '/vtour/kitchen.jpg',
        '/vtour/lounge.jpg',
        ]
    }
    },
    patio: {
    panorama: '/vtour/patio.jpg',
    markers: [
        { id: 'to-kitchenpatio', to: 'kitchenpatio', img: '/vtour/kitchenpatio.jpg', label: 'Kitchen Patio', position: { yaw: deg(115), pitch: deg(-12) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Patio',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/patio.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/patio.jpg',
        '/vtour/kitchenpatio.jpg',
        ]
    }
    },
    lounge: {
    panorama: '/vtour/lounge.jpg',
    markers: [
        { id: 'to-kitchen', to: 'kitchen', img: ' /vtour/kitchen.jpg', label: 'Kitchen', position: { yaw: deg(75), pitch: deg(-10) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Lounge',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/lounge.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/lounge.jpg',
        '/vtour/kitchen.jpg',
        ]
    }
    },
    bedroom: {
    panorama: '/vtour/bedroom.jpg',
    markers: [
        { id: 'back-entrance', to: 'entrance', img: ' /vtour/ENTRANCE_.jpg', label: 'Entrance', position: { yaw: deg(-189), pitch: deg(-17) } },
        { id: 'to-balcony',    to: 'balcony',  img: ' /vtour/balcony.jpg',  label: 'Balcony',  position: { yaw: deg(-12),  pitch: deg(-11) } },
        { id: 'to-bathroom',   to: 'bathroom', img: ' /vtour/bathroom.jpg', label: 'Bathroom', position: { yaw: deg(-132), pitch: deg(-11) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Bedroom',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/bedroom.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/bedroom.jpg',
        '/vtour/balcony.jpg',
        '/vtour/entrance.jpg',
        '/vtour/bathroom.jpg',
        ]
    }
    },
    balcony: {
    panorama: '/vtour/balcony.jpg',
    markers: [
        { id: 'to-bedroom', to: 'bedroom', img: ' /vtour/bedroom.jpg', label: 'Bedroom', position: { yaw: deg(-37), pitch: deg(-12) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Balcony',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/balcony.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/balcony.jpg',
        '/vtour/bedroom.jpg',
        ]
    }
    },
    bathroom: {
    panorama: '/vtour/bathroom.jpg',
    markers: [
        { id: 'to-bedroom', to: 'bedroom', img: ' /vtour/bedroom.jpg', label: 'Bedroom', position: { yaw: deg(160), pitch: deg(-12) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Bathroom',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: '/vtour/bathroom.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        '/vtour/bathroom.jpg',
        '/vtour/bedroom.jpg',
        ]
    }
    },
};

// ------- FUNGSI GANTI SCENE -------
let currentSceneId = null;

async function switchScene(sceneId) {
  const scene = scenes[sceneId];
  if (!scene) return;

  // (optional) onLeave sebelumnya
  if (currentSceneId && scenes[currentSceneId]?.onLeave) {
    scenes[currentSceneId].onLeave();
  }

  markers.clearMarkers();
  await viewer.setPanorama(scene.panorama, { transition: true });

  for (const mk of scene.markers) {
    const el = createCircleMarker(mk.img, mk.label);
    el.dataset.to = mk.to;
    markers.addMarker({
      id: mk.id,
      element: el,
      position: mk.position,
      size: { width: 76, height: 76 },
      anchor: 'center center',
      zIndex: 10,
      tooltip: mk.label,
    });
  }

  // === Render info card khusus scene ini ===
  renderSceneCard(scene.info);

  // (optional) onEnter
  scene.onEnter?.();

  currentSceneId = sceneId;

  setActiveSceneButton(sceneId);
}

// Klik marker → pindah scene
markers.addEventListener('select-marker', (e) => {
    const el = e.marker?.config?.element ?? null;
    const to = el?.dataset?.to;
    if (to) switchScene(to);
});

// Mulai dari scene 'entrance'
switchScene('entrance');

// (Opsional) cleanup saat keluar halaman
window.addEventListener('beforeunload', () => viewer.destroy());

// ===== Ambil elemen card sekali =====
const cardRoot    = document.getElementById('sceneCard');
const cardImg     = document.getElementById('sceneCardImg');
const cardTag     = document.getElementById('sceneCardTag');
const cardTitle   = document.getElementById('sceneCardTitle');
const cardDesc    = document.getElementById('sceneCardDesc');
const cardBullets = document.getElementById('sceneCardBullets');
const cardCta     = document.getElementById('sceneCardCta');
const cardClose   = document.getElementById('sceneCardClose');

// (tambahkan di HTML kamu)
// <button id="openCardBtn" class="fixed right-2 top-2 px-3 py-1.5 bg-[#97864E] text-white rounded-lg shadow hidden">Open Desc</button>
const openCardBtn = document.getElementById('openCardBtn');

// ===== State =====
// - isVisible: kondisi aktual di layar
// - userHidden: user menekan close secara sadar → jangan auto-show pada scene berikutnya
let isVisible = false;
let userHidden = false;

function applyVisible(v) {
  if (!cardRoot) return;
  isVisible = v;
  if (v) {
    cardRoot.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
    openCardBtn?.classList.add('hidden');
    // aksesibilitas
    cardRoot.setAttribute('aria-hidden', 'false');
  } else {
    cardRoot.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
    openCardBtn?.classList.remove('hidden');
    cardRoot.setAttribute('aria-hidden', 'true');
  }
}

function hideCard({ byUser = false } = {}) {
  if (byUser) userHidden = true;
  applyVisible(false);
}

function showCard({ force = false } = {}) {
  // Jika user pernah menutup manual, jangan auto-show kecuali dipaksa
  if (userHidden && !force) return;
  userHidden = false;
  applyVisible(true);
}

/**
 * Render konten card untuk suatu scene.
 * @param {Object|null|undefined} info - metadata scene (tag,title,desc,img,bullets,cta)
 */

let currentInfo = null;
function renderSceneCard(info) {
  if (!cardRoot) return;

  // Jika scene ini tidak punya info → sembunyikan card
  if (!info) {
    hideCard();
    return;
  }

  // Tag
  cardTag.textContent = info.tag ?? '';

  // Title & Desc
  cardTitle.textContent = info.title ?? '';
  cardDesc.textContent  = info.desc ?? '';

  // Image (opsional)
  if (info.img) {
    cardImg.src = info.img;
    cardImg.classList.remove('hidden');
  } else {
    cardImg.classList.add('hidden');
  }

  // Bullets
  cardBullets.innerHTML = '';
  if (Array.isArray(info.bullets) && info.bullets.length) {
    for (const b of info.bullets) {
      const li = document.createElement('li');
      li.textContent = b;
      cardBullets.appendChild(li);
    }
    cardBullets.classList.remove('hidden');
  } else {
    cardBullets.classList.add('hidden');
  }

  currentInfo = info;

  // CTA
  if (info.cta && Array.isArray(info.gallery) && info.gallery.length) {
    cardCta.textContent = info.cta.label || 'See Gallery';
    cardCta.removeAttribute('href');   // jangan navigate
    cardCta.removeAttribute('target');
    cardCta.classList.remove('hidden');

    // RE-BIND handler ke gallery terbaru
    cardCta.onclick = (e) => {
      e.preventDefault();
      openGallery(currentInfo.gallery, 0);
    };
  } else {
    cardCta.classList.add('hidden');
    cardCta.onclick = null;
  }

  showCard();
}

// === Events ===
cardClose?.addEventListener('click', () => hideCard({ byUser: true }));
openCardBtn?.addEventListener('click', () => showCard({ force: true }));

// Keyboard: Esc untuk close, 'i' untuk toggle cepat
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isVisible) {
    hideCard({ byUser: true });
  } else if ((e.key === 'i' || e.key === 'I')) {
    if (isVisible) {
      hideCard({ byUser: true });
    } else {
      showCard({ force: true });
    }
  }
});

// ===== Gallery modal state =====
const galleryModal = document.getElementById('galleryModal');
const galImage     = document.getElementById('galImage');
const galPrev      = document.getElementById('galPrev');
const galNext      = document.getElementById('galNext');
const galClose     = document.getElementById('galClose');
const galDots      = document.getElementById('galDots');

let galImages = [];
let galIndex  = 0;
let galOpen   = false;

function renderDots() {
  galDots.innerHTML = '';
  galImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'w-2.5 h-2.5 rounded-full ' + (i === galIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70');
    dot.addEventListener('click', () => showImage(i));
    galDots.appendChild(dot);
  });
}

function showImage(i) {
  galIndex = (i + galImages.length) % galImages.length;
  galImage.src = galImages[galIndex];
  renderDots();
}

function openGallery(images, start = 0) {
  if (!Array.isArray(images) || images.length === 0) return;
  galImages = images;
  galIndex = start;
  showImage(galIndex);
  galleryModal.classList.remove('hidden');
  galleryModal.classList.add('flex');   // pakai flex centering
  document.body.style.overflow = 'hidden';
  galOpen = true;
}

function closeGallery() {
  galleryModal.classList.add('hidden');
  galleryModal.classList.remove('flex');
  document.body.style.overflow = '';
  galOpen = false;
}

galPrev?.addEventListener('click', () => showImage(galIndex - 1));
galNext?.addEventListener('click', () => showImage(galIndex + 1));
galClose?.addEventListener('click', closeGallery);

// klik di area gelap untuk close
galleryModal?.addEventListener('click', (e) => {
  if (e.target === galleryModal) closeGallery();
});

// keyboard
window.addEventListener('keydown', (e) => {
  if (!galOpen) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft')  showImage(galIndex - 1);
  if (e.key === 'ArrowRight') showImage(galIndex + 1);
});



Object.assign(window, { switchScene }); // jika perlu: { scenes, switchScene }