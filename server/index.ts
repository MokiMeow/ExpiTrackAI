import express, { type Request, type Response, type NextFunction } from 'express';
import http from 'http';
import { registerRoutes } from './routes.js';
import { setupVite, serveStatic, log } from './vite.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJson: Record<string, any> | undefined;

  const originalJson = res.json;
  res.json = function (body, ...args) {
    capturedJson = body;
    return originalJson.apply(res, [body, ...args]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith('/api')) {
      let line = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJson) {
        line += ` :: ${JSON.stringify(capturedJson)}`;
      }
      if (line.length > 80) {
        line = line.slice(0, 79) + '…';
      }
      log(line);
    }
  });

  next();
});

// Register API routes first
registerRoutes(app);

const server = http.createServer(app);

(async () => {
  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
    console.error('Global error handler:', err);
  });

  // Determine environment
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    log('Starting in development mode');
    await setupVite(app, server);
  } else {
    log('Starting in production mode');
    // Serve static files from the public directory
    const publicPath = path.resolve(__dirname, '../public');
    app.use(express.static(publicPath));

    // Always return index.html for any non-API routes (for client-side routing)
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(publicPath, 'index.html'));
      }
    });
  }

  // For local testing, start the server only if an env variable is set
  if (process.env.LOCAL_SERVER === 'true') {
    const port = Number(process.env.PORT) || 3000;
    server.listen({ port, host: '0.0.0.0' }, () => {
      log(`serving on port ${port}`);
    });
  }
})();

export default app;
