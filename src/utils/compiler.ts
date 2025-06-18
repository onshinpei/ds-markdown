import { getTokenId, Token, Tokenizer } from './Tokenizer.js';

function compile(src: string) {
  const tokenizer = new Tokenizer();

  const tokens: Token[] = [];
  let prevScr = src;

  while (src) {
    if (src.length === 0) {
      break;
    }

    // TODO: 临时方案
    if (src.trim().length === 0 && tokens.length > 0) {
      const lastToken = tokens[tokens.length - 1];
      // 如果只剩下空格或换行符，则加到上一个token中
      if (lastToken.type === 'list') {
        lastToken.raw = lastToken.raw + src;
        break;
      }
    }
    const space = tokenizer.space(src);
    if (space) {
      tokens.push(space);
      src = src.slice(space.raw.length);
      continue;
    }
    const list = tokenizer.list(src);
    if (list) {
      tokens.push(list);
      src = src.slice(list.raw.length);
      continue;
    }
    const fence = tokenizer.fence(src);
    if (fence) {
      tokens.push(fence);
      src = src.slice(fence.raw.length);
      continue;
    }
    const segment = tokenizer.segment(src);
    if (segment) {
      tokens.push(segment);
      src = src.slice(segment.raw.length);
      continue;
    }
    if (prevScr === src && src) {
      // 如果src没有变化，则认为是一个段落
      // todo: 后面会做优化，进行细分
      tokens.push({
        type: 'segment',
        raw: src,
        id: getTokenId(),
      });
      src = '';
    }
    prevScr = src;
  }

  return tokens;
}

function createCompiler(src: string) {
  const tokens = compile(src);
  return tokens;
}

export const compiler = createCompiler;
