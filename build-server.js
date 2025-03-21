// Custom script to build the server
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building server with custom script...');

// Clean and create server directory
const serverDir = path.join(__dirname, 'dist', 'server');
console.log(`Ensuring server directory exists: ${serverDir}`);
fs.rmSync(serverDir, { recursive: true, force: true });
fs.mkdirSync(serverDir, { recursive: true });

// Compile TypeScript files
try {
  console.log('Compiling TypeScript files...');
  execSync('tsc -p tsconfig.server.json', { stdio: 'inherit' });
  console.log('TypeScript compilation completed.');

  // Move files from dist/server/server to dist/server
  const tempServerDir = path.join(serverDir, 'server');
  if (fs.existsSync(tempServerDir)) {
    console.log('Moving files from nested server directory...');
    const files = fs.readdirSync(tempServerDir);
    for (const file of files) {
      const srcPath = path.join(tempServerDir, file);
      const destPath = path.join(serverDir, file);
      fs.renameSync(srcPath, file);
    }
    fs.rmSync(tempServerDir, { recursive: true });
    console.log('Files moved successfully.');
  }

  // Copy shared files if they exist
  const sharedDir = path.join(__dirname, 'dist', 'shared');
  if (fs.existsSync(sharedDir)) {
    console.log('Copying shared files...');
    const destSharedDir = path.join(serverDir, 'shared');
    fs.mkdirSync(destSharedDir, { recursive: true });
    const files = fs.readdirSync(sharedDir);
    for (const file of files) {
      const srcPath = path.join(sharedDir, file);
      const destPath = path.join(destSharedDir, file);
      fs.copyFileSync(srcPath, destPath);
    }
    console.log('Shared files copied successfully.');
  }
} catch (err) {
  console.error('TypeScript compilation failed:', err);
  process.exit(1);
}

// Log the contents of the server directory
console.log('\nContents of dist/server directory:');
const listFiles = (dir, prefix = '') => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      console.log(`${prefix}📁 ${file}/`);
      listFiles(filePath, `${prefix}  `);
    } else {
      console.log(`${prefix}📄 ${file}`);
    }
  });
};
listFiles(serverDir);

// Verify the server index file exists
const serverIndexPath = path.join(serverDir, 'index.js');
if (fs.existsSync(serverIndexPath)) {
  console.log(`\n✅ Server index file created at: ${serverIndexPath}`);
} else {
  console.error(`\n❌ Failed to create server index file at: ${serverIndexPath}`);
  process.exit(1);
}

console.log('\n✨ Server build completed successfully!');