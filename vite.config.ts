import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ds-markdown/',
  build: {
    sourcemap: false, // 或 'inline',
    outDir: 'dev',
  },
  server: {
    sourcemapIgnoreList: false, // 禁用忽略 node_modules 的源码映射
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
});
