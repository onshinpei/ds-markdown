export const zhCN = {
  codeBlock: {
    copy: '复制',
    copied: '已复制',
    download: '下载',
  },
  mermaid: {
    diagram: '图表',
    code: '代码',
    zoomOut: '缩小',
    zoomIn: '放大',
    download: '下载',
    fullScreen: '全屏',
    exitFullScreen: '退出全屏',
  },
} as const;

export type ZhCN = typeof zhCN;

// 默认导出，符合使用方式
export default zhCN;
