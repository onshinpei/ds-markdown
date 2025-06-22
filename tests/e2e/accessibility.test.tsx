import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import DsMarkdown from '../../src/index.js';
import { katexPlugin } from '../../src/plugins/index.js';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  describe('Basic Accessibility', () => {
    it('should have no accessibility violations with basic content', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer">
          # Accessible Content This is a paragraph with **bold** and *italic* text.
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with thinking content', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="thinking">
          🤔 Thinking about the question...
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with answer content', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer">
          Here is the answer to your question.
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Semantic Structure', () => {
    it('should render proper heading hierarchy', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          # Main Heading ## Sub Heading ### Sub Sub Heading Regular paragraph content.
        </DsMarkdown>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should render proper list structure', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          - List item 1 - List item 2 - List item 3
        </DsMarkdown>,
      );

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('should render proper table structure', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          | Header 1 | Header 2 | |----------|----------| | Cell 1 | Cell 2 | | Cell 3 | Cell 4 |
        </DsMarkdown>,
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
      expect(screen.getAllByRole('cell')).toHaveLength(4);
    });
  });

  describe('Theme Accessibility', () => {
    it('should maintain accessibility in light theme', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer" theme="light">
          Content in light theme
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should maintain accessibility in dark theme', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer" theme="dark">
          Content in dark theme
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Mathematical Content Accessibility', () => {
    it('should have no accessibility violations with mathematical formulas', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          The formula is: $E = mc^2$
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with block mathematical formulas', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          {`Block formula: $$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$`}
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard navigable', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          # Keyboard Navigation Test This content should be navigable by keyboard.
        </DsMarkdown>,
      );

      const container = screen.getByText('Keyboard Navigation Test').closest('div');
      expect(container).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Screen Reader Support', () => {
    it('should have proper ARIA labels', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          Content for screen readers
        </DsMarkdown>,
      );

      const container = screen.getByText('Content for screen readers').closest('div');
      expect(container).toHaveAttribute('role', 'article');
    });

    it('should have proper live region attributes for thinking content', () => {
      render(
        <DsMarkdown interval={20} answerType="thinking">
          🤔 Thinking...
        </DsMarkdown>,
      );

      const container = screen.getByText('🤔 Thinking...').closest('div');
      expect(container).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Color Contrast', () => {
    it('should maintain sufficient color contrast in light theme', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer" theme="light">
          # Heading with good contrast Regular text with sufficient contrast.
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should maintain sufficient color contrast in dark theme', async () => {
      const { container } = render(
        <DsMarkdown interval={20} answerType="answer" theme="dark">
          # Heading with good contrast Regular text with sufficient contrast.
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Focus Management', () => {
    it('should handle focus properly', () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          Content that can receive focus
        </DsMarkdown>,
      );

      const container = screen.getByText('Content that can receive focus').closest('div');
      if (container) {
        container.focus();
        expect(container).toHaveFocus();
      }
    });
  });

  describe('Responsive Design', () => {
    it('should be accessible on different screen sizes', async () => {
      // Mock different screen sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });

      const { container } = render(
        <DsMarkdown interval={20} answerType="answer">
          Content that adapts to screen size
        </DsMarkdown>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
