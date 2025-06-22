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

  describe('Basic Rendering', () => {
    it('should render basic markdown content', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          # Hello World This is a **test** content.
        </DsMarkdown>,
      );

      expect(screen.getByText('Hello World')).toBeInTheDocument();
      expect(screen.getByText('This is a test content.')).toBeInTheDocument();
    });

    it('should render with thinking type', () => {
      render(
        <DsMarkdown interval={20} answerType="thinking">
          🤔 Thinking about the question...
        </DsMarkdown>,
      );

      const container = screen.getByText('🤔 Thinking about the question...').closest('div');
      expect(container).toHaveClass('ds-markdown-thinking');
    });

    it('should render with answer type', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          Here is the answer.
        </DsMarkdown>,
      );

      const container = screen.getByText('Here is the answer.').closest('div');
      expect(container).toHaveClass('ds-markdown-answer');
    });
  });

  describe('Props Validation', () => {
    it('should use default props when not provided', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      // Should render without errors
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should accept custom interval', () => {
      render(
        <DsMarkdown interval={50} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should accept different timer types', () => {
      const { rerender } = render(
        <DsMarkdown timerType="setTimeout" interval={20} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();

      rerender(
        <DsMarkdown timerType="requestAnimationFrame" interval={20} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should accept theme prop', () => {
      const { rerender } = render(
        <DsMarkdown theme="light" interval={20} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();

      rerender(
        <DsMarkdown theme="dark" interval={20} answerType="answer">
          Test content
        </DsMarkdown>,
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
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

      await waitFor(() => {
        expect(onStart).toHaveBeenCalled();
      });
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
        { timeout: 5000 },
      );
    });

    it('should call onTypedChar callback', async () => {
      const onTypedChar = jest.fn();

      render(
        <DsMarkdown interval={10} onTypedChar={onTypedChar} answerType="answer">
          Test
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(onTypedChar).toHaveBeenCalled();
      });
    });
  });

  describe('Markdown Features', () => {
    it('should render headers correctly', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          # Header 1 ## Header 2 ### Header 3
        </DsMarkdown>,
      );

      expect(screen.getByText('Header 1')).toBeInTheDocument();
      expect(screen.getByText('Header 2')).toBeInTheDocument();
      expect(screen.getByText('Header 3')).toBeInTheDocument();
    });

    it('should render bold and italic text', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          This is **bold** and *italic* text.
        </DsMarkdown>,
      );

      const boldElement = screen.getByText('bold');
      const italicElement = screen.getByText('italic');

      expect(boldElement.tagName).toBe('STRONG');
      expect(italicElement.tagName).toBe('EM');
    });

    it('should render lists correctly', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          - Item 1 - Item 2 - Item 3
        </DsMarkdown>,
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should render code blocks', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          ```javascript const hello = 'world'; console.log(hello); ```
        </DsMarkdown>,
      );

      expect(screen.getByText("const hello = 'world';")).toBeInTheDocument();
      expect(screen.getByText('console.log(hello);')).toBeInTheDocument();
    });
  });

  describe('Empty Content', () => {
    it('should handle empty content', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          {''}
        </DsMarkdown>,
      );

      // Should render without errors
      expect(document.querySelector('.ds-markdown-paragraph')).toBeInTheDocument();
    });

    it('should handle whitespace only content', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          {' '}
        </DsMarkdown>,
      );

      // Should render without errors
      expect(document.querySelector('.ds-markdown-paragraph')).toBeInTheDocument();
    });
  });
});
