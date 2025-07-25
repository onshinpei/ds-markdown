import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * 判断字符串中是否包含标准 Markdown 超链接 [xxx](yyy)
 * 只考虑与数学公式 \[...\] 冲突的部分即可
 *
 * @param value 要检查的字符串
 * @returns 如果包含标准 Markdown 链接返回 true，否则返回 false
 */
const isMarkdownBracketHyperlink = (value: string): boolean => {
  // 标准 Markdown 链接格式：[text](url) 或 [text](url "title")
  // 只检测这种格式，避免与数学公式 \[...\] 冲突
  const standardLinkRegex = /\[[^\]]+\]\([^)]+\)/;
  return standardLinkRegex.test(value);
};

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

/**
 * 将括号格式的数学公式转换为美元符号格式
 * 支持以下转换：
 * - \(...\) → $...$ (行内公式)
 * - \[...\] → $$...$$ (块级公式)
 *
 * 特殊处理：
 * - 如果文本包含 Markdown 超链接，则跳过转换以避免误处理
 * - 使用占位符机制保护块级公式内的括号不被误转换
 *
 * @param value 要转换的字符串
 * @returns 转换后的字符串
 */
export const replaceMathBracket = (value: string) => {
  // 如果包含 Markdown 链接，直接返回原值，不做处理
  // 这避免了将链接中的括号误识别为数学公式分隔符
  if (isMarkdownBracketHyperlink(value)) {
    return value;
  }

  // 1. 提取所有块级公式内容，临时替换为占位符
  // 处理 \[...\] 格式的块级公式
  const blockMatches: string[] = [];
  let replaced = value.replace(/\\*\[([\s\S]+?)\\*\]/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // 处理 $$...$$ 格式的块级公式（兼容性处理）
  replaced = replaced.replace(/\$\$([\s\S]+?)\$\$/g, (_m, p1) => {
    blockMatches.push(p1);
    return `__BLOCK_MATH_${blockMatches.length - 1}__`;
  });

  // 2. 替换块级公式外部的 \(...\) 为 $...$（行内公式）
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
