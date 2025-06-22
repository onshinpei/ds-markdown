#!/bin/bash

# ds-markdown 测试环境设置脚本

echo "🚀 开始设置 ds-markdown 测试环境..."

# 检查 Node.js 版本
echo "📋 检查 Node.js 版本..."
node_version=$(node --version)
echo "当前 Node.js 版本: $node_version"

# 安装测试依赖
echo "📦 安装测试依赖..."
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  jest-axe \
  ts-jest \
  @types/jest

# 检查安装结果
if [ $? -eq 0 ]; then
  echo "✅ 测试依赖安装成功"
else
  echo "❌ 测试依赖安装失败"
  exit 1
fi

# 创建测试目录结构
echo "📁 创建测试目录结构..."
mkdir -p tests/{unit,integration,utils,e2e}

# 检查 Jest 配置
if [ ! -f "jest.config.js" ]; then
  echo "⚠️  警告: jest.config.js 文件不存在"
else
  echo "✅ Jest 配置文件已存在"
fi

# 检查测试设置文件
if [ ! -f "tests/setup.ts" ]; then
  echo "⚠️  警告: tests/setup.ts 文件不存在"
else
  echo "✅ 测试设置文件已存在"
fi

# 运行测试检查
echo "🧪 运行测试检查..."
npm test -- --passWithNoTests

if [ $? -eq 0 ]; then
  echo "✅ 测试环境设置完成！"
  echo ""
  echo "📝 可用的测试命令："
  echo "  npm test              # 运行所有测试"
  echo "  npm run test:watch    # 监听模式运行测试"
  echo "  npm run test:coverage # 生成覆盖率报告"
  echo "  npm run test:ci       # CI 环境测试"
  echo ""
  echo "📚 更多信息请查看 tests/README.md"
else
  echo "❌ 测试运行失败，请检查配置"
  exit 1
fi 