import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * remark 插件：将 \[...\] 转换为 $$...$$，\(...\) 转换为 $...$，以便 remark-math 能识别。
 */
const remarkMathBracket: Plugin = () => (tree, file) => {
  visit(tree, 'text', (node: any) => {
    const value = node.value;

    if (typeof value === 'string') {
      node.value = replaceMathBracket(value);
    }
  });
};

export const replaceMathBracket = (value: string) => {
  return value
    .replace(/\[([\s\S]+?)\]/g, (_match, p1) => {
      return `$$${p1}$$`;
    })
    .replace(/\(([\s\S]+?)\)/g, (_match, p1) => {
      return `$${p1}$`;
    });
};

export default remarkMathBracket;
