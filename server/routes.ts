import { Express } from 'express';

export async function registerRoutes(app: Express) {
  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from API!' });
  });
}
