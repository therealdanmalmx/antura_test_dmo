import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import '@fontsource/roboto/300.css';`,
      },
    },
  },
});
