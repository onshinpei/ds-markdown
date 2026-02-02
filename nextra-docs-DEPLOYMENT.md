# Nextra 文档部署说明

## 项目结构

为了支持多语言文档的独立部署，我们将文档分为两个独立的 Nextra 项目：

- `nextra-docs-en/` - 英文版文档
- `nextra-docs-zh/` - 中文版文档

## 部署方式

两个项目通过独立的 GitHub Actions workflow 分别部署到 GitHub Pages：

- 英文版：部署到 `gh-pages` 分支的 `/en` 目录
- 中文版：部署到 `gh-pages` 分支的 `/zh` 目录

### GitHub Actions Workflows

1. **`.github/workflows/deploy-docs-en.yml`**
   - 监听 `nextra-docs-en/` 目录的变化
   - 构建英文文档
   - 部署到 `gh-pages` 分支的 `/en` 目录

2. **`.github/workflows/deploy-docs-zh.yml`**
   - 监听 `nextra-docs-zh/` 目录的变化
   - 构建中文文档
   - 部署到 `gh-pages` 分支的 `/zh` 目录

## 访问地址

部署后，文档可以通过以下地址访问：

- 英文版：`https://your-username.github.io/ds-markdown/en/`
- 中文版：`https://your-username.github.io/ds-markdown/zh/`

## 本地开发

### 英文版

```bash
cd nextra-docs-en
npm install
npm run dev
```

访问：http://localhost:3000/ds-markdown/en

### 中文版

```bash
cd nextra-docs-zh
npm install
npm run dev
```

访问：http://localhost:3000/ds-markdown/zh

## 配置说明

### basePath 配置

两个项目都配置了 `basePath`：

- 英文版：`basePath: '/ds-markdown/en'`
- 中文版：`basePath: '/ds-markdown/zh'`

这确保了部署后的资源路径正确。

### 语言切换

每个版本都包含一个语言切换按钮，可以跳转到另一个语言版本。

## 注意事项

1. 两个项目是独立的，修改一个不会影响另一个
2. 两个 workflow 使用 `keep_files: true` 选项，确保不会互相覆盖
3. 首次部署时，需要先部署一个版本，然后再部署另一个版本
4. 确保 `gh-pages` 分支已创建并设置为 GitHub Pages 的源分支

