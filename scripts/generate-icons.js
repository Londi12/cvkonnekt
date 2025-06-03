import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512
};

async function generateIcons() {  const svgBuffer = readFileSync(join(__dirname, '../public/icon.svg'));
  
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(__dirname, '../public', filename));
    
    console.log(`Generated ${filename}`);
  }
  
  // Generate favicon.ico (16x16 and 32x32 combined)
  const favicon16 = await sharp(svgBuffer)
    .resize(16, 16)
    .toBuffer();
    
  const favicon32 = await sharp(svgBuffer)
    .resize(32, 32)
    .toBuffer();
    
  await sharp(favicon32)
    .joinChannel(favicon16)
    .toFile(path.join(__dirname, '../public/favicon.ico'));
    
  console.log('Generated favicon.ico');
}

generateIcons().catch(console.error); 