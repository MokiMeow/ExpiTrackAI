import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // We want Vite to start building from your "client" folder
  root: path.resolve(__dirname, "client"),
  base: "./", // ensures relative paths for assets in production
  plugins: [react()],

  build: {
    // Put final build inside "dist/public"
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
