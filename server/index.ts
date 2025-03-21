import express, { type Request, type Response, type NextFunction } from "express";
import http from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// 1) Create your Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 2) Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// 3) Create an HTTP server for local development
const server = http.createServer(app);

// 4) Initialize routes and error handling
(async () => {
  await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // In development, set up Vite's dev middleware
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // In production, serve static files from the build folder
    serveStatic(app);
  }

  // Only start listening if this module is the entry point
  // (On Vercel, the app is exported and listen() is not called)
  if (require.main === module) {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    server.listen(
      { port, host: "0.0.0.0" },
      () => {
        log(`serving on port ${port}`);
      }
    );
  }
})();

// Export the Express app for serverless platforms (like Vercel)
export default app;
