import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "../dist/public"), // 🔥 Ensure frontend files go inside dist/public
    emptyOutDir: true,
  },
  base: "/public/", // 🔥 Ensures correct asset paths in production
});
