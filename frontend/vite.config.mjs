// import { fileURLToPath, URL } from "node:url";

import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),

      //Custom
      "@middlewares": path.resolve(__dirname, "src/router/middlewares"),
      "@components": path.resolve(__dirname, "src/views/components"),
      "@composables": path.resolve(__dirname, "src/composables"),
      "@modules": path.resolve(__dirname, "src/views/modules"),
      "@layouts": path.resolve(__dirname, "src/views/layouts"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@services": path.resolve(__dirname, "src/services"),
      "@pages": path.resolve(__dirname, "src/views/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@router": path.resolve(__dirname, "src/router"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@views": path.resolve(__dirname, "src/views"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
