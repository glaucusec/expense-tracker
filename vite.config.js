import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  if (process.env.VITE_ENV === "production") {
    return defineConfig({
      plugins: [react()],
    });
  }

  if (process.env.VITE_ENV === "development") {
    return defineConfig({
      plugins: [react()],
      server: {
        proxy: {
          "/api": { target: process.env.VITE_SERVER_URL, changeOrigin: true, secure: true },
        },
      },
    });
  }
};
