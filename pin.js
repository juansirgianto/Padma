import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function createPins(scene) {

  function createPin(position, svgURL, name, status, price) {
    const pinGroup = new THREE.Group();
    pinGroup.userData = { name, status, price };

    // Gunakan cara manual untuk load SVG dengan color space yang benar
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
      // Buat canvas untuk convert gambar
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set ukuran canvas (bisa disesuaikan)
      canvas.width = 256;
      canvas.height = 256;
      
      // Gambar image ke canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Buat texture dari canvas dengan pengaturan yang benar
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;  // KUNCI UTAMA!
      texture.premultiplyAlpha = false;
      texture.flipY = true;
      texture.needsUpdate = true;
      
      // Buat material dengan texture
      const material = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true, 
        alphaTest: 0.1 
      });
      
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.13, 0.13, 1);
      sprite.center.set(0.5, 0); // Ujung bawah pin menyentuh lantai
      sprite.position.set(0, 0, 0);
      pinGroup.add(sprite);

      pinGroup.position.copy(position); // Set posisi SETELAH sprite ditambahkan
      scene.add(pinGroup);
    };
    
    img.onerror = function() {
      console.error('Failed to load SVG:', svgURL);
    };
    
    img.src = svgURL;
    return pinGroup;
  }

  const pin1 = createPin(
    new THREE.Vector3(0.15, 0, 1.2),
    './public/assets/pin1.svg',
    'Unit A',
    'Sold',
    '1,325,000 $'
  );

  const pin2 = createPin(
    new THREE.Vector3(0.45, 0, 1.1),
    './public/assets/pin2.svg',
    'Unit B',
    'Available',
    '985,000 $'
  );

  const pin3 = createPin(
    new THREE.Vector3(1.7, 0, 0),
    './public/assets/pin3.svg',
    'Unit B',
    'Available',
    '985,000 $'
  );

  // const pin4 = createPin(
  //   new THREE.Vector3(-0.38, 0, 0.96),
  //   '/assets/pin4.svg',
  //   'Unit B',
  //   'Available',
  //   '985,000 $'
  // );

  // const pin5 = createPin(
  //   new THREE.Vector3(-0.70, 0, 0.90),
  //   '/assets/pin5.svg',
  //   'Unit B',
  //   'Available',
  //   '985,000 $'
  // );

  const pins = [pin1, pin2, pin3];

  const pinPOIs = [
    {
      id: 'pin1',
      mesh: pin1,
      position: pin1.position,
      descriptionId: 'pooldescription',
      camera_position: new THREE.Vector3(-0.85, 0.80 , 1.47),
      camera_target: pin1.position,
    },
    {
      id: 'pin2',
      mesh: pin2,
      position: pin2.position,
      descriptionId: 'housedescription',
      camera_position: new THREE.Vector3(-0.85, 1.14 , 1.47),
      camera_target: pin2.position,
    },
    {
      id: 'pin3',
      mesh: pin3,
      position: pin3.position,
      descriptionId: 'gardendescription',
      camera_position: new THREE.Vector3(0.26, 0.80, -0.01),
      camera_target: pin3.position,
    },
    // {
    //   id: 'pin4',
    //   mesh: pin4,
    //   position: pin4.position,
    //   descriptionId: 'arrivaldescription',
    //   camera_position: new THREE.Vector3(-0.83, 0.81, 0.87),
    //   camera_target: pin4.position,
    // },
    // {
    //   id: 'pin5',
    //   mesh: pin5,
    //   position: pin5.position,
    //   descriptionId: 'archdescription',
    //   camera_position: new THREE.Vector3(-0.84, 0.79, 1.31),
    //   camera_target: pin5.position,
    // },
  ];

  return { pins, pinPOIs };
}