import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Clean dist directory
console.log('Cleaning dist directory...');
try {
  fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
  console.log('Dist directory cleaned.');
} catch (err) {
  console.log('No dist directory to clean.');
}

// Build client
console.log('\nBuilding client...');
execSync('vite build', { stdio: 'inherit' });
console.log('Client built successfully.');

// Build server
console.log('\nBuilding server...');
try {
  execSync('node build-server.js', { stdio: 'inherit' });
  console.log('Server built successfully.');
} catch (err) {
  console.error('Server build failed:', err);
  process.exit(1);
}

// Fix ESM imports in server files
console.log('\nFixing ESM imports in server files...');
const serverDir = path.join(__dirname, 'dist', 'server');
const fixImports = (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixImports(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace .js extensions in imports that might be missing
      content = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, importPath) => {
        if (importPath.startsWith('.') && !importPath.endsWith('.js')) {
          return `from '${importPath}.js'`;
        }
        return match;
      });

      fs.writeFileSync(filePath, content);
    }
  }
};

try {
  fixImports(serverDir);
  console.log('ESM imports fixed successfully.');
} catch (err) {
  console.error('Error fixing ESM imports:', err);
}

// Copy client index.html to the server directory for development mode
console.log('Copying client index.html for development mode...');
try {
  // Create the client directory in dist if it doesn't exist
  const distClientDir = path.join(__dirname, 'dist', 'client');
  if (!fs.existsSync(distClientDir)) {
    fs.mkdirSync(distClientDir, { recursive: true });
  }

  // Copy the index.html file
  fs.copyFileSync(
    path.join(__dirname, 'client', 'index.html'),
    path.join(distClientDir, 'index.html')
  );
  console.log('Client index.html copied successfully.');
} catch (err) {
  console.error('Error copying client index.html:', err);
}

console.log('\n✨ Build completed successfully!');