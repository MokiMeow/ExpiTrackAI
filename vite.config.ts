import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // 1) Start from your "client" folder
  root: path.resolve(__dirname, 'client'),
  base: './', // ensures relative asset paths in production

  // 2) React plugin
  plugins: [react()],

  // 3) Output your built frontend into "dist/public"
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },

  // 4) Aliases (optional)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
});
