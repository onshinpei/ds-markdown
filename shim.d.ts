declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }

declare module '*.less' {
    const content: { [className: string]: string };
    export default content;
  }
