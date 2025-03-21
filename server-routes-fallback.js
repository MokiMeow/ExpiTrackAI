// This script creates a fallback routes.js file
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverDir = path.join(__dirname, 'dist', 'server');
if (!fs.existsSync(serverDir)) {
  fs.mkdirSync(serverDir, { recursive: true });
}

const routesContent = `// Fallback routes file
export async function registerRoutes(app) {
  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from API!' });
  });
}
`;

fs.writeFileSync(path.join(serverDir, 'routes.js'), routesContent);
console.log('Created fallback routes.js file');