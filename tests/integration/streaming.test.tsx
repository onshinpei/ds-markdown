import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MarkdownCMD, MarkdownCMDRef } from '../../src';

describe('Streaming Integration Tests', () => {
  let markdownRef: React.RefObject<MarkdownCMDRef | null>;

  beforeEach(() => {
    markdownRef = React.createRef<MarkdownCMDRef | null>();
  });

  describe('AI Chat Simulation', () => {
    it('should simulate complete AI conversation flow', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      // Simulate thinking phase
      markdownRef.current?.push('🤔 Analyzing your question...', 'thinking');
      await new Promise((resolve) => setTimeout(resolve, 100));

      markdownRef.current?.push('\n\n✅ Analysis complete, starting to answer', 'thinking');
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Simulate streaming answer
      const answerChunks = [
        '# React 19 New Features\n\n',
        '## 🚀 React Compiler\n',
        'The biggest highlight of React 19 is the introduction of **React Compiler**:\n\n',
        '- 🎯 **Automatic Optimization**: No need for manual memo and useMemo\n',
        '- ⚡ **Performance Boost**: Compile-time optimization, zero runtime overhead\n',
        '- 🔧 **Backward Compatible**: No need to modify existing code\n\n',
        '## 📝 Actions Simplify Forms\n',
        'The new Actions API makes form handling simpler:\n\n',
        '```tsx\n',
        'function ContactForm({ action }) {\n',
        '  const [state, formAction] = useActionState(action, null);\n',
        '  return (\n',
        '    <form action={formAction}>\n',
        '      <input name="email" type="email" />\n',
        '      <button>Submit</button>\n',
        '    </form>\n',
        '  );\n',
        '}\n',
        '```\n\n',
        'Hope this answer helps you! 🎉',
      ];

      for (const chunk of answerChunks) {
        markdownRef.current?.push(chunk, 'answer');
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      await waitFor(
        () => {
          expect(screen.getByText('React 19 New Features')).toBeInTheDocument();
          expect(screen.getByText('React Compiler')).toBeInTheDocument();
          expect(screen.getByText('Actions Simplify Forms')).toBeInTheDocument();
          expect(screen.getByText('Hope this answer helps you! 🎉')).toBeInTheDocument();
        },
        { timeout: 10000 },
      );
    });

    it('should handle conversation interruption and resume', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      // Start typing
      markdownRef.current?.push('This is a long response that will be interrupted', 'answer');

      // Wait a bit for typing to start
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Interrupt typing
      markdownRef.current?.stop();

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Resume typing
      markdownRef.current?.resume();

      // Add more content
      markdownRef.current?.push(' and then continued after interruption.', 'answer');

      await waitFor(
        () => {
          expect(screen.getByText(/This is a long response/)).toBeInTheDocument();
          expect(screen.getByText(/and then continued/)).toBeInTheDocument();
        },
        { timeout: 10000 },
      );
    });
  });

  describe('Mathematical Formula Streaming', () => {
    it('should handle streaming mathematical content', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      const mathChunks = [
        '# Pythagorean Theorem Explanation\n\n',
        'In a right triangle, the square of the hypotenuse equals the sum of squares of the two legs:\n\n',
        '$a^2 + b^2 = c^2$\n\n',
        'Where:\n',
        '- $a$ and $b$ are the legs\n',
        '- $c$ is the hypotenuse\n\n',
        'For the classic "3-4-5" triangle:\n',
        '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
        'This theorem has wide applications in geometry!',
      ];

      for (const chunk of mathChunks) {
        markdownRef.current?.push(chunk, 'answer');
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      await waitFor(
        () => {
          expect(screen.getByText('Pythagorean Theorem Explanation')).toBeInTheDocument();
          expect(screen.getByText('In a right triangle, the square of the hypotenuse equals the sum of squares of the two legs:')).toBeInTheDocument();
          expect(screen.getByText('Where:')).toBeInTheDocument();
          expect(screen.getByText('This theorem has wide applications in geometry!')).toBeInTheDocument();
        },
        { timeout: 10000 },
      );
    });
  });

  describe('Complex Markdown Streaming', () => {
    it('should handle complex markdown with mixed content', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      const complexChunks = [
        '# Complete Guide to Modern Web Development\n\n',
        '## 🎯 Frontend Frameworks\n\n',
        '### React\n',
        'React is a **declarative** library for building user interfaces.\n\n',
        '**Key Features:**\n',
        '- Component-based architecture\n',
        '- Virtual DOM for performance\n',
        '- Rich ecosystem\n\n',
        '### Vue.js\n',
        'Vue.js is a *progressive* framework for building user interfaces.\n\n',
        '## 🔧 Backend Technologies\n\n',
        '### Node.js\n',
        '```javascript\n',
        "const express = require('express');\n",
        'const app = express();\n',
        "app.get('/', (req, res) => {\n",
        "  res.send('Hello World!');\n",
        '});\n',
        '```\n\n',
        '## 📊 Data Visualization\n\n',
        '| Framework | Use Case | Popularity |\n',
        '|-----------|----------|------------|\n',
        '| D3.js | Custom charts | High |\n',
        '| Chart.js | Simple charts | Very High |\n',
        '| Plotly | Scientific plots | Medium |\n\n',
        '> **Note:** Choose the right tool for your specific needs.\n\n',
        'This guide covers the essential tools for modern web development! 🚀',
      ];

      for (const chunk of complexChunks) {
        markdownRef.current?.push(chunk, 'answer');
        await new Promise((resolve) => setTimeout(resolve, 30));
      }

      await waitFor(
        () => {
          expect(screen.getByText('Complete Guide to Modern Web Development')).toBeInTheDocument();
          expect(screen.getByText('Frontend Frameworks')).toBeInTheDocument();
          expect(screen.getByText('React')).toBeInTheDocument();
          expect(screen.getByText('Vue.js')).toBeInTheDocument();
          expect(screen.getByText('Backend Technologies')).toBeInTheDocument();
          expect(screen.getByText('Node.js')).toBeInTheDocument();
          expect(screen.getByText('Data Visualization')).toBeInTheDocument();
          expect(screen.getByText('This guide covers the essential tools for modern web development! 🚀')).toBeInTheDocument();
        },
        { timeout: 15000 },
      );
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle very fast streaming', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={1} />);

      const fastChunks = Array.from({ length: 100 }, (_, i) => `Chunk ${i} `);

      for (const chunk of fastChunks) {
        markdownRef.current?.push(chunk, 'answer');
      }

      await waitFor(
        () => {
          expect(screen.getByText(/Chunk/)).toBeInTheDocument();
        },
        { timeout: 10000 },
      );
    });

    it('should handle very slow streaming', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={100} />);

      const slowChunks = ['Hello', ' ', 'World', '!'];

      for (const chunk of slowChunks) {
        markdownRef.current?.push(chunk, 'answer');
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      await waitFor(
        () => {
          expect(screen.getByText('Hello World!')).toBeInTheDocument();
        },
        { timeout: 10000 },
      );
    });

    it('should handle empty chunks gracefully', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      markdownRef.current?.push('Start', 'answer');
      markdownRef.current?.push('', 'answer');
      markdownRef.current?.push('End', 'answer');

      await waitFor(() => {
        expect(screen.getByText('StartEnd')).toBeInTheDocument();
      });
    });

    it('should handle large content chunks', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      const largeChunk = 'A'.repeat(1000);
      markdownRef.current?.push(largeChunk, 'answer');

      await waitFor(
        () => {
          expect(screen.getByText(largeChunk)).toBeInTheDocument();
        },
        { timeout: 10000 },
      );
    });
  });

  describe('Theme and Styling', () => {
    it('should maintain styling during streaming', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} theme="dark" />);

      markdownRef.current?.push('# Dark Theme Test\n\nThis is **bold** and *italic* text.', 'answer');

      await waitFor(() => {
        const container = screen.getByText('Dark Theme Test').closest('div');
        expect(container).toHaveAttribute('data-theme', 'dark');
      });
    });

    it('should handle theme switching during streaming', async () => {
      const { rerender } = render(<MarkdownCMD ref={markdownRef} interval={10} theme="light" />);

      markdownRef.current?.push('Content in light theme', 'answer');

      await waitFor(() => {
        const container = screen.getByText('Content in light theme').closest('div');
        expect(container).toHaveAttribute('data-theme', 'light');
      });

      // Switch to dark theme
      rerender(<MarkdownCMD ref={markdownRef} interval={10} theme="dark" />);

      markdownRef.current?.push('Content in dark theme', 'answer');

      await waitFor(() => {
        const container = screen.getByText('Content in dark theme').closest('div');
        expect(container).toHaveAttribute('data-theme', 'dark');
      });
    });
  });
});
