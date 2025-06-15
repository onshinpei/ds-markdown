/** 此文件借鉴 marked 的部分代码 */

import { rules } from './rule.js';

let id = 0;

export const getTokenId = () => {
  return id++;
};

interface Space {
  type: 'space';
  raw: string;
  noTrimEndRaw?: string;
  id: number;
}

interface Fence {
  type: 'fence';
  raw: string;
  id: number;
}

interface Segment {
  type: 'segment';
  raw: string;
  id: number;
}

interface List {
  type: 'list';
  raw: string;
  items: ListItem[];
  loose: boolean;
  id: number;
}

interface ListItem {
  type: 'list_item';
  raw: string;
  task: boolean;
  checked: boolean | undefined;
  loose: boolean;
  text: string;
  tokens: Token[];
  id: number;
}
export type Token = Space | Fence | Segment | List | ListItem;

export class Tokenizer {
  /** 空行 */
  space(src: string): Space | undefined {
    const cap = rules.block.newline.exec(src);
    if (cap) {
      return {
        type: 'space',
        raw: cap[0],
        id: getTokenId(),
      };
    }
  }
  /** 围栏 fence */
  fence(src: string): Fence | undefined {
    const cap = rules.block.fences.exec(src);
    if (cap) {
      return {
        type: 'fence',
        raw: cap[0],
        id: getTokenId(),
      };
    }
  }
  /** 块 */
  segment(src: string): Segment | undefined {
    const cap = rules.block.segment.exec(src);
    if (cap) {
      return {
        type: 'segment',
        raw: cap[0],
        id: getTokenId(),
      };
    }
  }

  /** 列表 */
  list(src: string): List | undefined {
    let cap = rules.block.list.exec(src);

    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;

      const list: List = {
        type: 'list',
        raw: '',
        items: [],
        loose: false,
        id: getTokenId(),
      };

      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;

      // Get next list item
      const itemRegex = rules.other.listItemRegex(bull);

      while (src) {
        let endEarly = false;
        let raw = '';
        let itemContents = '';
        if (!(cap = itemRegex.exec(src))) {
          break;
        }

        if (rules.block.hr.test(src)) {
          // End list if bullet was actually HR (possibly move into itemRegex?)
          break;
        }

        raw = cap[0];
        src = src.substring(raw.length);

        /** 获取列表项 */
        let line = cap[2].split('\n', 1)[0].replace(rules.other.listReplaceTabs, (t: string) => ' '.repeat(3 * t.length));

        let nextLine = src.split('\n', 1)[0];
        let blankLine = !line.trim();

        let indent = 0;
        if (blankLine) {
          indent = cap[1].length + 1;
        } else {
          indent = cap[2].search(rules.other.nonSpaceChar); // Find first non-space char
          indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        if (blankLine && src === '') {
          endEarly = true;
        } else if (blankLine && rules.other.blankLine.test(nextLine)) {
          // Items begin with at most one blank line
          raw += nextLine + '\n';
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }

        if (!endEarly) {
          const nextBulletRegex = rules.other.nextBulletRegex(indent);
          const hrRegex = rules.other.hrRegex(indent);
          const fencesBeginRegex = rules.other.fencesBeginRegex(indent);
          const headingBeginRegex = rules.other.headingBeginRegex(indent);
          const htmlBeginRegex = rules.other.htmlBeginRegex(indent);

          // Check if following lines should be included in List Item
          while (src) {
            const rawLine = src.split('\n', 1)[0];
            const nextLineWithoutTabs = nextLine.replace(rules.other.tabCharGlobal, '    ');
            nextLine = rawLine;

            // End list item if found code fences
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }

            // End list item if found start of new heading
            if (headingBeginRegex.test(nextLine)) {
              break;
            }

            // End list item if found start of html block
            if (htmlBeginRegex.test(nextLine)) {
              break;
            }

            // End list item if found start of new bullet
            if (nextBulletRegex.test(nextLine)) {
              break;
            }

            // Horizontal rule found
            if (hrRegex.test(nextLine)) {
              break;
            }

            if (nextLineWithoutTabs.search(rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
              // Dedent if possible
              itemContents += '\n' + nextLineWithoutTabs.slice(indent);
            } else {
              // not enough indentation
              if (blankLine) {
                break;
              }
              // paragraph continuation unless last line was a different block level element
              if (line.replace(rules.other.tabCharGlobal, '    ').search(rules.other.nonSpaceChar) >= 4) {
                // indented code block
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }

              itemContents += '\n' + nextLine;
            }

            if (!blankLine && !nextLine.trim()) {
              // Check if current line is blank
              blankLine = true;
            }

            raw += rawLine + '\n';
            src = src.substring(rawLine.length + 1);
            line = nextLineWithoutTabs.slice(indent);
          }
        }

        let ischecked: boolean | undefined;

        const istask = rules.other.listIsTask.exec(itemContents);
        if (istask) {
          ischecked = istask[0] !== '[ ] ';
          itemContents = itemContents.replace(rules.other.listReplaceTask, '');
        }

        list.items.push({
          type: 'list_item',
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: [],
          id: getTokenId(),
        });

        list.raw += raw;
      }

      // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
      const lastItem = list.items.at(-1);

      if (lastItem) {
        lastItem.raw = lastItem.raw.trimEnd();
        lastItem.text = lastItem.text.trimEnd();
      } else {
        // not a list since there were no items
        return;
      }

      // list.raw = list.raw.trimEnd();

      return list;
    }
  }
}
