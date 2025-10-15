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
      { id:'to-gardenhouse',   to:'gardenhouse', img:'https://designedbypelago.com/wp-content/uploads/2025/10/LANDSCAPE-TAMAN-AMERTA.jpeg',   label:'Garden House',   position:{ yaw:deg(-10),  pitch:deg(-40) } },
      { id:'to-lakeview', to:'lakeview',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/LANDSCAPE-DANAU-2.jpg', label:'Lake View', position:{ yaw:deg(85),  pitch:deg(-55) } },
      { id:'to-landmark', to:'landmark',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/03_LandmarkBunga.jpg', label:'Landmark', position:{ yaw:deg(110),  pitch:deg(-20) } },
      { id:'to-tamandoa', to:'tamandoa',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/TAMAN-DOA-OUR-LADY-OF-AKITA.jpeg', label:'Taman Doa Akita', position:{ yaw:deg(45),  pitch:deg(-20) } },
      { id:'to-rukan', to:'rukan',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/LAU-PA-SAT-1-e1760512333179.jpeg', label:'Rukan Lau Pa Sat', position:{ yaw:deg(65),  pitch:deg(-20) } },
      { id:'to-clubhouse', to:'clubhouse',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender12.jpeg', label:'Club House', position:{ yaw:deg(115),  pitch:deg(-15) } },
      { id:'to-roundabout', to:'roundabout',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/09_Fountain.jpg', label:'Round About', position:{ yaw:deg(65),  pitch:deg(-100) } },
      { id:'to-entrance', to:'entrance',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/GERBANG-KAWASAN-PADMA-09062025.jpeg', label:'Entrance Gate', position:{ yaw:deg(155),  pitch:deg(-30) } },
      { id:'to-sporthub', to:'sporthub',   img:'https://designedbypelago.com/wp-content/uploads/2025/10/11_ST.-JOHANNES-BERCHMANS.jpg', label:'Verde Sporthub', position:{ yaw:deg(-60),  pitch:deg(-25) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Aerial View',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png',
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
        { id: 'back-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(50), pitch: deg(50) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Garden House',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/LANDSCAPE-TAMAN-AMERTA.jpeg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        'https://designedbypelago.com/wp-content/uploads/2025/10/LANDSCAPE-TAMAN-AMERTA.jpeg',
        ]
    }
    },
    lakeview: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/02_LakeView-1.jpg',
    view: { yaw: deg(180), pitch: deg(0), zoom: 0 },
    markers: [
        { id: 'back-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(0), pitch: deg(50) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Lake View',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/LANDSCAPE-DANAU-2.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        'https://designedbypelago.com/wp-content/uploads/2025/10/LANDSCAPE-DANAU-2.jpg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/LANDSCAPE-DANAU-1.jpg',
        ]
    }
    },
    landmark: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/03_LandmarkBunga.jpg',
    view: { yaw: deg(90), pitch: deg(0), zoom: 0 },
    markers: [
        { id: 'to-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(-80), pitch: deg(30) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Landmark',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/03_LandmarkBunga.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      // cta: { label: 'See Gallery' },
      // gallery: [
      //   '/vtour/kitchenpatio.jpg',
      //   '/vtour/kitchen.jpg',
      //   '/vtour/lounge.jpg',
      //   ]
    }
    },
    tamandoa: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/06_TamanDoa.jpg',
    view: { yaw: deg(100), pitch: deg(0), zoom: 0 },
    markers: [
        { id: 'to-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(-80), pitch: deg(30) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Taman Doa Akita',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/TAMAN-DOA-OUR-LADY-OF-AKITA.jpeg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        'https://designedbypelago.com/wp-content/uploads/2025/10/TAMAN-DOA-OUR-LADY-OF-AKITA.jpeg',
        ]
    }
    },
    rukan: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/05_Rukan-Lau-Pa-Sat.jpg',
    view: { yaw: deg(90), pitch: deg(0), zoom: 0 },
    markers: [
        { id: 'to-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(-80), pitch: deg(30) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Rukan Lau Pa Sat',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/LAU-PA-SAT-1-e1760512333179.jpeg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        'https://designedbypelago.com/wp-content/uploads/2025/10/LAU-PA-SAT-1-e1760512333179.jpeg',
        '/vtour/kitchen.jpg',
        ]
    }
    },
    clubhouse: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/04_PadmaClubhouse.jpg',
    view: { yaw: deg(90), pitch: deg(0), zoom: 0 },
    markers: [
        { id: 'to-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(-80), pitch: deg(30) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Club House',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender12.jpeg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender12.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender1.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender13.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender14.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender15.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender5.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender6.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender7.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender8.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender9.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender10.jpeg',
        'https://designedbypelago.com/wp-content/uploads/2025/10/ClubhouseRender11.jpeg'
        ]
    }
    },
    roundabout: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/09_Fountain.jpg',
    view: { yaw: deg(100), pitch: deg(0), zoom: 0 },
    // markers: [
    //     { id: 'to-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/00_AereialView.jpg', label: 'Aerial View', position: { yaw: deg(-80), pitch: deg(30) } },
    // ],
    info: {
      tag: 'Welcome',
      title: 'Round About',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/09_Fountain.jpg',
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
    entrance: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/10_Entrance.jpg',
    view: { yaw: deg(100), pitch: deg(0) },
    markers: [
        { id: 'to-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(70), pitch: deg(30) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Entrance Gate',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/GERBANG-KAWASAN-PADMA-09062025.jpeg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        'https://designedbypelago.com/wp-content/uploads/2025/10/GERBANG-KAWASAN-PADMA-09062025.jpeg',
        ]
    }
    },
    sporthub: {
    panorama: 'https://designedbypelago.com/wp-content/uploads/2025/10/11_ST.-JOHANNES-BERCHMANS.jpg',
    view: { yaw: deg(100), pitch: deg(-20) },
    markers: [
        { id: 'to-aerial', to: 'aerial', img: 'https://designedbypelago.com/wp-content/uploads/2025/10/compressed_AERIAL-PADMA-2.png', label: 'Aerial View', position: { yaw: deg(-100), pitch: deg(30) } },
    ],
    info: {
      tag: 'Welcome',
      title: 'Verde Sporthub',
      desc: 'Gerbang masuk utama menuju area hunian, dengan lanskap rapi dan akses langsung ke koridor utama.',
      img: 'https://designedbypelago.com/wp-content/uploads/2025/10/VERDE-SPORTS-HUB.jpg',
      bullets: [
        'Akses ke Study, Kitchen, dan Bedroom',
        'Pencahayaan natural pagi',
        'Lebar koridor 2.2 m'
      ],
      cta: { label: 'See Gallery' },
      gallery: [
        'https://designedbypelago.com/wp-content/uploads/2025/10/VERDE-SPORTS-HUB.jpg',
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
// const cardTag     = document.getElementById('sceneCardTag');
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
  // cardTag.textContent = info.tag ?? '';

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
let imageCache = {}; // Cache untuk preloaded images

// ===== LOADER ELEMENT =====
// Buat loader spinner (tambahkan di HTML atau create via JS)
let galLoader = document.getElementById('galLoader');
if (!galLoader) {
  galLoader = document.createElement('div');
  galLoader.id = 'galLoader';
  galLoader.className = 'absolute inset-0 flex items-center justify-center bg-black/50 z-10 hidden';
  galLoader.innerHTML = `
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
  `;
  galleryModal?.appendChild(galLoader);
}

function showLoader() {
  galLoader?.classList.remove('hidden');
}

function hideLoader() {
  galLoader?.classList.add('hidden');
}

// ===== PRELOAD IMAGE =====
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    // Cek cache dulu
    if (imageCache[src]) {
      resolve(imageCache[src]);
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache[src] = img;
      resolve(img);
    };
    img.onerror = () => {
      console.error('Failed to load image:', src);
      reject(new Error(`Failed to load: ${src}`));
    };
    img.src = src;
  });
}

// ===== RENDER DOTS =====
function renderDots() {
  galDots.innerHTML = '';
  galImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'w-2.5 h-2.5 rounded-full transition-colors ' + 
      (i === galIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70');
    dot.addEventListener('click', () => showImage(i));
    galDots.appendChild(dot);
  });
}

// ===== SHOW IMAGE WITH LOADER =====
async function showImage(i) {
  galIndex = (i + galImages.length) % galImages.length;
  const targetSrc = galImages[galIndex];

  // Show loader
  showLoader();
  
  try {
    // Preload image
    await preloadImage(targetSrc);
    
    // Set image source (smooth transition)
    galImage.style.opacity = '0';
    
    setTimeout(() => {
      galImage.src = targetSrc;
      galImage.style.opacity = '1';
      hideLoader();
    }, 150); // Small delay for smooth fade
    
    renderDots();
    
    // Preload adjacent images (prev & next) untuk smooth navigation
    preloadAdjacentImages();
    
  } catch (error) {
    console.error('Error loading image:', error);
    hideLoader();
    
    // Fallback: show placeholder atau error message
    galImage.alt = 'Failed to load image';
  }
}

// ===== PRELOAD ADJACENT IMAGES =====
function preloadAdjacentImages() {
  const prevIndex = (galIndex - 1 + galImages.length) % galImages.length;
  const nextIndex = (galIndex + 1) % galImages.length;
  
  // Preload in background (no await)
  preloadImage(galImages[prevIndex]).catch(() => {});
  preloadImage(galImages[nextIndex]).catch(() => {});
}

// ===== OPEN GALLERY =====
function openGallery(images, start = 0) {
  if (!Array.isArray(images) || images.length === 0) return;
  
  galImages = images;
  galIndex = start;
  
  // Clear previous image
  galImage.src = '';
  galImage.style.opacity = '0';
  
  // Show modal
  galleryModal.classList.remove('hidden');
  galleryModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  galOpen = true;
  
  // Load first image
  showImage(galIndex);
}

// ===== CLOSE GALLERY =====
function closeGallery() {
  galleryModal.classList.add('hidden');
  galleryModal.classList.remove('flex');
  document.body.style.overflow = '';
  galOpen = false;
  hideLoader();
}

// ===== EVENT LISTENERS =====
galPrev?.addEventListener('click', () => showImage(galIndex - 1));
galNext?.addEventListener('click', () => showImage(galIndex + 1));
galClose?.addEventListener('click', closeGallery);

// Klik di area gelap untuk close
galleryModal?.addEventListener('click', (e) => {
  if (e.target === galleryModal) closeGallery();
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (!galOpen) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft')  showImage(galIndex - 1);
  if (e.key === 'ArrowRight') showImage(galIndex + 1);
});

// ===== ADD SMOOTH TRANSITION CSS =====
// Tambahkan ini ke galImage element
if (galImage) {
  galImage.style.transition = 'opacity 0.3s ease-in-out';
}

Object.assign(window, { switchScene }); // jika perlu: { scenes, switchScene }