export const enUS = {
  codeBlock: {
    copy: 'Copy',
    copied: 'Copied',
    download: 'Download',
  },
  mermaid: {
    diagram: 'Diagram',
    code: 'Code',
    zoomOut: 'Zoom Out',
    zoomIn: 'Zoom In',
    download: 'Download',
  },
} as const;

export type EnUS = typeof enUS;

// 默认导出，符合使用方式
export default enUS;
