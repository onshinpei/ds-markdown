import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DsMarkdown from '../../src';
import { katexPlugin, createBuildInPlugin } from '../../src/plugins';

// Mock KaTeX rendering
jest.mock('katex', () => ({
  renderToString: jest.fn((formula) => `<span class="katex">${formula}</span>`),
}));

describe('Plugin System', () => {
  describe('KaTeX Plugin', () => {
    it('should render mathematical formulas with dollar syntax', async () => {
      render(
        <DsMarkdown interval={20} plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }} answerType="answer">
          The formula is: $E = mc^2$
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('The formula is:')).toBeInTheDocument();
      });
    });

    it('should render mathematical formulas with bracket syntax', async () => {
      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'bracket' }}>
          The formula is: \(a^2 + b^2 = c^2\)
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('The formula is:')).toBeInTheDocument();
      });
    });

    it('should render block mathematical formulas', async () => {
      const str = ' Block formula:\n$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$';
      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          {str}
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Block formula:')).toBeInTheDocument();
      });
    });

    it('should handle mixed content with formulas', async () => {
      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          # Pythagorean Theorem In a right triangle: $a^2 + b^2 = c^2$ Where $a$ and $b$ are legs, $c$ is hypotenuse.
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Pythagorean Theorem')).toBeInTheDocument();
        expect(screen.getByText('In a right triangle:')).toBeInTheDocument();
        expect(screen.getByText('Where')).toBeInTheDocument();
      });
    });

    it('should not render formulas without plugin', async () => {
      render(
        <DsMarkdown interval={20} answerType="answer" math={{ splitSymbol: 'dollar' }}>
          The formula is: $E = mc^2$
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('The formula is: $E = mc^2$')).toBeInTheDocument();
      });
    });
  });

  describe('Plugin Creation', () => {
    it('should create custom plugin', () => {
      const mockRemarkPlugin = jest.fn();
      const mockRehypePlugin = jest.fn();
      const pluginId = Symbol('custom-plugin');

      const customPlugin = createBuildInPlugin({
        remarkPlugin: mockRemarkPlugin,
        rehypePlugin: mockRehypePlugin,
        id: pluginId,
      });

      expect(customPlugin).toEqual({
        type: 'buildIn',
        remarkPlugin: mockRemarkPlugin,
        rehypePlugin: mockRehypePlugin,
        id: pluginId,
      });
    });

    it('should create plugin without optional parameters', () => {
      const customPlugin = createBuildInPlugin({});

      expect(customPlugin).toEqual({
        type: 'buildIn',
        remarkPlugin: undefined,
        rehypePlugin: undefined,
        id: undefined,
      });
    });
  });

  describe('Multiple Plugins', () => {
    it('should work with multiple plugins', async () => {
      const customPlugin = createBuildInPlugin({
        id: Symbol('custom'),
      });

      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin, customPlugin]} math={{ splitSymbol: 'dollar' }}>
          Content with $E = mc^2$ formula
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Content with')).toBeInTheDocument();
      });
    });
  });

  describe('Plugin Configuration', () => {
    it('should handle empty plugins array', async () => {
      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[]}>
          Regular content without plugins
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Regular content without plugins')).toBeInTheDocument();
      });
    });

    it('should handle undefined plugins', async () => {
      render(
        <DsMarkdown interval={20} answerType="answer">
          Regular content without plugins
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Regular content without plugins')).toBeInTheDocument();
      });
    });
  });

  describe('Mathematical Formula Edge Cases', () => {
    it('should handle incomplete formulas', async () => {
      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          Incomplete: $a + b
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Incomplete: $a + b')).toBeInTheDocument();
      });
    });

    it('should handle nested formulas', async () => {
      const md = 'Nested: $f(x) = \\sum_{(i = 1)}^{n} x_i^2$';
      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          {md}
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Nested:')).toBeInTheDocument();
      });
    });

    it('should handle formulas with special characters', async () => {
      render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          Special: $\alpha + \beta = \gamma$
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Special:')).toBeInTheDocument();
      });
    });
  });

  describe('Streaming Mathematical Formulas', () => {
    it('should handle streaming formulas', async () => {
      const { rerender } = render(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          Formula: $E = mc^2$
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Formula:')).toBeInTheDocument();
      });

      // Simulate streaming update
      rerender(
        <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
          Formula: $E = mc^2$ and $F = ma$
        </DsMarkdown>,
      );

      await waitFor(() => {
        expect(screen.getByText('Formula:')).toBeInTheDocument();
        expect(screen.getByText('and')).toBeInTheDocument();
      });
    });
  });
});
