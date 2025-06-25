import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 插件配置
  plugins: [react()],

  // 开发服务器配置
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true, // 自动在浏览器中打开
  },

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 生成源码映射
    sourcemap: true,
    // 构建后的文件名不带哈希，方便调试
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },

  // 预览服务器配置 (用于预览构建结果)
  preview: {
    port: 8080,
    host: '0.0.0.0',
    open: true,
  },

  // 解析配置
  resolve: {
    alias: {
      // 设置别名，方便引用父目录的 dist 文件
      '@ds-markdown': '../dist',
    },
  },

  // 优化依赖
  optimizeDeps: {
    // 预构建依赖
    include: ['react', 'react-dom'],
  },

  // 静态资源处理
  publicDir: 'public',

  // 环境变量前缀
  envPrefix: 'VITE_',

  // 定义全局常量
  define: {
    __DEV__: JSON.stringify(true),
    global: 'globalThis',
  },
});
