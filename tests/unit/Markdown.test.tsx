import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import DsMarkdown from '../../src';

// Mock the plugins
jest.mock('../../src/plugins', () => ({
  katexPlugin: {
    id: Symbol('katex'),
    type: 'buildIn',
    remarkPlugin: jest.fn(),
    rehypePlugin: jest.fn(),
  },
  createBuildInPlugin: jest.fn(),
}));

describe('DsMarkdown Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Debug Rendering', () => {
    it('should show rendered content for debugging', async () => {
      const { container } = render(
        <DsMarkdown interval={5} answerType="answer">
          # Hello World This is a **test** content.
        </DsMarkdown>,
      );

      // 等待组件渲染完成
      await waitFor(
        () => {
          expect(screen.getByText('# Hello World This is a **test** content.')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // 方法1: 使用 screen.debug() 查看渲染的DOM
      console.log('=== Screen Debug ===');
      screen.debug();

      // 方法2: 查看特定元素的HTML
      console.log('=== Container HTML ===');
      console.log(container.innerHTML);

      // 方法3: 查看特定元素的详细信息
      const contentElement = screen.getByText('# Hello World This is a **test** content.');
      console.log('=== Content Element ===');
      console.log(contentElement.outerHTML);

      // 方法4: 查看所有渲染的文本内容
      console.log('=== All Text Content ===');
      const allText = screen.getAllByText(/.*/);
      allText.forEach((element, index) => {
        console.log(`${index}: ${element.textContent}`);
      });

      // 方法5: 查看CSS类名
      console.log('=== CSS Classes ===');
      const thinkingElement = container.querySelector('.ds-markdown-thinking');
      const answerElement = container.querySelector('.ds-markdown-answer');
      console.log('Thinking element:', thinkingElement?.outerHTML);
      console.log('Answer element:', answerElement?.outerHTML);

      expect(screen.getByText('# Hello World This is a **test** content.')).toBeInTheDocument();
    });

    it('should test typing effect with different intervals', async () => {
      const onTypedChar = jest.fn();
      const onStart = jest.fn();
      const onEnd = jest.fn();

      const { container } = render(
        <DsMarkdown interval={50} answerType="answer" onTypedChar={onTypedChar} onStart={onStart} onEnd={onEnd}>
          Hello World
        </DsMarkdown>,
      );

      // 立即检查初始状态
      console.log('=== Initial State ===');
      console.log('Container HTML:', container.innerHTML);
      console.log('onStart called:', onStart.mock.calls.length);
      console.log('onTypedChar called:', onTypedChar.mock.calls.length);
      console.log('onEnd called:', onEnd.mock.calls.length);

      // 等待一段时间后检查状态
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log('=== After 100ms ===');
      console.log('Container HTML:', container.innerHTML);
      console.log('onStart called:', onStart.mock.calls.length);
      console.log('onTypedChar called:', onTypedChar.mock.calls.length);
      console.log('onEnd called:', onEnd.mock.calls.length);

      // 再等待一段时间
      await new Promise((resolve) => setTimeout(resolve, 200));

      console.log('=== After 300ms ===');
      console.log('Container HTML:', container.innerHTML);
      console.log('onStart called:', onStart.mock.calls.length);
      console.log('onTypedChar called:', onTypedChar.mock.calls.length);
      console.log('onEnd called:', onEnd.mock.calls.length);

      // 等待完整内容渲染
      await waitFor(
        () => {
          expect(screen.getByText('Hello World')).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      console.log('=== Final State ===');
      console.log('Container HTML:', container.innerHTML);
      console.log('onStart called:', onStart.mock.calls.length);
      console.log('onTypedChar called:', onTypedChar.mock.calls.length);
      console.log('onEnd called:', onEnd.mock.calls.length);

      // 验证回调被调用
      expect(onStart).toHaveBeenCalled();
      expect(onTypedChar).toHaveBeenCalled();
      expect(onEnd).toHaveBeenCalled();
    });

    it('should test typing effect with requestAnimationFrame', async () => {
      const onTypedChar = jest.fn();
      const onStart = jest.fn();
      const onEnd = jest.fn();

      const { container } = render(
        <DsMarkdown interval={50} timerType="requestAnimationFrame" answerType="answer" onTypedChar={onTypedChar} onStart={onStart} onEnd={onEnd}>
          Hello World
        </DsMarkdown>,
      );

      // 立即检查初始状态
      console.log('=== RAF Initial State ===');
      console.log('Container HTML:', container.innerHTML);
      console.log('onStart called:', onStart.mock.calls.length);
      console.log('onTypedChar called:', onTypedChar.mock.calls.length);

      // 等待一段时间后检查状态
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log('=== RAF After 100ms ===');
      console.log('Container HTML:', container.innerHTML);
      console.log('onStart called:', onStart.mock.calls.length);
      console.log('onTypedChar called:', onTypedChar.mock.calls.length);

      // 等待完整内容渲染
      await waitFor(
        () => {
          expect(screen.getByText('Hello World')).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      console.log('=== RAF Final State ===');
      console.log('Container HTML:', container.innerHTML);
      console.log('onStart called:', onStart.mock.calls.length);
      console.log('onTypedChar called:', onTypedChar.mock.calls.length);
      console.log('onEnd called:', onEnd.mock.calls.length);

      // 验证回调被调用
      expect(onStart).toHaveBeenCalled();
      expect(onTypedChar).toHaveBeenCalled();
      expect(onEnd).toHaveBeenCalled();
    });
  });

  describe('Basic Rendering', () => {
    it('should render basic markdown content', async () => {
      const { container } = render(
        <DsMarkdown interval={5} answerType="answer">
          # Hello World This is a **test** content.
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          console.log(container.innerHTML);
          expect(screen.getByText('Hello World')).toBeInTheDocument();
          expect(screen.getByText('This is a test content.')).toBeInTheDocument();
        },
        { timeout: 5000 },
      );
      console.log(container.innerHTML);
    });

    it('should render with thinking type', async () => {
      render(
        <DsMarkdown interval={5} answerType="thinking">
          🤔 Thinking about the question...
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          const container = screen.getByText('🤔 Thinking about the question...').closest('div');
          expect(container).toHaveClass('ds-markdown-thinking');
        },
        { timeout: 2000 },
      );
    });

    it('should render with answer type', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          Here is the answer.
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          const container = screen.getByText('Here is the answer.').closest('div');
          expect(container).toHaveClass('ds-markdown-answer');
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Props Validation', () => {
    it('should use default props when not provided', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Test content')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should accept custom interval', async () => {
      render(
        <DsMarkdown interval={50} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Test content')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should accept different timer types', async () => {
      const { rerender } = render(
        <DsMarkdown timerType="setTimeout" interval={5} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Test content')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      rerender(
        <DsMarkdown timerType="requestAnimationFrame" interval={5} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Test content')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should accept theme prop', async () => {
      const { rerender } = render(
        <DsMarkdown theme="light" interval={5} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Test content')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      rerender(
        <DsMarkdown theme="dark" interval={5} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Test content')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Callbacks', () => {
    it('should call onStart callback', async () => {
      const onStart = jest.fn();

      render(
        <DsMarkdown interval={10} onStart={onStart} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(onStart).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should call onEnd callback', async () => {
      const onEnd = jest.fn();

      render(
        <DsMarkdown interval={10} onEnd={onEnd} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(onEnd).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should call onTypedChar callback', async () => {
      const onTypedChar = jest.fn();

      render(
        <DsMarkdown interval={10} onTypedChar={onTypedChar} answerType="answer">
          Test
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(onTypedChar).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Markdown Features', () => {
    it('should render headers correctly', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          # Header 1 ## Header 2 ### Header 3
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Header 1')).toBeInTheDocument();
          expect(screen.getByText('Header 2')).toBeInTheDocument();
          expect(screen.getByText('Header 3')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should render bold and italic text', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          This is **bold** and *italic* text.
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          const boldElement = screen.getByText('bold');
          const italicElement = screen.getByText('italic');

          expect(boldElement.tagName).toBe('STRONG');
          expect(italicElement.tagName).toBe('EM');
        },
        { timeout: 2000 },
      );
    });

    it('should render lists correctly', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          - Item 1 - Item 2 - Item 3
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Item 1')).toBeInTheDocument();
          expect(screen.getByText('Item 2')).toBeInTheDocument();
          expect(screen.getByText('Item 3')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should render code blocks', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          ```javascript const hello = 'world'; console.log(hello); ```
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(screen.getByText("const hello = 'world';")).toBeInTheDocument();
          expect(screen.getByText('console.log(hello);')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Empty Content', () => {
    it('should handle empty content', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          {''}
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(document.querySelector('.ds-markdown-paragraph')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should handle whitespace only content', async () => {
      render(
        <DsMarkdown interval={5} answerType="answer">
          {' '}
        </DsMarkdown>,
      );

      await waitFor(
        () => {
          expect(document.querySelector('.ds-markdown-paragraph')).toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  });
});
