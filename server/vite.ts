import express from 'express';
import { Server } from 'http';

export function log(message: string) {
  console.log(`[server] ${message}`);
}

export async function setupVite(_app: express.Express, _server: Server) {
  // Development mode setup would go here
  log('Vite setup skipped in production');
}

export function serveStatic(_app: express.Express) {
  // Static file serving is handled in index.ts
  log('Static serving setup skipped in production');
}
