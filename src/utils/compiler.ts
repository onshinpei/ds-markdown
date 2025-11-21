import { getTokenId, Token, Tokenizer } from './Tokenizer';

function compile(src: string) {
  const tokenizer = new Tokenizer();

  const tokens: Token[] = [];
  let prevScr = src;

  while (src) {
    if (src.length === 0) {
      break;
    }

    // TODO: Temporary solution
    if (src.trim().length === 0 && tokens.length > 0) {
      const lastToken = tokens[tokens.length - 1];
      // If only spaces or newlines remain, add to previous token
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
      // If src hasn't changed, consider it a paragraph
      // todo: will optimize later, refine segmentation
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
