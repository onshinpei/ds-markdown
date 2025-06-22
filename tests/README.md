# 测试套件文档

本文档描述了 `ds-markdown` 项目的测试策略和测试用例。

## 📋 测试概览

### 测试类型

1. **单元测试 (Unit Tests)** - 测试单个组件和函数
2. **集成测试 (Integration Tests)** - 测试组件间的交互
3. **端到端测试 (E2E Tests)** - 测试完整的用户场景
4. **可访问性测试 (Accessibility Tests)** - 确保无障碍访问

### 测试覆盖范围

- ✅ 基础 Markdown 渲染
- ✅ 打字动画功能
- ✅ 数学公式支持
- ✅ 插件系统
- ✅ 主题切换
- ✅ 流式数据处理
- ✅ 可访问性标准

## 🚀 运行测试

### 安装依赖

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-axe ts-jest
```

### 运行所有测试

```bash
npm test
```

### 运行特定测试

```bash
# 运行单元测试
npm test -- tests/unit/

# 运行集成测试
npm test -- tests/integration/

# 运行可访问性测试
npm test -- tests/e2e/

# 运行特定文件
npm test -- tests/unit/Markdown.test.tsx
```

### 监听模式

```bash
npm run test:watch
```

### 生成覆盖率报告

```bash
npm run test:coverage
```

### CI 环境测试

```bash
npm run test:ci
```

## 📁 测试文件结构

```
tests/
├── setup.ts                    # 测试环境配置
├── unit/                       # 单元测试
│   ├── Markdown.test.tsx      # 主组件测试
│   ├── MarkdownCMD.test.tsx   # 命令式 API 测试
│   └── plugins.test.tsx       # 插件系统测试
├── integration/               # 集成测试
│   └── streaming.test.tsx     # 流式数据处理测试
├── utils/                     # 工具函数测试
│   └── remarkMathBracket.test.ts  # 数学公式转换测试
└── e2e/                       # 端到端测试
    └── accessibility.test.tsx # 可访问性测试
```

## 🧪 测试用例详解

### 单元测试 (Unit Tests)

#### Markdown.test.tsx

测试主组件的核心功能：

- **基础渲染**: 验证组件能正确渲染 Markdown 内容
- **属性验证**: 测试所有 props 的正确处理
- **回调函数**: 验证 onStart、onEnd、onTypedChar 回调
- **Markdown 特性**: 测试标题、列表、代码块等渲染
- **边界情况**: 处理空内容和空白内容

#### MarkdownCMD.test.tsx

测试命令式 API 的功能：

- **命令式 API**: 测试 push、clear、stop、resume 方法
- **流式处理**: 验证多块内容的处理
- **定时器类型**: 测试 setTimeout 和 requestAnimationFrame
- **边缘情况**: 处理空字符串、大量内容等

#### plugins.test.tsx

测试插件系统的功能：

- **KaTeX 插件**: 测试数学公式渲染
- **插件创建**: 测试自定义插件创建
- **多插件支持**: 验证多个插件的协同工作
- **数学公式边界情况**: 处理不完整公式等

### 集成测试 (Integration Tests)

#### streaming.test.tsx

测试真实场景的流式数据处理：

- **AI 对话模拟**: 完整的思考-回答流程
- **数学公式流式渲染**: 数学内容的流式处理
- **复杂 Markdown**: 混合内容的流式渲染
- **性能测试**: 高速和低速流式处理
- **主题切换**: 流式过程中的主题变化

### 工具函数测试 (Utils Tests)

#### remarkMathBracket.test.ts

测试数学公式语法转换：

- **行内公式转换**: `\(...\)` 到 `$...$`
- **块级公式转换**: `\[...\]` 到 `$$...$$`
- **复杂表达式**: 处理复杂的数学公式
- **性能测试**: 大量公式的处理效率
- **边界情况**: 不完整、嵌套、特殊字符等

### 可访问性测试 (Accessibility Tests)

#### accessibility.test.tsx

确保组件符合无障碍访问标准：

- **基础可访问性**: 验证无违反可访问性规则
- **语义结构**: 正确的标题层级、列表、表格结构
- **主题可访问性**: 亮色和暗色主题的可访问性
- **数学内容可访问性**: 数学公式的无障碍支持
- **键盘导航**: 键盘操作支持
- **屏幕阅读器**: ARIA 标签和实时区域
- **颜色对比度**: 足够的颜色对比度
- **焦点管理**: 正确的焦点处理
- **响应式设计**: 不同屏幕尺寸的可访问性

## 🔧 测试配置

### Jest 配置 (jest.config.js)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapping: {
    '^ds-markdown$': '<rootDir>/src/index.ts',
    '^ds-markdown/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/tests/**/*.test.{ts,tsx}', '<rootDir>/tests/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  testTimeout: 10000,
};
```

