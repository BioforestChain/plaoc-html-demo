// Plugins

// Utilities
import path from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        zh: path.join("zh", "/index.html"),
        en: path.join("en", "/index.html"),
      },
    },
  },
  plugins: [
  ],
  define: { "process.env": {} },
  server: {
    port: 3600,
  },
});
