import remarkMath from 'remark-math';
import { IMarkdownPlugin } from '../defined.js';
import rehypeKatex from 'rehype-katex';
import { katexId } from '../constant.js';

function createBuildInPlugin(partialPlugin: Partial<IMarkdownPlugin>) {
  const plugin: IMarkdownPlugin = {
    ...partialPlugin,
    type: 'buildIn',
  };

  return plugin;
}

const katexPlugin = createBuildInPlugin({
  remarkPlugin: remarkMath,
  rehypePlugin: rehypeKatex,
  id: katexId,
});

export { createBuildInPlugin, katexPlugin };
