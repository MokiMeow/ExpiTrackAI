import express, { type Request, type Response, type NextFunction } from 'express';
import http from 'http';
import { registerRoutes } from './routes';
import { setupVite, serveStatic, log } from './vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

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

const server = http.createServer(app);

(async () => {
  await registerRoutes(app);

  // Global error handler (do not rethrow errors)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
    console.error('Global error handler:', err);
  });

  if (app.get('env') === 'development') {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Only start listening if this module is run directly.
  if (process.argv[1] === __filename) {
    const port = Number(process.env.PORT) || 3000;
    server.listen({ port, host: '0.0.0.0' }, () => {
      log(`serving on port ${port}`);
    });
  }
})();

export default app;
