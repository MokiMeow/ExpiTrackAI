import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
    root: path.resolve(__dirname, 'client'),
    base: './',
    plugins: [react()],
    build: {
        outDir: path.resolve(__dirname, 'dist/public'),
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'client/src'),
            '@shared': path.resolve(__dirname, 'shared')
        }
    }
});
//# sourceMappingURL=vite.config.js.map