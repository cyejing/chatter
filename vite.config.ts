import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env.VITE_BASE_URL);

  return {
    plugins: [wasm(), topLevelAwait(), react(), tailwindcss()],
    base: env.VITE_BASE_URL,
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
  };
});
