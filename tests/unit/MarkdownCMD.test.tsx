import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MarkdownCMD, MarkdownCMDRef } from '../../src';

describe('MarkdownCMD Component', () => {
  let markdownRef: React.RefObject<MarkdownCMDRef | null>;

  beforeEach(() => {
    markdownRef = React.createRef<MarkdownCMDRef | null>();
  });

  describe('Imperative API', () => {
    it('should render empty initially', () => {
      render(<MarkdownCMD ref={markdownRef} interval={20} />);

      // Should render without errors
      expect(document.querySelector('.ds-markdown-paragraph')).toBeInTheDocument();
    });

    it('should push content and start typing', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('Hello World', 'answer');
      });

      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument();
      });
    });

    it('should push multiple chunks', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('Hello', 'answer');
        markdownRef.current?.push(' World', 'answer');
      });

      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument();
      });
    });

    it('should clear content', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('Hello World', 'answer');
      });

      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument();
      });

      act(() => {
        markdownRef.current?.clear();
      });

      // Content should be cleared
      expect(screen.queryByText('Hello World')).not.toBeInTheDocument();
    });

    it('should handle thinking type', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('🤔 Thinking...', 'thinking');
      });

      await waitFor(() => {
        const container = screen.getByText('🤔 Thinking...').closest('div');
        expect(container).toHaveClass('ds-markdown-thinking');
      });
    });

    it('should handle answer type', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('Here is the answer.', 'answer');
      });

      await waitFor(() => {
        const container = screen.getByText('Here is the answer.').closest('div');
        expect(container).toHaveClass('ds-markdown-answer');
      });
    });
  });

  describe('Stop and Resume', () => {
    it('should stop typing animation', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('Long content that takes time to type', 'answer');
      });

      // Wait a bit for typing to start
      await new Promise((resolve) => setTimeout(resolve, 50));

      act(() => {
        markdownRef.current?.stop();
      });

      // Should not throw error
      expect(markdownRef.current?.stop).toBeDefined();
    });

    it('should resume typing animation', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('Long content that takes time to type', 'answer');
      });

      // Wait a bit for typing to start
      await new Promise((resolve) => setTimeout(resolve, 50));

      act(() => {
        markdownRef.current?.stop();
        markdownRef.current?.resume();
      });

      // Should not throw error
      expect(markdownRef.current?.resume).toBeDefined();
    });
  });

  describe('Callbacks', () => {
    it('should call onStart callback', async () => {
      const onStart = jest.fn();

      render(<MarkdownCMD ref={markdownRef} interval={10} onStart={onStart} />);

      act(() => {
        markdownRef.current?.push('Test content', 'answer');
      });

      await waitFor(() => {
        expect(onStart).toHaveBeenCalled();
      });
    });

    it('should call onEnd callback', async () => {
      const onEnd = jest.fn();

      render(<MarkdownCMD ref={markdownRef} interval={10} onEnd={onEnd} />);

      act(() => {
        markdownRef.current?.push('Short', 'answer');
      });

      await waitFor(
        () => {
          expect(onEnd).toHaveBeenCalled();
        },
        { timeout: 5000 },
      );
    });

    it('should call onTypedChar callback', async () => {
      const onTypedChar = jest.fn();

      render(<MarkdownCMD ref={markdownRef} interval={10} onTypedChar={onTypedChar} />);

      act(() => {
        markdownRef.current?.push('Test', 'answer');
      });

      await waitFor(() => {
        expect(onTypedChar).toHaveBeenCalled();
      });
    });
  });

  describe('Manual End Trigger', () => {
    it('should trigger end callback manually', async () => {
      const onEnd = jest.fn();

      render(<MarkdownCMD ref={markdownRef} interval={10} onEnd={onEnd} />);

      act(() => {
        markdownRef.current?.triggerWholeEnd();
      });

      await waitFor(() => {
        expect(onEnd).toHaveBeenCalled();
      });
    });
  });

  describe('Timer Types', () => {
    it('should work with setTimeout timer', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} timerType="setTimeout" />);

      act(() => {
        markdownRef.current?.push('Test content', 'answer');
      });

      await waitFor(() => {
        expect(screen.getByText('Test content')).toBeInTheDocument();
      });
    });

    it('should work with requestAnimationFrame timer', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" />);

      act(() => {
        markdownRef.current?.push('Test content', 'answer');
      });

      await waitFor(() => {
        expect(screen.getByText('Test content')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string push', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('', 'answer');
      });

      // Should not throw error
      expect(markdownRef.current?.push).toBeDefined();
    });

    it('should handle multiple rapid pushes', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        for (let i = 0; i < 10; i++) {
          markdownRef.current?.push(`Chunk ${i} `, 'answer');
        }
      });

      await waitFor(() => {
        expect(screen.getByText(/Chunk/)).toBeInTheDocument();
      });
    });

    it('should handle clear during typing', async () => {
      render(<MarkdownCMD ref={markdownRef} interval={10} />);

      act(() => {
        markdownRef.current?.push('Long content', 'answer');
      });

      // Wait a bit for typing to start
      await new Promise((resolve) => setTimeout(resolve, 50));

      act(() => {
        markdownRef.current?.clear();
      });

      // Should not throw error
      expect(markdownRef.current?.clear).toBeDefined();
    });
  });
});
