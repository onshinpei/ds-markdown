#!/bin/bash

# ds-markdown 文档网站启动脚本 (Vite 版本)

echo "🚀 启动 ds-markdown 文档网站 (Vite)..."

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 请在 website 目录下运行此脚本"
    exit 1
fi

# 检查是否有 dist 目录 (需要先构建主项目)
if [ ! -d "../dist" ]; then
    echo "⚠️  警告: 未找到 dist 目录，正在构建主项目..."
    cd ..
    npm run build
    cd website
    echo "✅ 主项目构建完成"
fi

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖中..."
    npm install
    echo "✅ 依赖安装完成"
fi

# 检查是否有 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js"
    echo "请安装 Node.js: https://nodejs.org"
    exit 1
fi

# 检查是否有 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm"
    echo "请安装 npm (通常随 Node.js 一起安装)"
    exit 1
fi

echo "📡 使用 Vite 启动开发服务器..."
echo "🌐 服务器将在 http://localhost:8080 启动"
echo "🔥 支持热重载和快速刷新"
echo "📄 按 Ctrl+C 停止服务器"
echo ""

# 启动 Vite 开发服务器
npm run dev 