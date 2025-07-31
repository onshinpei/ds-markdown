import remarkMath from 'remark-math';
import type { IMarkdownPlugin } from '../defined';
import rehypeKatex from 'rehype-katex';
import { katexId, mermaidId } from '../constant';

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

export { createBuildInPlugin, katexPlugin, mermaidId, katexId, IMarkdownPlugin };
