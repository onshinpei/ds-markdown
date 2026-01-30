# GitHub Pages 部署设置（gh-pages 分支方式）

## 配置完成 ✅

项目已配置为使用 **gh-pages 分支**部署到 GitHub Pages。

## 工作流程

```
1. 你在 main 分支修改代码
   ↓
2. 推送代码到 GitHub
   ↓
3. GitHub Actions 在 main 分支触发工作流
   ↓
4. 工作流构建项目（生成 out 目录）
   ↓
5. 工作流将构建产物推送到 gh-pages 分支
   ↓
6. GitHub Pages 从 gh-pages 分支读取并部署网站
```

## GitHub 网站配置步骤

### 第一步：推送代码触发首次部署

```bash
git add .
git commit -m "配置 gh-pages 部署"
git push origin main
```

### 第二步：等待 GitHub Actions 完成

1. 进入仓库页面
2. 点击 **Actions** 标签
3. 查看 "Deploy Nextra Docs to gh-pages" 工作流
4. 等待运行完成（首次可能需要 3-5 分钟）

### 第三步：配置 GitHub Pages

1. 进入仓库 **Settings**（设置）
2. 左侧菜单找到 **Pages**
3. 在 **Source**（源）下拉菜单中选择：
   - Branch: **gh-pages**
   - Folder: **/ (root)**
4. 点击 **Save**（保存）
5. 等待几分钟，页面会显示网站地址

## 网站地址

部署成功后，你的文档将在以下地址访问：

```
https://onshinpei.github.io/ds-markdown/
```

## 已配置的文件

### 1. GitHub Actions 工作流

文件：`.github/workflows/deploy-docs.yml`

```yaml
name: Deploy Nextra Docs to gh-pages

on:
  push:
    branches: [main, master]
    paths:
      - 'nextra-docs/**'

permissions:
  contents: write  # 需要写权限推送到 gh-pages

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd nextra-docs
          npm ci
      
      - name: Build docs
        run: |
          cd nextra-docs
          npm run build
      
      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./nextra-docs/out
          publish_branch: gh-pages
```

### 2. Next.js 配置

文件：`nextra-docs/next.config.mjs`

```javascript
const nextConfig = {
  output: 'export',              // 静态导出
  images: {
    unoptimized: true,           // 禁用图片优化
  },
  basePath: '/ds-markdown',      // 子路径配置
  assetPrefix: '/ds-markdown/',  // 资源路径前缀
}
```

## 工作流触发条件

工作流会在以下情况自动运行：

- ✅ 推送代码到 `main` 或 `master` 分支
- ✅ `nextra-docs/` 目录下的文件发生变化
- ✅ 工作流文件本身发生变化
- ✅ 手动触发（在 Actions 页面）

## 手动触发部署

如果需要手动触发部署：

1. 进入 **Actions** 标签
2. 选择 "Deploy Nextra Docs to gh-pages"
3. 点击 **Run workflow** 按钮
4. 选择 `main` 分支
5. 点击 **Run workflow** 按钮

## 查看部署状态

### 方法一：Actions 页面

1. 进入 **Actions** 标签
2. 查看最新的工作流运行
3. ✅ 绿色勾号 = 部署成功
4. ❌ 红色叉号 = 部署失败

### 方法二：Commits 页面

在提交记录旁边会显示状态图标：
- ✅ 绿色勾号 = 构建成功
- ❌ 红色叉号 = 构建失败
- 🟡 黄色圆点 = 正在构建

### 方法三：Settings → Pages

在 Settings → Pages 中可以看到：
- 最后部署时间
- 网站地址
- 部署状态

## 分支说明

### main 分支
- 你的源代码
- 工作流配置文件
- 这是你日常工作的分支

### gh-pages 分支
- 自动生成，**不要手动修改**
- 包含构建后的静态文件
- GitHub Pages 从这个分支读取
- 每次部署会自动更新

## 常见问题

### Q1: gh-pages 分支没有被创建

**原因：** 首次部署时会自动创建

**解决：** 
1. 确保推送了代码
2. 检查 Actions 是否运行成功
3. 等待几分钟后刷新

### Q2: 网站显示 404

**原因：** 可能是路径配置问题或 Pages 设置错误

**解决：**
1. 确认 Settings → Pages 中选择了 `gh-pages` 分支
2. 确认 `basePath` 设置正确
3. 等待几分钟让 DNS 生效

### Q3: 样式丢失或资源加载失败

**原因：** `basePath` 配置不正确

**解决：**
1. 检查 `next.config.mjs` 中的 `basePath` 和 `assetPrefix`
2. 确保它们都设置为 `/ds-markdown`
3. 重新构建并部署

### Q4: Actions 运行失败

**常见错误：**
- 依赖安装失败 → 检查 `package-lock.json`
- 构建失败 → 本地运行 `npm run build` 测试
- 权限错误 → 检查 Actions 权限设置

**解决：**
1. 点击失败的运行查看详细日志
2. 根据错误信息修复问题
3. 重新推送代码

## 更新文档

每次修改文档后：

```bash
# 1. 提交修改
git add .
git commit -m "更新文档"

# 2. 推送到 GitHub
git push origin main

# 3. 等待自动部署（无需其他操作）
```

## 验证部署

部署完成后访问：
```
https://onshinpei.github.io/ds-markdown/
```

如果看到你的文档网站，说明部署成功！🎉

## 本地预览

在推送前可以本地预览（需要模拟子路径）：

```bash
cd nextra-docs
npm run build
npx serve out -p 3000
```

然后访问 `http://localhost:3000/ds-markdown/`

