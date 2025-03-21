import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"), // Ensure shared code is accessible
    },
  },
  root: path.resolve(__dirname, "client"), // 🔥 Fix: Ensure correct root directory
  build: {
    outDir: path.resolve(__dirname, "dist"), // 🔥 Fix: Correct output directory for Vercel
    emptyOutDir: true,
  },
  base: "./", // 🔥 Fix: Ensures paths work in production
});
