import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  envPrefix: "REACT_APP_",
  // base: "/",
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://88.119.179.203:8443',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  build: {
    outDir: "./nginx/docker/build",
  },
  plugins: [react(), paths(), svgr()],
});
