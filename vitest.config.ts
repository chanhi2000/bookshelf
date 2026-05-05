import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["text", "clover", "json"],
    },
  },
  resolve: {
    dedupe: ["vue"],
  },
});