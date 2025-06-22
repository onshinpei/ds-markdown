import { replaceMathBracket } from '../../src/utils/remarkMathBracket';

describe('replaceMathBracket', () => {
  describe('Inline Math Conversion', () => {
    it('should convert \\(...\\) to $...$', () => {
      const input = 'This is an inline formula: \\(a + b = c\\) and another \\(x^2 + y^2 = z^2\\)';
      const expected = 'This is an inline formula: $a + b = c$ and another $x^2 + y^2 = z^2$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle single inline formula', () => {
      const input = 'Formula: \\(E = mc^2\\)';
      const expected = 'Formula: $E = mc^2$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle inline formula at start', () => {
      const input = '\\(a + b\\) is the sum';
      const expected = '$a + b$ is the sum';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle inline formula at end', () => {
      const input = 'The result is \\(c\\)';
      const expected = 'The result is $c$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });
  });

  describe('Block Math Conversion', () => {
    it('should convert [...] to $$...$$', () => {
      const input = 'Block formula:\n\\[\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\]\nEnd';
      const expected = 'Block formula:\n$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$\nEnd';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle single block formula', () => {
      const input = '\\[a^2 + b^2 = c^2\\]';
      const expected = '$$a^2 + b^2 = c^2$$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle block formula with newlines', () => {
      const input = 'Before\n\\[\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n\\]\nAfter';
      const expected = 'Before\n$$\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n$$\nAfter';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });
  });

  describe('Mixed Content', () => {
    it('should handle both inline and block formulas', () => {
      const input = 'Inline: \\(a + b\\) and block:\n\\[\\int f(x) dx\\]';
      const expected = 'Inline: $a + b$ and block:\n$$\\int f(x) dx$$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle multiple formulas of both types', () => {
      const input = 'First inline: \\(x\\) then block: \\[y\\] then inline: \\(z\\)';
      const expected = 'First inline: $x$ then block: $$y$$ then inline: $z$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty formulas', () => {
      const input = 'Empty inline: \\(\\) and empty block: \\[\\]';
      const expected = 'Empty inline: $$ and empty block: $$$$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle escaped backslashes', () => {
      const input = 'Escaped: \\\\(a + b\\\\) and \\\\[c + d\\\\]';
      const expected = 'Escaped: \\\\(a + b\\\\) and \\\\[c + d\\\\]';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle unmatched delimiters', () => {
      const input = 'Unmatched: \\(a + b and \\[c + d';
      const expected = 'Unmatched: \\(a + b and \\[c + d';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle nested delimiters', () => {
      const input = 'Nested: \\(a + \\[b\\] + c\\)';
      const expected = 'Nested: $a + \\[b\\] + c$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });
  });

  describe('Complex Mathematical Expressions', () => {
    it('should handle complex inline formulas', () => {
      const input = 'Complex: \\(\\frac{a + b}{c} = \\sqrt{d^2 + e^2}\\)';
      const expected = 'Complex: $\\frac{a + b}{c} = \\sqrt{d^2 + e^2}$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle complex block formulas', () => {
      const input = 'Complex block:\n\\[\\sum_{i=1}^{n} \\frac{x_i^2}{\\sigma_i^2} = \\chi^2\\]';
      const expected = 'Complex block:\n$$\\sum_{i=1}^{n} \\frac{x_i^2}{\\sigma_i^2} = \\chi^2$$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });

    it('should handle formulas with special characters', () => {
      const input = 'Special: \\(\\alpha + \\beta = \\gamma\\) and \\[\\delta \\cdot \\epsilon = \\zeta\\]';
      const expected = 'Special: $\\alpha + \\beta = \\gamma$ and $$\\delta \\cdot \\epsilon = \\zeta$$';

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });
  });

  describe('Performance', () => {
    it('should handle large text efficiently', () => {
      const largeText = 'A'.repeat(10000) + ' \\(a + b\\) ' + 'B'.repeat(10000);
      const startTime = Date.now();

      const result = replaceMathBracket(largeText);
      const endTime = Date.now();

      expect(result).toContain('$a + b$');
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle many formulas efficiently', () => {
      const manyFormulas = Array.from({ length: 100 }, (_, i) => `\\(formula_${i}\\)`).join(' ');
      const startTime = Date.now();

      const result = replaceMathBracket(manyFormulas);
      const endTime = Date.now();

      expect(result).toContain('$formula_0$');
      expect(result).toContain('$formula_99$');
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });
  });

  describe('Real-world Examples', () => {
    it('should handle typical mathematical content', () => {
      const input = `# Mathematical Document

This document contains various mathematical expressions.

## Inline Examples
The quadratic formula is \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).

## Block Examples
The integral of a Gaussian function:

\\[\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\]

## Mixed Content
We can combine inline \\(\\alpha\\) and block \\[\\beta\\] formulas.`;

      const expected = `# Mathematical Document

This document contains various mathematical expressions.

## Inline Examples
The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.

## Block Examples
The integral of a Gaussian function:

$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

## Mixed Content
We can combine inline $\\alpha$ and block $$\\beta$$ formulas.`;

      const result = replaceMathBracket(input);
      expect(result).toBe(expected);
    });
  });
});
