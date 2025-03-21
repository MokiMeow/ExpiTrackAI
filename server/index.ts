import express, { type Request, type Response, type NextFunction } from 'express';
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

export default app;
