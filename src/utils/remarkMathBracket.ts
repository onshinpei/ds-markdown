import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * remark 插件：将 \[...\] 转换为 $$...$$，\(...\) 转换为 $...$，以便 remark-math 能识别。
 */
const remarkMathBracket: Plugin = () => (tree, file) => {
  //   if (typeof file.value === 'string') {
  //     let content = file.value as string;
  //     // 替换 \[ ... \] 为 $$ ... $$
  //     content = content.replace(/\\\[([\s\S]+?)\\\]/g, (_match, p1) => `$$${p1}$$`);
  //     // 替换 \\(...\\) 为 $...$
  //     content = content.replace(/\\\(([\s\S]+?)\\\)/g, (_match, p1) => `$${p1}$`);
  //     file.value = content;
  //   }

  visit(tree, 'text', (node: any) => {
    const value = node.value;
    let newValue = '';
    if (typeof value === 'string') {
      // 替换 \[ ... \] 为 $$ ... $$
      newValue = value.replace(/\[([\s\S]+?)\]/g, (_match, p1) => `$$${p1}$$`);
      // 替换 \( ... \) 为 $ ... $
      newValue = newValue.replace(/\(([\s\S]+?)\)/g, (_match, p1) => `$${p1}$`);

      node.value = newValue;
      console.log(node);
    }
  });
};

export default remarkMathBracket;
