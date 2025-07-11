export const __DEV__ = process.env.NODE_ENV === 'development';

const ID_PREFIX__ = '__ds-markdown__';

/** 数学公式插件id */
export const katexId = `${ID_PREFIX__}katex`;

/** 流程图插件id */
export const mermaidId = `${ID_PREFIX__}mermaid`;
