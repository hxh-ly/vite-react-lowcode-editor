import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const isProduction = mode === "production";
  return {
    // 设置应用的基础路径，确保在子路径下正确运行

    base: isProduction?"/project/lowcode/":'/',
    plugins: [react(), tailwindcss()],
    build: {
      outDir: "dist",
      assetsDir: "assets",
      // 确保静态资源路径正确生成
    },
  };
});
