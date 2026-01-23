# Nextra v4 升级指南

## 已完成的更新

✅ 更新 package.json 到 Nextra v4
✅ 更新 Next.js 到 v15
✅ 更新 React 到 v19
✅ 配置文件改为 ES Module 格式 (next.config.mjs)

## 安装依赖

```bash
cd nextra-docs
npm install
```

## 主要变化

### 1. Next.js 15
- 需要 Next.js 15.1.0 或更高版本
- 支持 React 19

### 2. React 19
- 使用 React 19.0.0
- 更好的性能和新的特性

### 3. 配置文件格式
- `next.config.js` 改为 `next.config.mjs` (ES Module)
- 使用 `import/export` 语法

### 4. Nextra v4 新特性
- 更好的性能
- 改进的搜索功能
- 更好的 TypeScript 支持
- 更新的主题系统

## 启动开发服务器

```bash
npm run dev
```

## 如果遇到问题

1. 清除缓存：
```bash
rm -rf .next node_modules
npm install
```

2. 检查 Node.js 版本（需要 18+）：
```bash
node --version
```

3. 如果依赖冲突，使用：
```bash
npm install --legacy-peer-deps
```

