# GitHub Actions 配置指南

本文档详细介绍如何在 GitHub 网站上配置 GitHub Actions 自动部署到 GitHub Pages。

## 📋 前置条件

1. ✅ 你的代码已经推送到 GitHub 仓库
2. ✅ 工作流文件 `.github/workflows/deploy-docs.yml` 已存在（项目已配置好）
3. ✅ 已配置静态导出（`next.config.mjs` 中设置了 `output: 'export'`）

## 🚀 配置步骤

### 第一步：启用 GitHub Pages

1. **打开仓库设置**
   - 进入你的 GitHub 仓库
   - 点击顶部的 **Settings**（设置）标签

2. **进入 Pages 设置**
   - 在左侧菜单中找到 **Pages**（页面）
   - 点击进入

3. **配置部署源**
   - 在 **Source**（源）下拉菜单中，选择 **GitHub Actions**
   - ⚠️ **重要**：不要选择 "Deploy from a branch"，要选择 "GitHub Actions"

4. **保存设置**
   - 页面会自动保存，无需额外操作

### 第二步：检查工作流文件

工作流文件应该已经存在于：
```
.github/workflows/deploy-docs.yml
```

如果文件不存在，需要：
1. 在仓库根目录创建 `.github/workflows/` 目录
2. 将工作流文件内容复制进去
3. 提交并推送到 GitHub

### 第三步：推送代码触发部署

1. **确保已配置静态导出**
   
   检查 `nextra-docs/next.config.mjs` 是否包含：
   ```javascript
   output: 'export',
   images: {
     unoptimized: true,
   },
   ```

2. **提交并推送代码**
   ```bash
   git add .
   git commit -m "配置 GitHub Actions 部署"
   git push origin main
   ```

3. **触发工作流**
   - 推送代码后，GitHub Actions 会自动运行
   - 如果修改了 `nextra-docs/` 目录下的文件，工作流会自动触发

### 第四步：查看部署状态

1. **查看 Actions 标签**
   - 在仓库顶部，点击 **Actions**（操作）标签
   - 你会看到工作流运行列表

2. **查看具体运行**
   - 点击最新的工作流运行（通常是黄色或绿色的圆点）
   - 可以看到构建和部署的详细日志

3. **检查部署状态**
   - ✅ 绿色勾号 = 部署成功
   - ❌ 红色叉号 = 部署失败（点击查看错误日志）
   - 🟡 黄色圆点 = 正在运行中

### 第五步：访问你的网站

部署成功后：
1. 回到 **Settings → Pages**
2. 你会看到你的网站地址，格式通常是：
   ```
   https://你的用户名.github.io/仓库名/
   ```
3. 可能需要等待几分钟才能访问（DNS 传播）

## 🔍 详细配置说明

### 工作流触发条件

当前配置的工作流会在以下情况触发：

```yaml
on:
  push:
    branches: [main, master]
    paths:
      - 'nextra-docs/**'           # nextra-docs 目录下的文件变更
      - '.github/workflows/deploy-docs.yml'  # 工作流文件本身变更
  pull_request:
    branches: [main, master]
    paths:
      - 'nextra-docs/**'
  workflow_dispatch:  # 允许手动触发
```

**这意味着：**
- ✅ 推送到 `main` 或 `master` 分支时自动触发
- ✅ 只有 `nextra-docs/` 目录变更时才触发（节省资源）
- ✅ 可以通过 GitHub 网站手动触发

### 手动触发部署

如果需要手动触发部署：

1. 进入 **Actions** 标签
2. 在左侧选择 **Deploy Nextra Docs** 工作流
3. 点击右侧的 **Run workflow**（运行工作流）按钮
4. 选择分支，点击 **Run workflow**

## ⚙️ 权限配置

工作流文件已配置了必要的权限：

```yaml
permissions:
  contents: read      # 读取仓库内容
  pages: write        # 写入 GitHub Pages
  id-token: write     # 用于身份验证
```

**如果遇到权限错误：**
1. 检查仓库设置 → Actions → General
2. 确保 "Workflow permissions" 设置为：
   - ✅ "Read and write permissions" 或
   - ✅ "Read repository contents and packages permissions"（并勾选 "Allow GitHub Actions to create and approve pull requests"）

## 🐛 常见问题

### 问题 1：工作流没有自动触发

**可能原因：**
- 文件路径不在 `nextra-docs/` 目录下
- 分支名称不是 `main` 或 `master`

**解决方法：**
- 检查工作流的 `paths` 配置
- 确认分支名称正确
- 手动触发一次测试

### 问题 2：构建失败

**常见错误：**
- `npm ci` 失败 → 检查 `package-lock.json` 是否存在
- 构建错误 → 检查 `next.config.mjs` 是否正确配置静态导出

**解决方法：**
1. 查看 Actions 日志中的错误信息
2. 本地运行 `npm run build` 测试
3. 确保 `next.config.mjs` 包含 `output: 'export'`

### 问题 3：部署成功但网站无法访问

**可能原因：**
- DNS 传播需要时间（通常 1-10 分钟）
- 路径配置错误（如果部署到子目录）

**解决方法：**
1. 等待几分钟后重试
2. 检查 `next.config.mjs` 中的 `basePath` 配置
3. 在 Settings → Pages 中查看部署状态

### 问题 4：找不到 `out` 目录

**原因：**
- 静态导出未启用
- 构建失败

**解决方法：**
1. 确保 `next.config.mjs` 中有 `output: 'export'`
2. 本地运行 `npm run build` 检查是否生成 `out` 目录
3. 查看构建日志中的错误信息

## 📝 配置检查清单

在开始部署前，确认以下项目：

- [ ] GitHub Pages 已启用，源设置为 "GitHub Actions"
- [ ] `.github/workflows/deploy-docs.yml` 文件存在
- [ ] `next.config.mjs` 中配置了 `output: 'export'`
- [ ] `next.config.mjs` 中配置了 `images: { unoptimized: true }`
- [ ] 代码已推送到 GitHub
- [ ] 工作流权限已正确配置

## 🎯 快速开始

如果你已经完成了所有配置，只需要：

1. **推送代码**
   ```bash
   git push origin main
   ```

2. **查看部署**
   - 进入 GitHub 仓库 → Actions 标签
   - 等待部署完成（通常 2-5 分钟）

3. **访问网站**
   - Settings → Pages → 查看网站地址

## 📚 相关文档

- [GitHub Actions 官方文档](https://docs.github.com/actions)
- [GitHub Pages 文档](https://docs.github.com/pages)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

## 💡 提示

- 首次部署可能需要较长时间（安装依赖）
- 后续部署会更快（使用了 npm 缓存）
- 可以在 Actions 中查看每次部署的详细日志
- 如果部署失败，点击运行记录查看具体错误

