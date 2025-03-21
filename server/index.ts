import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
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

// Create an HTTP server (for local dev)
const server = http.createServer(app);

(async () => {
  // Register your API routes
  await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    // IMPORTANT: do NOT rethrow here or the serverless function crashes on Vercel
    console.error("Global error handler:", err);
  });

  if (app.get("env") === "development") {
    // Dev mode: setup Vite's dev middleware for hot reload
    await setupVite(app, server);
  } else {
    // Production: serve static files from "dist/public"
    serveStatic(app);
  }

  // Only listen if we are running locally (node server/index.ts)
  // On Vercel, we export the app and do NOT call listen()
  if (require.main === module) {
    const port = Number(process.env.PORT) || 3000;
    server.listen({ port, host: "0.0.0.0" }, () => {
      log(`serving on port ${port}`);
    });
  }
})();

// Export for serverless (Vercel)
export default app;
