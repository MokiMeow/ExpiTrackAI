// This script ensures the server starts correctly
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, 'dist', 'server', 'index.js');
const routesPath = path.join(__dirname, 'dist', 'server', 'routes.js');

if (!fs.existsSync(serverPath)) {
  console.error(`Server file not found at: ${serverPath}`);
  console.log('Running build first...');

  try {
    const { execSync } = await import('child_process');
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

// Create fallback routes file if it doesn't exist
if (!fs.existsSync(routesPath)) {
  console.log('Creating fallback routes file...');
  const routesContent = `// Fallback routes file
export async function registerRoutes(app) {
  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from API!' });
  });
}
`;
  fs.writeFileSync(routesPath, routesContent);
}

// Set environment variables
process.env.LOCAL_SERVER = 'true';
process.env.PORT = process.env.PORT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Start the server
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});