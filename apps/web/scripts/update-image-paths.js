/**
 * Update Image Paths Script
 *
 * Updates all image references in components from .png/.jpg to .webp
 *
 * Usage: node scripts/update-image-paths.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Get all TypeScript/JavaScript files recursively from a directory
 */
function getAllCodeFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .next, and scripts directories
      if (file !== 'node_modules' && file !== '.next' && file !== 'scripts') {
        getAllCodeFiles(filePath, fileList);
      }
    } else if (/\.(tsx?|jsx?)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Update image paths in a file
 */
function updateImagePaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let updatedContent = content;
  let changeCount = 0;

  // Pattern 1: "/images/.../*.png" or "/images/.../*.jpg"
  const pattern1 = /(['"`])\/images\/([^'"`,)]*?)\.(png|jpg|jpeg)(['"`])/gi;
  updatedContent = updatedContent.replace(pattern1, (match, quote1, imagePath, ext, quote2) => {
    changeCount++;
    return `${quote1}/images/${imagePath}.webp${quote2}`;
  });

  // Pattern 2: url(/images/.../*.png) in CSS/styled-components
  const pattern2 = /(url\s*\(\s*['"`]?)\/images\/([^'"`,)]*?)\.(png|jpg|jpeg)(['"`]?\s*\))/gi;
  updatedContent = updatedContent.replace(pattern2, (match, prefix, imagePath, ext, suffix) => {
    changeCount++;
    return `${prefix}/images/${imagePath}.webp${suffix}`;
  });

  if (changeCount > 0) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    return changeCount;
  }

  return 0;
}

// Main execution
(() => {
  const appDir = path.join(__dirname, '..');

  console.log('🔄 Updating image paths in components...\n');

  const codeFiles = getAllCodeFiles(appDir);
  let totalFiles = 0;
  let totalChanges = 0;

  codeFiles.forEach(filePath => {
    const changeCount = updateImagePaths(filePath);

    if (changeCount > 0) {
      const relativePath = path.relative(appDir, filePath);
      console.log(`✅ ${relativePath}`);
      console.log(`   Updated ${changeCount} reference(s)\n`);
      totalFiles++;
      totalChanges += changeCount;
    }
  });

  console.log('═'.repeat(60));
  console.log('📊 UPDATE SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Files updated: ${totalFiles}`);
  console.log(`🔄 Total references updated: ${totalChanges}`);
  console.log('═'.repeat(60));

  if (totalChanges === 0) {
    console.log('\nℹ️  No image paths found to update');
  } else {
    console.log('\n✨ Image paths updated successfully!');
  }
})();
