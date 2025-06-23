import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * remark 插件：将 \[...\] 转换为 $$...$$，\(...\) 转换为 $...$，以便 remark-math 能识别。
 */
const remarkMathBracket: Plugin = () => (tree, file) => {
  visit(tree, 'text', (node: { value: string }) => {
    const value = node.value;

    if (typeof value === 'string') {
      node.value = replaceMathBracket(value);
    }
  });
};

export const replaceMathBracket = (value: string) => {
  // 1. 提取所有块级公式内容，临时替换为占位符, [...]
  const blockMatches: string[] = [];
  let replaced = value.replace(/\\*\[([\s\S]+?)\\*\]/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // 也需要兼容 $$ xxxx $$ 这种写法
  replaced = replaced.replace(/\$\$([\s\S]+?)\$\$/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // 2. 替换块级公式外部的 ( ... ) 为 $...$
  replaced = replaced.replace(/\\*\(([^)]+?)\\*\)/g, (_m, p1) => {
    return '$' + p1 + '$';
  });

  // 3. 还原块级公式内容，保持其内部小括号原样
  replaced = replaced.replace(/__BLOCK_MATH_(\d+)__/g, (_m, idx) => {
    return '$$' + blockMatches[Number(idx)] + '$$';
  });

  return replaced;
};

export default remarkMathBracket;
