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

访问 http://localhost:3000

### 方式二：使用 Vite 预览模式

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 📁 文件结构

```
website/
├── src/                    # 源代码目录
├── public/                 # 静态资源目录
├── dist/                   # 构建输出目录
├── index.html             # 主页面模板
├── vite.config.js         # Vite 配置文件
├── tsconfig.json          # TypeScript 配置
├── package.json           # 项目配置和依赖
├── start.sh               # 快速启动脚本
└── README.md              # 说明文档
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

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **ds-markdown** - 核心库
- **Vite** - 开发服务器和构建工具
- **CSS3** - 样式和布局

## 📦 脚本命令

```bash
# 开发相关
npm run dev         # 启动开发服务器
npm run start       # 同 dev 命令

# 构建相关
npm run build       # 构建项目
npm run build:prod  # 生产环境构建 (设置正确的基础路径)

# 预览相关
npm run preview     # 预览构建结果
npm run serve       # 同 preview 命令

# 类型检查
npm run type-check  # 运行 TypeScript 类型检查
```

## 🚀 部署

### 自动部署到 GitHub Pages

项目已配置自动部署，当推送代码到 `main` 或 `master` 分支时，会自动构建并部署到 GitHub Pages。

**访问地址**: `https://onshinpei.github.io/ds-markdown/`

#### 设置步骤：

1. 在 GitHub 仓库中启用 Pages 功能
2. 在 Settings > Pages 中选择 "GitHub Actions" 作为部署源
3. 推送代码后会自动触发部署

#### 配置文件：

- `.github/workflows/deploy-website.yml` - GitHub Actions 工作流
- `website/vite.config.js` - 配置了 `base: '/ds-markdown/'`

### 手动部署

#### 构建生产版本

```bash
# 进入 website 目录
cd website

# 安装依赖
npm install

# 构建生产版本
npm run build:prod

# dist 目录包含所有构建文件
```

#### 其他平台部署

**Netlify:**

1. 连接 GitHub 仓库
2. 设置构建命令: `cd website && npm install && npm run build:prod`
3. 设置发布目录: `website/dist`

**Vercel:**

```json
{
  "buildCommand": "cd website && npm install && npm run build:prod",
  "outputDirectory": "website/dist"
}
```

## 📱 响应式设计

网站支持不同设备：

- 🖥️ 桌面端 (1200px+)
- 📱 平板端 (768px-1199px)
- 📱 手机端 (<768px)

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

### 配置说明

#### Vite 配置 (`vite.config.js`)

```javascript
export default defineConfig({
  // GitHub Pages 部署需要的基础路径
  base: '/ds-markdown/',

  // 其他配置...
});
```

#### TypeScript 配置 (`tsconfig.json`)

项目使用 TypeScript 进行类型检查，确保代码质量。

## 🔧 故障排除

### 构建问题

```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm install

# 类型检查
npm run type-check

# 重新构建
npm run build:prod
```

### 部署问题

1. 确认 GitHub Pages 已启用
2. 检查工作流运行状态
3. 验证构建输出是否正确

## 📄 许可证

MIT License - 详见 [LICENSE](../license) 文件。

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
