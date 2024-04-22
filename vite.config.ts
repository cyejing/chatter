import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wasm(), topLevelAwait(), react()],
  server: {
    host: "127.0.0.1",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", //实际请求地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