### 测试环境设置 (tests/setup.ts)

- **React Testing Library**: 设置 DOM 测试环境
- **Mock 依赖**: 模拟 React Markdown、KaTeX 等依赖
- **定时器模拟**: 模拟 requestAnimationFrame 和 setTimeout
- **DOM API 模拟**: 模拟 ResizeObserver、IntersectionObserver 等

## 📊 测试覆盖率

### 覆盖率目标

- **语句覆盖率**: > 90%
- **分支覆盖率**: > 85%
- **函数覆盖率**: > 90%
- **行覆盖率**: > 90%

### 覆盖率报告

运行 `npm run test:coverage` 后，可以在 `coverage/` 目录查看详细的覆盖率报告：

- `coverage/lcov-report/index.html` - HTML 格式报告
- `coverage/lcov.info` - LCOV 格式报告

## 🐛 调试测试

### 调试特定测试

```bash
# 运行单个测试文件并显示详细输出
npm test -- tests/unit/Markdown.test.tsx --verbose

# 运行特定测试用例
npm test -- -t "should render basic markdown content"
```

### 使用调试器

```bash
# 在 Node.js 调试器中运行测试
node --inspect-brk node_modules/.bin/jest --runInBand tests/unit/Markdown.test.tsx
```

### 查看测试输出

```bash
# 显示详细的测试输出
npm test -- --verbose

# 显示测试时间
npm test -- --verbose --detectOpenHandles
```

## 🔄 持续集成

### GitHub Actions 配置

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v1
        with:
          file: ./coverage/lcov.info
```

### 预提交钩子

建议在项目中配置 pre-commit 钩子来运行测试：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:ci"
    }
  }
}
```

## 📝 编写新测试

### 测试文件命名

- 单元测试: `*.test.tsx` 或 `*.spec.tsx`
- 集成测试: `*.test.tsx` 或 `*.spec.tsx`
- 工具函数测试: `*.test.ts` 或 `*.spec.ts`

### 测试结构

```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DsMarkdown from '../../src';

describe('Feature Name', () => {
  describe('Specific Functionality', () => {
    it('should do something specific', async () => {
      // Arrange
      const props = { /* test props */ };

      // Act
      render(<DsMarkdown {...props}>Test content</DsMarkdown>);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Test content')).toBeInTheDocument();
      });
    });
  });
});
```

### 测试最佳实践

1. **描述性测试名称**: 使用清晰的测试描述
2. **AAA 模式**: Arrange, Act, Assert
3. **异步处理**: 正确处理异步操作
4. **Mock 依赖**: 适当模拟外部依赖
5. **边界情况**: 测试异常和边界情况
6. **可访问性**: 确保测试覆盖可访问性要求

## 🚨 常见问题

### 测试失败排查

1. **依赖问题**: 确保所有测试依赖已安装
2. **Mock 问题**: 检查 Mock 配置是否正确
3. **异步问题**: 确保正确处理异步操作
4. **环境问题**: 检查测试环境配置

### 性能问题

1. **测试超时**: 增加 `testTimeout` 配置
2. **内存泄漏**: 检查测试清理逻辑
3. **慢测试**: 优化测试逻辑，减少不必要的操作

## 📚 相关资源

- [Jest 官方文档](https://jestjs.io/docs/getting-started)
- [React Testing Library 文档](https://testing-library.com/docs/react-testing-library/intro/)
- [jest-axe 文档](https://github.com/nickcolley/jest-axe)
- [TypeScript Jest 配置](https://jestjs.io/docs/getting-started#using-typescript)
