import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * remark plugin: Convert \[...\] to $$...$$, \(...\) to $...$, so that remark-math can recognize them.
 */
const remarkMathBracket: Plugin = () => (tree, file) => {
  visit(tree, 'text', (node: { value: string }) => {
    const value = node.value;

    if (typeof value === 'string') {
      node.value = replaceMathBracket(value);
    }
  });
};

/**
 * Convert bracket-formatted math formulas to dollar sign format
 * Supports the following conversions:
 * - \(...\) → $...$ (inline formula)
 * - \[...\] → $$...$$ (block formula)
 *
 * Special handling:
 * - If text contains Markdown links, skip conversion to avoid misprocessing
 * - Use placeholder mechanism to protect brackets inside block formulas from being mis-converted
 *
 * @param value String to convert
 * @returns Converted string
 */
export const replaceMathBracket = (value: string) => {
  // 1. Extract all block formula content, temporarily replace with placeholder, [...]
  const blockMatches: string[] = [];
  let replaced = value.replace(/\\+\[([\s\S]+?)\\+\]/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // Also need to support $$ xxxx $$ format
  replaced = replaced.replace(/\$\$([\s\S]+?)\$\$/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // 2. Replace ( ... ) outside block formulas with $...$
  replaced = replaced.replace(/\\+\(([^)]+?)\\+\)/g, (_m, p1) => {
    return '$' + p1 + '$';
  });

  // 3. Restore block formula content, keep internal parentheses unchanged
  replaced = replaced.replace(/__BLOCK_MATH_(\d+)__/g, (_m, idx) => {
    return '$$' + blockMatches[Number(idx)] + '$$';
  });

  return replaced;
};

export default remarkMathBracket;
