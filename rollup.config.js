import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

// 基础配置
const baseConfig = {
  input: 'src/index.tsx',
  external: ['react', 'react-dom', 'react-markdown', 'react-syntax-highlighter', 'remark-gfm', 'remark-math', 'rehype-katex', 'katex', 'classnames'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig-rollup.json',
      declaration: false,
      outDir: undefined,
    }),
  ],
};

// ESM 配置
const esmConfig = {
  ...baseConfig,
  output: {
    file: 'dist/esm/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [...baseConfig.plugins, terser()],
};

// CJS 配置
const cjsConfig = {
  ...baseConfig,
  output: {
    file: 'dist/cjs/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [...baseConfig.plugins, terser()],
};

// 类型声明文件配置
const dtsConfig = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/esm/index.d.ts',
      format: 'esm',
    },
    {
      file: 'dist/cjs/index.d.ts',
      format: 'cjs',
    },
  ],
  plugins: [dts()],
};

// 插件配置
const pluginsConfig = {
  input: 'src/plugins/index.tsx',
  external: ['remark-math', 'rehype-katex'],
  output: [
    {
      file: 'dist/esm/plugins/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/cjs/plugins/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig-rollup.json',
      declaration: false,
      outDir: undefined,
    }),
    terser(),
  ],
};

// 插件类型声明文件配置
const pluginsDtsConfig = {
  input: 'src/plugins/index.tsx',
  output: [
    {
      file: 'dist/esm/plugins/index.d.ts',
      format: 'esm',
    },
    {
      file: 'dist/cjs/plugins/index.d.ts',
      format: 'cjs',
    },
  ],
  plugins: [dts()],
};

export default defineConfig([esmConfig, cjsConfig, pluginsConfig, dtsConfig, pluginsDtsConfig]);
