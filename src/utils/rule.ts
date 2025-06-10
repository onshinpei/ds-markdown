/** 此文件借鉴 marked 的部分代码 */

const other = {
  caret: /(^|[^[])\^/g,
  listItemRegex: (bull: string) => new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (indent: number) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
  listReplaceTabs: /^\t+/,
  nonSpaceChar: /[^ ]/,
  blankLine: /^[ \t]*$/,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  tabCharGlobal: /\t/g,
  hrRegex: (indent: number) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  headingBeginRegex: (indent: number) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
  htmlBeginRegex: (indent: number) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, 'i'),
  fencesBeginRegex: (indent: number) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
};

/**
 * 编辑正则表达式
 * @param regex 正则表达式
 * @param opt 正则表达式选项
 * @returns 编辑后的正则表达式
 */
function edit(regex: string | RegExp, opt = '') {
  let source = typeof regex === 'string' ? regex : regex.source;
  const obj = {
    replace: (name: string | RegExp, val: string | RegExp) => {
      let valSource = typeof val === 'string' ? val : val.source;
      valSource = valSource.replace(other.caret, '$1');
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    },
  };
  return obj;
}

const newline = /^(?:[ \t]*(?:\n|$))+/;
const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
/** 列表 */
const bullet = /(?:[*+-]|\d{1,9}[.)])/;
/** 列表 */
const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
  .replace(/bull/g, bullet)
  .getRegex();

/** 围栏 fence
 * 什么是围栏： 围栏是用来包裹代码块的，比如 ```javascript 和 ``` 之间就是围栏
 */
const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
// 一个块
// const _segment = /^([^\n]+(?:\n(?!fences|list|hr| +\n)[^\n]+)*)/;
const _segment = /^([^\n]+(?:\n(?!fences|list|hr| +\n|\n)[^\n]+)*\n?)/;

const segment = edit(_segment)
  .replace(/fences/, fences)
  .replace(/list/, list)
  .replace(/hr/, hr)
  .getRegex();

const blockNormal = {
  newline,
  fences,
  segment,
  list,
  hr,
};

export const rules = {
  block: blockNormal,
  other,
};
