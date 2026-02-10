// DOM REFERENCES (safe with defer)

let rockImageContainer = document.querySelector('.rock-image-container');
let pickaxeIcon = document.getElementById('purchasable-icon-pickaxe');
let saveIcon = document.querySelector('.game-buttons');

// PRELOAD IMAGES
const pickaxeIcons = [
  '/galmi/img/icons/pickaxe.png',
  '/galmi/img/icons/pickaxe.png',
  '/galmi/img/icons/pickaxe.png',
  '/galmi/img/icons/chromitestaff.png'
];

pickaxeIcons.forEach(src => {
  const img = new Image();
  img.src = src;
});

