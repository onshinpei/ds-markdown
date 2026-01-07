import { splitGraphemes } from '../../src/utils/grapheme';

describe('splitGraphemes', () => {
  it('should split ASCII string into individual characters', () => {
    const result = splitGraphemes('hello');
    expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
  });

  it('should handle empty string', () => {
    const result = splitGraphemes('');
    expect(result).toEqual([]);
  });

  it('should split Chinese characters', () => {
    const result = splitGraphemes('你好');
    expect(result).toEqual(['你', '好']);
  });

  it('should split mixed ASCII and Chinese characters', () => {
    const result = splitGraphemes('hello你好');
    expect(result).toEqual(['h', 'e', 'l', 'l', 'o', '你', '好']);
  });

  it('should handle emojis', () => {
    const result = splitGraphemes('👍🎉');
    expect(result).toHaveLength(2);
  });

  it('should handle special characters', () => {
    const result = splitGraphemes('!@#$%');
    expect(result).toEqual(['!', '@', '#', '$', '%']);
  });

  it('should handle spaces', () => {
    const result = splitGraphemes('a b c');
    expect(result).toEqual(['a', ' ', 'b', ' ', 'c']);
  });

  it('should handle newlines', () => {
    const result = splitGraphemes('a\nb');
    expect(result).toEqual(['a', '\n', 'b']);
  });

  it('should handle tabs', () => {
    const result = splitGraphemes('a\tb');
    expect(result).toEqual(['a', '\t', 'b']);
  });

  it('should handle numbers', () => {
    const result = splitGraphemes('12345');
    expect(result).toEqual(['1', '2', '3', '4', '5']);
  });

  it('should handle Japanese characters', () => {
    const result = splitGraphemes('こんにちは');
    expect(result).toEqual(['こ', 'ん', 'に', 'ち', 'は']);
  });

  it('should handle Korean characters', () => {
    const result = splitGraphemes('안녕');
    expect(result).toEqual(['안', '녕']);
  });

  it('should handle mathematical symbols', () => {
    const result = splitGraphemes('∑∏√');
    expect(result).toEqual(['∑', '∏', '√']);
  });

  it('should handle punctuation', () => {
    const result = splitGraphemes('.,;:!?');
    expect(result).toEqual(['.', ',', ';', ':', '!', '?']);
  });
});

