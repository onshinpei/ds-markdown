# ds-markdown 在线文档网站

这是 ds-markdown 库的官方在线文档网站，展示了库的所有功能和使用方法。

## 🚀 快速开始

### 方式一：使用 Vite 开发服务器 (推荐)

```bash
# 进入 website 目录
cd website

# 安装依赖
npm install

# 启动开发服务器 (支持热重载)
npm run dev

# 或者使用启动脚本
./start.sh
```

访问 http://localhost:8080

### 方式二：使用 Vite 预览模式

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

### 方式三：使用其他静态服务器

```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8080

# 或者使用其他静态服务器
npx serve -p 8080
```

## 📁 文件结构

```
website/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── app.js             # JavaScript 应用逻辑
├── vite.config.js     # Vite 配置文件
├── package.json       # 项目配置和依赖
├── start.sh           # 快速启动脚本
└── README.md          # 说明文档
```

## ✨ 功能特性

### 📚 完整的使用文档

- 安装说明
- 基础用法示例
- 数学公式支持
- 打字动画控制
- 主题切换演示

### 🎬 实时演示

- 左侧显示源代码
- 右侧展示实时效果
- 支持交互式控制

### 🎨 美观的界面

- 响应式设计
- 现代化 UI
- 代码高亮
- 平滑动画

### 🔥 Vite 开发体验

- 极速热重载 (HMR)
- 快速冷启动
- 优化的构建输出
- 开发工具集成

## 🔧 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和布局
- **ES6+ JavaScript** - 交互逻辑
- **React 18** - 组件渲染 (通过 CDN)
- **ds-markdown** - 核心库
- **Prism.js** - 代码高亮
- **Vite** - 开发服务器和构建工具

## �� 演示功能

### 1. 安装指南

展示如何通过不同包管理器安装 ds-markdown。

### 2. 基础用法

演示基本的 Markdown 渲染和打字动画效果，包括：

- 标题和段落
- 代码块高亮
- 表格渲染
- 引用块

### 3. 数学公式

展示 KaTeX 数学公式渲染功能：

- 行内公式
- 块级公式
- 复杂数学表达式

### 4. 打字动画

演示打字效果的控制功能：

- 开启/关闭打字效果
- 暂停/继续功能
- 速度控制

### 5. 主题切换

展示亮色/暗色主题切换效果。

## 📱 响应式设计

网站支持不同设备：

- 🖥️ 桌面端 (1200px+)
- 📱 平板端 (768px-1199px)
- 📱 手机端 (<768px)

## 🚀 部署

### 构建生产版本

```bash
# 构建优化后的静态文件
npm run build

# 预览构建结果
npm run preview
```

### GitHub Pages

```bash
# 复制构建后的文件到 gh-pages 分支
npm run build
git checkout gh-pages
cp -r dist/* .
git add .
git commit -m "Update documentation"
git push origin gh-pages
```

### Netlify

1. 连接 GitHub 仓库
2. 设置构建命令: `npm run build`
3. 设置发布目录: `dist`

### Vercel

```bash
# 在项目根目录创建 vercel.json
{
  "buildCommand": "cd website && npm install && npm run build",
  "outputDirectory": "website/dist"
}
```

## 🛠️ 开发指南

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/onshinpei/ds-markdown.git
cd ds-markdown/website

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 开发脚本

- `npm run dev` - 启动开发服务器 (热重载)
- `npm run build` - 构建生产版本
- `npm run preview` - 预览构建结果
- `./start.sh` - 一键启动脚本 (包含依赖检查)

### Vite 配置

网站使用 Vite 作为开发服务器，配置文件为 `vite.config.js`：

- 开发服务器端口: 8080
- 自动打开浏览器
- 热重载支持
- 源码映射生成
- 优化的依赖预构建

## 📝 许可证

MIT License - 查看 [LICENSE](../license) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系方式

- GitHub: [onshinpei/ds-markdown](https://github.com/onshinpei/ds-markdown)
- NPM: [ds-markdown](https://www.npmjs.com/package/ds-markdown)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
