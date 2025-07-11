import remarkMath from 'remark-math';
import { IMarkdownPlugin } from '../defined';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';
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

const mermaidPlugin = createBuildInPlugin({
  rehypePlugin: rehypeMermaid,
  id: mermaidId,
});

export { createBuildInPlugin, katexPlugin, mermaidPlugin };
