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
    wrap.appendChild(tip);

    const caret = document.createElement('div');
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
/** @typedef {'aerial'|'gardenhouse'|'lakeview'|'kitchenpatio'|'patio'|'lounge'|'bedroom'|'balcony'|'bathroom'} SceneId */

/** @type {Record<SceneId, { panorama: string, markers: Array<{id:string,to:SceneId,img:string,label:string,position:{yaw:string|number,pitch:string|number}}>} >} */
const scenes = {
    aerial: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/00_AereialView.jpg',
    view: { yaw: deg(70), pitch: deg(-50) },
    markers: [
      { id:'to-gardenhouse',   to:'gardenhouse', img:'/vtour/gardenhouse.png',   label:'Garden House',   position:{ yaw:deg(-10),  pitch:deg(-40) } },
      { id:'to-lakeview', to:'lakeview',   img:'/vtour/lakeview.png', label:'Lake View', position:{ yaw:deg(85),  pitch:deg(-55) } },
      { id:'to-landmark', to:'landmark',   img:'/vtour/landmark2k.png', label:'Landmark', position:{ yaw:deg(110),  pitch:deg(-20) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Aerial View',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/00_AereialView.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      // cta: { label: 'See Gallery' },
      // gallery: [
      //   '/vtour/ENTRANCE_.jpg',
      //   '/vtour/study.jpg',
      //   '/vtour/bedroom.jpg',
      //   ]
    }
  },
    gardenhouse: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/01_GardenView.jpg',
    view: { yaw: deg(200), pitch: deg(0), zoom: 0 },
    markers: [
        { id: 'back-entrance', to: 'entrance', img: ' /vtour/ENTRANCE_.jpg', label: 'Entrance', position: { yaw: deg(-86), pitch: deg(-10) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Garden House',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/01_GardenView.jpg',
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
    lakeview: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/02_LakeView.jpg',
    view: { yaw: deg(90), pitch: deg(0), zoom: 0 },
    markers: [
        { id: 'back-entrance',  to: 'entrance',     img: ' /vtour/ENTRANCE_.jpg',     label: 'Entrance',     position: { yaw: deg(-200), pitch: deg(-8) } },
        { id: 'to-kitchenpatio',to: 'kitchenpatio', img: ' /vtour/kitchenpatio.jpg', label: 'Kitchen Patio', position: { yaw: deg(-17),  pitch: deg(-6) } },
        { id: 'to-lounge',      to: 'lounge',       img: ' /vtour/lounge.jpg',       label: 'Lounge',        position: { yaw: deg(-100), pitch: deg(-6) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Lake View',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/02_LakeView.jpg',
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
    landmark: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/03_LandmarkBunga.jpg',
    view: { yaw: deg(90), pitch: deg(0), zoom: 0 },
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
    try { scenes[currentSceneId].onLeave(); } catch (err) { console.warn(err); }
  }

  // Ganti panorama
   markers.clearMarkers();

  // === set arah awal LANGSUNG saat ganti panorama ===
  const hasView = !!scene.view;
  await viewer.setPanorama(scene.panorama, {
    // set posisi awal supaya tidak pakai arah sebelumnya
    ...(hasView ? { position: {
      ...(scene.view.yaw   != null ? { yaw:   scene.view.yaw }   : {}),
      ...(scene.view.pitch != null ? { pitch: scene.view.pitch } : {}),
    }} : {}),

    // opsional: ikut set zoom awal
    ...(scene.view?.zoom != null ? { zoom: scene.view.zoom } : {}),

    // opsional: cegah “rotasi campur” selama transisi
    transition: {
      // pakai efek fade standar (atau 'black'/'wipe' sesuai selera)
      effect: 'fade',
      rotation: false, // <— penting untuk hilangkan jeda arah lama
    },
  });

  // Tambah markers
  for (const mk of (scene.markers ?? [])) {
    const el = createCircleMarker(mk.img, mk.label);
    el.dataset.to = mk.to;
    markers.addMarker({
      id: mk.id,
      element: el,
      position: mk.position,
      size: { width: 76, height: 76 },
      anchor: 'center center',
      zIndex: 1,
      tooltip: mk.label,
    });
  }

  // Render info card
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
switchScene('aerial');

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