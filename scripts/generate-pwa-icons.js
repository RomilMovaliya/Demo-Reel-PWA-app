const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Icon sizes required for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generatePWAIcons() {
  const inputImage = path.join(__dirname, '../public/logo.png');
  const outputDir = path.join(__dirname, '../public');
  
  // Check if input image exists
  if (!fs.existsSync(inputImage)) {
    console.error('❌ Input image not found:', inputImage);
    console.log('Please make sure you have a logo.png file in the public directory');
    return;
  }

  console.log('🎨 Generating PWA icons from:', inputImage);
  
  try {
    // Generate icons for each size
    for (const size of iconSizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: icon-${size}x${size}.png`);
    }
    
    console.log('\n🎉 All PWA icons generated successfully!');
    console.log('\n📱 Your PWA is now ready with:');
    console.log('   • Multiple icon sizes for different devices');
    console.log('   • Proper manifest configuration');
    console.log('   • iOS splash screen support');
    console.log('   • Android PWA support');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    console.log('\n💡 Make sure you have sharp installed:');
    console.log('   npm install sharp');
  }
}

// Run the script
generatePWAIcons();
