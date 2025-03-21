import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../dist/server'),
    emptyOutDir: true,
    ssr: 'src/main.ts',
    rollupOptions: {
      input: path.resolve(__dirname, 'main.ts'),
      output: {
        format: 'esm',
        entryFileNames: '[name].js'
      },
      external: [
        'express',
        'http',
        'path',
        'fs',
        'url',
        'vite'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../client/src'),
      '@shared': path.resolve(__dirname, '../shared')
    }
  }
});