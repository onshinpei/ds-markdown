# 部署指南

本文档介绍如何部署 Nextra 文档站点。

## 📌 GitHub Pages 部署目录说明

**GitHub Pages 不是只能读取 `docs` 目录！** 有多种部署方式：

| 方式 | 说明 | 灵活性 |
|------|------|--------|
| **GitHub Actions** | 可以从任何目录部署（如 `nextra-docs/out`） | ⭐⭐⭐⭐⭐ |
| **`docs` 目录** | 传统方式，需要在仓库根目录创建 `docs` 文件夹 | ⭐⭐⭐ |
| **`gh-pages` 分支** | 将构建产物推送到专门的分支 | ⭐⭐⭐⭐ |
| **根目录** | 仅适用于 `username.github.io` 仓库 | ⭐⭐ |

**当前项目配置**：使用 GitHub Actions + gh-pages 分支部署，工作流在 main 分支触发，构建产物推送到 gh-pages 分支。

> 📖 **详细配置指南**：查看 [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)

## 部署方式

### 方式一：Vercel（推荐）⭐

Vercel 是 Next.js 官方推荐的部署平台，支持自动部署。

#### 步骤：

1. **安装 Vercel CLI**（可选）
   ```bash
   npm i -g vercel
   ```

2. **部署**
   ```bash
   cd nextra-docs
   vercel
   ```
   或者直接访问 [vercel.com](https://vercel.com)，连接 GitHub 仓库自动部署。

3. **配置**（在 Vercel 控制台）
   - **Root Directory**: `nextra-docs`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`（Vercel 会自动处理）

#### 优点：
- ✅ 零配置，自动部署
- ✅ 支持预览部署（PR 自动生成预览链接）
- ✅ 全球 CDN 加速
- ✅ 免费额度充足

---

### 方式二：静态导出（GitHub Pages / Netlify）

如果需要部署到 GitHub Pages 或其他静态托管平台，需要配置静态导出。

#### 1. 配置静态导出

编辑 `next.config.mjs`：

```javascript
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  defaultShowCopyCode: true,
  search: {
    codeblocks: false
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ds-markdown-mermaid-plugin', 'ds-markdown'],
  output: 'export', // 启用静态导出
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
  // 如果部署到子目录，设置 basePath
  // basePath: '/ds-markdown',
  // assetPrefix: '/ds-markdown',
}

export default withNextra(nextConfig)
```

#### 2. 构建静态文件

```bash
cd nextra-docs
npm run build
```

构建完成后，静态文件会在 `out` 目录中。

#### 3. 部署到 GitHub Pages

GitHub Pages 支持多种部署方式，**不限于 `docs` 目录**：

- ✅ **GitHub Actions**（推荐）- 可以从任何目录部署，最灵活
- ✅ **`docs` 目录** - 传统方式，需要在仓库根目录创建 `docs` 文件夹
- ✅ **`gh-pages` 分支** - 将构建产物推送到专门的分支
- ✅ **根目录** - 如果仓库名是 `username.github.io`，可以从根目录部署

**方法 A：使用 GitHub Actions（推荐）⭐**

这是最灵活的方式，可以从任何目录部署。项目已配置好工作流文件 `.github/workflows/deploy-docs.yml`。

**详细配置步骤请查看：[GitHub Actions 配置指南](./GITHUB_ACTIONS_SETUP.md)**

```yaml
name: Deploy Docs

on:
  push:
    branches:
      - main
    paths:
      - 'nextra-docs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd nextra-docs
          npm ci
          
      - name: Build
        run: |
          cd nextra-docs
          npm run build
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./nextra-docs/out
```

**方法 B：使用 `docs` 目录（传统方式）**

如果你希望使用传统的 `docs` 目录方式：

1. 修改构建脚本，将输出目录改为 `docs`：
   ```bash
   # 在 next.config.mjs 中添加
   distDir: 'docs'
   ```
   或者构建后手动复制：
   ```bash
   cd nextra-docs
   npm run build
   cp -r out ../docs
   ```

2. 在 GitHub 仓库设置中：
   - Settings → Pages
   - Source: 选择 "Deploy from a branch"
   - Branch: 选择 `main`，目录选择 `/docs`

**方法 C：使用 `gh-pages` 分支**

```bash
# 构建
cd nextra-docs
npm run build

# 将 out 目录的内容推送到 gh-pages 分支
git subtree push --prefix nextra-docs/out origin gh-pages
```

然后在 GitHub 仓库设置中选择 `gh-pages` 分支作为部署源。

#### 4. 部署到 Netlify

1. 连接 GitHub 仓库
2. 设置：
   - **Base directory**: `nextra-docs`
   - **Build command**: `npm run build`
   - **Publish directory**: `nextra-docs/out`

---

### 方式三：自建服务器（Node.js）

#### 1. 构建

```bash
cd nextra-docs
npm run build
```

#### 2. 启动生产服务器

```bash
npm start
```

默认运行在 `http://localhost:3000`

#### 3. 使用 PM2 管理进程

```bash
# 安装 PM2
npm i -g pm2

# 启动
cd nextra-docs
pm2 start npm --name "ds-markdown-docs" -- start

# 查看状态
pm2 status

# 查看日志
pm2 logs ds-markdown-docs
```

#### 4. 使用 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### 方式四：Docker 部署

#### 1. 创建 Dockerfile

在 `nextra-docs` 目录创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./
RUN npm ci

# 复制源代码
COPY . .

# 构建
RUN npm run build

# 生产环境
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# 复制必要文件
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

#### 2. 构建和运行

```bash
cd nextra-docs

# 构建镜像
docker build -t ds-markdown-docs .

# 运行容器
docker run -p 3000:3000 ds-markdown-docs
```

---

## 环境变量

如果需要配置环境变量，创建 `.env.local`：

```bash
# .env.local
NEXT_PUBLIC_BASE_PATH=/ds-markdown  # 如果部署到子目录
```

---

## 常见问题

### Q: 静态导出后路由不工作？

A: 确保 `next.config.mjs` 中配置了正确的 `basePath` 和 `assetPrefix`。

### Q: 图片加载失败？

A: 静态导出需要设置 `images: { unoptimized: true }`。

### Q: 部署后样式丢失？

A: 检查 `basePath` 和 `assetPrefix` 配置是否正确。

---

## 推荐方案

- **个人项目/开源项目**: Vercel（最简单）
- **企业内网**: 自建服务器 + PM2
- **需要自定义域名且免费**: Netlify 或 GitHub Pages
- **容器化部署**: Docker

