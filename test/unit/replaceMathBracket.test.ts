import { replaceMathBracket } from '../../src/utils/remarkMathBracket';

describe('replaceMathBracket', () => {
  describe('inline math conversion', () => {
    it('should convert \\(...\\) to $...$', () => {
      const input = '\\(x + y\\)';
      const result = replaceMathBracket(input);
      expect(result).toBe('$x + y$');
    });

    it('should convert multiple inline formulas', () => {
      const input = '\\(a\\) and \\(b\\)';
      const result = replaceMathBracket(input);
      expect(result).toBe('$a$ and $b$');
    });

    it('should handle complex inline formula', () => {
      const input = '\\(\\frac{a}{b}\\)';
      const result = replaceMathBracket(input);
      expect(result).toBe('$\\frac{a}{b}$');
    });
  });

  describe('block math conversion', () => {
    it('should convert \\[...\\] to $$...$$', () => {
      const input = '\\[x + y\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('$$x + y$$');
    });

    it('should handle multiline block formula', () => {
      const input = '\\[\na + b\n\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('$$\na + b\n$$');
    });

    it('should preserve existing $$ format', () => {
      const input = '$$x + y$$';
      const result = replaceMathBracket(input);
      expect(result).toBe('$$x + y$$');
    });
  });

  describe('mixed content', () => {
    it('should handle both inline and block formulas', () => {
      const input = 'Inline \\(x\\) and block \\[y\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('Inline $x$ and block $$y$$');
    });

    it('should preserve parentheses inside block formulas', () => {
      const input = '\\[f(x) + g(y)\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('$$f(x) + g(y)$$');
    });

    it('should handle text without math', () => {
      const input = 'Hello World';
      const result = replaceMathBracket(input);
      expect(result).toBe('Hello World');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const result = replaceMathBracket('');
      expect(result).toBe('');
    });

    it('should handle nested parentheses in block math', () => {
      const input = '\\[\\sum_{i=1}^{n}(x_i + y_i)\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('$$\\sum_{i=1}^{n}(x_i + y_i)$$');
    });

    it('should handle multiple backslashes', () => {
      const input = '\\\\(x\\\\)';
      const result = replaceMathBracket(input);
      expect(result).toBe('$x$');
    });

    it('should handle formula with spaces', () => {
      const input = '\\( x + y \\)';
      const result = replaceMathBracket(input);
      expect(result).toBe('$ x + y $');
    });

    it('should handle complex mathematical expression', () => {
      const input = '\\[\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('$$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$');
    });

    it('should handle matrix notation', () => {
      const input = '\\[\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$');
    });
  });

  describe('real-world examples', () => {
    it('should handle inline math in paragraph', () => {
      const input = 'The formula \\(E = mc^2\\) is famous.';
      const result = replaceMathBracket(input);
      expect(result).toBe('The formula $E = mc^2$ is famous.');
    });

    it('should handle block math between paragraphs', () => {
      const input = 'Consider the equation:\n\\[ax^2 + bx + c = 0\\]\nThis is a quadratic equation.';
      const result = replaceMathBracket(input);
      expect(result).toBe('Consider the equation:\n$$ax^2 + bx + c = 0$$\nThis is a quadratic equation.');
    });

    it('should handle multiple formulas in complex text', () => {
      const input = 'Given \\(a > 0\\) and \\(b > 0\\), we have:\n\\[\\sqrt{ab} \\leq \\frac{a+b}{2}\\]';
      const result = replaceMathBracket(input);
      expect(result).toBe('Given $a > 0$ and $b > 0$, we have:\n$$\\sqrt{ab} \\leq \\frac{a+b}{2}$$');
    });
  });
});
