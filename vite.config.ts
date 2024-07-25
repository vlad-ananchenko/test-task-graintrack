import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.ts"],
    exclude: [...configDefaults.exclude],
  },
});
