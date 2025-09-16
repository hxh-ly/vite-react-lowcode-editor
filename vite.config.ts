import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  // 设置应用的基础路径，确保在子路径下正确运行
  base: '/project/lowcode/',
  plugins: [react(),tailwindcss()],
})
