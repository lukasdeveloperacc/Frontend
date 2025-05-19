import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const env = loadEnv("dev", ".");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: env.BASE_URL,
  // server: {
  //   host: "0.0.0.0",
  //   port: 5173,
  // },
});
