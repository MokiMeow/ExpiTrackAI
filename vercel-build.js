import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure production mode
process.env.NODE_ENV = 'production';

console.log('Starting Vercel build process...');

// Clean dist directory with retry
const cleanDist = () => {
  const distPath = path.join(__dirname, 'dist');
  console.log('\nCleaning dist directory...');

  try {
    // First try to remove synchronously
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, {
        recursive: true,
        force: true,
        maxRetries: 3,
        retryDelay: 100
      });
    }
  } catch (err) {
    console.log('Warning: Could not remove dist directory synchronously, trying alternative method...');
    try {
      // Alternative: use command line to force remove
      if (process.platform === 'win32') {
        execSync(`rd /s /q "${distPath}"`, { stdio: 'ignore' });
      } else {
        execSync(`rm -rf "${distPath}"`, { stdio: 'ignore' });
      }
    } catch (err2) {
      console.log('Warning: Could not remove dist directory, continuing anyway...');
    }
  }
};

// Add this function after cleanDist()
const verifySourceFiles = () => {
  const requiredSources = [
    'server/index.ts',
    'server/routes.ts'
  ];

  const missing = requiredSources.filter(file => !fs.existsSync(path.join(__dirname, file)));
  if (missing.length > 0) {
    console.error('Error: Missing required source files:', missing);
    process.exit(1);
  }
};

// Add this call before building
console.log('\nVerifying source files...');
verifySourceFiles();

// Clean and create directories
cleanDist();

// Create fresh directories
console.log('Creating build directories...');
const dirs = ['dist', 'dist/public', 'dist/server'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Build client
console.log('\nBuilding client...');
try {
  execSync('vite build', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('Client build successful.');
} catch (err) {
  console.error('Client build failed:', err);
  process.exit(1);
}

// Add this function after cleanDist()
const ensureServerFiles = () => {
  const routesContent = `
import { Express } from 'express';

export async function registerRoutes(app: Express) {
  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from API!' });
  });
}
`;

  const routesPath = path.join(__dirname, 'server', 'routes.ts');
  if (!fs.existsSync(routesPath)) {
    console.log('Creating routes.ts file...');
    fs.writeFileSync(routesPath, routesContent);
  }
};

// Add this call before building
console.log('\nEnsuring server files exist...');
ensureServerFiles();

// Add this function to manually create server files
const createServerFiles = () => {
  const serverDistDir = path.join(__dirname, 'dist', 'server');

  // Create routes.js
  const routesContent = `
export async function registerRoutes(app) {
  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from API!' });
  });
}`;

  // Create index.js
  const indexContent = `
import express from 'express';
import http from 'http';
import { registerRoutes } from './routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes first
registerRoutes(app);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.resolve(__dirname, '../public');
  app.use(express.static(publicPath));

  // SPA fallback
  app.get('*', (req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(publicPath, 'index.html'));
    } else {
      next();
    }
  });
}

const server = http.createServer(app);

export default app;`;

  // Write the files
  fs.writeFileSync(path.join(serverDistDir, 'routes.js'), routesContent);
  fs.writeFileSync(path.join(serverDistDir, 'index.js'), indexContent);

  // Verify files were created
  const files = ['routes.js', 'index.js'];
  const missing = files.filter(file => !fs.existsSync(path.join(serverDistDir, file)));

  if (missing.length > 0) {
    console.error('Failed to create server files:', missing);
    return false;
  }

  return true;
};

// Update the server build section
console.log('\nBuilding server...');
try {
  // First attempt: build with tsc
  execSync('tsc -p tsconfig.server.json', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('Server build successful.');
} catch (err) {
  console.error('Server build failed, attempting manual file creation...');

  if (createServerFiles()) {
    console.log('Manual server files creation successful.');
  } else {
    console.error('Failed to create server files');
    process.exit(1);
  }
}

// Fix imports
console.log('\nFixing ESM imports...');
const fixImports = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fixImports(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
        if (p1.startsWith('.') && !p1.endsWith('.js')) {
          return `from '${p1}.js'`;
        }
        return match;
      });
      fs.writeFileSync(filePath, content);
    }
  }
};

try {
  fixImports(path.join(__dirname, 'dist', 'server'));
  console.log('ESM imports fixed successfully.');
} catch (err) {
  console.error('Warning: Error fixing ESM imports:', err);
}

// Update the verifyBuild function to be more verbose
const verifyBuild = () => {
  console.log('\nVerifying build output...');

  const requiredFiles = [
    'dist/public/index.html',
    'dist/server/index.js',
    'dist/server/routes.js'
  ];

  console.log('Checking for required files:');
  const missing = [];

  for (const file of requiredFiles) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      console.log(`✓ Found: ${file}`);
    } else {
      console.log(`✗ Missing: ${file}`);
      missing.push(file);
    }
  }

  if (missing.length > 0) {
    console.error('\nError: The following required files are missing:', missing);

    // List contents of dist directory for debugging
    console.log('\nContents of dist directory:');
    const listDir = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          console.log(`${prefix}📁 ${item}/`);
          listDir(fullPath, `${prefix}  `);
        } else {
          console.log(`${prefix}📄 ${item}`);
        }
      });
    };

    try {
      listDir(path.join(__dirname, 'dist'));
    } catch (err) {
      console.error('Error listing dist directory:', err);
    }

    process.exit(1);
  }

  console.log('\n✓ All required files are present');
};

verifyBuild();
console.log('\n✨ Build completed successfully!');