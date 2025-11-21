export const __DEV__ = process.env.NODE_ENV === 'development';

const ID_PREFIX__ = '__ds-markdown__';

/** Math formula plugin id */
export const katexId = `${ID_PREFIX__}katex`;

/** Flowchart plugin id */
export const mermaidId = `${ID_PREFIX__}mermaid`;
