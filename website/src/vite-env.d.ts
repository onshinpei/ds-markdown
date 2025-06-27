/// <reference types="vite/client" />

// Vite raw import 类型声明
declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}

declare module '*.tsx?raw' {
  const content: string;
  export default content;
}
