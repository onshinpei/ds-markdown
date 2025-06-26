import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // 根据环境设置 publicPath (Vite 中称为 base)
  // 开发环境和生产环境都使用相对路径
  const base =
    command === 'serve'
      ? './' // 开发环境
      : './'; // 生产环境

  return {
    // 基础路径配置 - 相当于 webpack 的 publicPath
    // 这个路径会被添加到所有静态资源的前面
    base,

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
      // 构建前清空输出目录
      emptyOutDir: true,
      // 生成源码映射
      sourcemap: mode === 'development',
      // 构建后的文件名配置
      rollupOptions: {
        output: {
          // 生产环境使用哈希，开发环境不使用
          entryFileNames: mode === 'production' ? '[name]-[hash].js' : '[name].js',
          chunkFileNames: mode === 'production' ? '[name]-[hash].js' : '[name].js',
          assetFileNames: mode === 'production' ? '[name]-[hash].[ext]' : '[name].[ext]',
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
      __DEV__: JSON.stringify(mode === 'development'),
      __BASE_PATH__: JSON.stringify(base),
      global: 'globalThis',
    },
  };
});
