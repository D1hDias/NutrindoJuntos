/**
 * WebP Image Conversion Script (using sharp)
 *
 * Converts all PNG/JPG images to WebP format with quality differentiation:
 * - Hero images & Photos: 85% quality (~85% compression)
 * - Decorative shapes: 75% quality (~92% compression)
 *
 * Deletes original PNG/JPG files after successful conversion.
 *
 * Usage: node scripts/convert-to-webp-sharp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Quality settings based on image type
const QUALITY_CONFIG = {
  hero: 85,     // Hero images and photos (higher quality)
  shape: 75,    // Decorative shapes (lower quality acceptable)
};

// Categorize images by filename patterns
const heroPatterns = ['hero', 'team', 'curso', 'testimonial', 'instructor'];
const shapePatterns = ['shape', 'logo', 'icon', 'background', 'bg'];

/**
 * Determine appropriate quality level based on filename
 */
function getQuality(filepath) {
  const filename = path.basename(filepath).toLowerCase();

  // Check if it's a hero/photo image
  if (heroPatterns.some(p => filename.includes(p))) {
    return QUALITY_CONFIG.hero;
  }

  // Check if it's a decorative shape
  if (shapePatterns.some(p => filename.includes(p))) {
    return QUALITY_CONFIG.shape;
  }

  // Default to shape quality
  return QUALITY_CONFIG.shape;
}

/**
 * Get all image files recursively from a directory
 */
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next') {
        getAllImageFiles(filePath, fileList);
      }
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Convert a single image to WebP using sharp
 */
async function convertImage(inputPath, quality) {
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  await sharp(inputPath)
    .webp({ quality: quality })
    .toFile(outputPath);

  return outputPath;
}

/**
 * Convert directory of images to WebP
 */
async function convertDirectory(inputDir) {
  console.log('🔍 Scanning for images...\n');

  const imageFiles = getAllImageFiles(inputDir);

  if (imageFiles.length === 0) {
    console.log('❌ No PNG/JPG images found in', inputDir);
    return;
  }

  console.log(`📊 Found ${imageFiles.length} images to convert\n`);

  let convertedCount = 0;
  let failedCount = 0;
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const filePath of imageFiles) {
    const quality = getQuality(filePath);
    const relativePath = path.relative(inputDir, filePath);
    const originalSize = fs.statSync(filePath).size;
    totalOriginalSize += originalSize;

    console.log(`📸 Converting: ${relativePath}`);
    console.log(`   Quality: ${quality}%`);
    console.log(`   Original size: ${(originalSize / 1024).toFixed(2)} KB`);

    try {
      // Convert to WebP
      const outputPath = await convertImage(filePath, quality);

      const newSize = fs.statSync(outputPath).size;
      totalNewSize += newSize;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`   ✅ WebP size: ${(newSize / 1024).toFixed(2)} KB (${savings}% smaller)`);

      // Delete original PNG/JPG after successful conversion
      fs.unlinkSync(filePath);
      console.log(`   🗑️  Deleted original file\n`);

      convertedCount++;
    } catch (error) {
      console.error(`   ❌ Error converting ${relativePath}:`, error.message);
      console.log('');
      failedCount++;
    }
  }

  // Summary
  console.log('═'.repeat(60));
  console.log('📊 CONVERSION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Successfully converted: ${convertedCount}/${imageFiles.length} images`);
  if (failedCount > 0) {
    console.log(`❌ Failed conversions: ${failedCount}`);
  }
  console.log(`📦 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Total WebP size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);

  if (totalOriginalSize > 0) {
    const totalSavings = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
    const savedMB = ((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2);
    console.log(`💾 Total savings: ${savedMB} MB (${totalSavings}%)`);
  }
  console.log('═'.repeat(60));
}

// Main execution
(async () => {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');

  console.log('🎨 WebP Image Conversion Script (Sharp)');
  console.log('═'.repeat(60));
  console.log('Directory:', imagesDir);
  console.log('Quality settings:');
  console.log('  - Hero/Photos:', QUALITY_CONFIG.hero + '%');
  console.log('  - Shapes/Icons:', QUALITY_CONFIG.shape + '%');
  console.log('═'.repeat(60));
  console.log('');

  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found:', imagesDir);
    process.exit(1);
  }

  await convertDirectory(imagesDir);

  console.log('\n✨ Conversion complete!');
})().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
