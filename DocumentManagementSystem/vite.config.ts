import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: env.VITE_BASE_URL || "/",
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT) || 5173,
    },
  };
});
