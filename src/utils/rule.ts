/** This file borrows some code from marked */

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
 * Edit regular expression
 * @param regex Regular expression
 * @param opt Regular expression options
 * @returns Edited regular expression
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
/** List */
const bullet = /(?:[*+-]|\d{1,9}[.)])/;
/** List */
const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
  .replace(/bull/g, bullet)
  .getRegex();

/** Fence
 * What is a fence: A fence is used to wrap code blocks, for example, the content between ```javascript and ``` is a fence
 */
const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
// A block
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
