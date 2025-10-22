const fs = require('fs');
const path = require('path');

// Create a simple colored square as placeholder icon
function createIcon(size, filename) {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#000"/>
    <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#fff" font-family="Arial" font-size="${size/4}">R</text>
  </svg>`;
  
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, filename), svg);
  console.log(`Created ${filename}`);
}

// Generate all required icon sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
sizes.forEach(size => {
  createIcon(size, `icon-${size}x${size}.png`);
});

console.log('All PWA icons generated!');
