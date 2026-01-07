import deepClone from '../../src/utils/methods/deepClone';

describe('deepClone', () => {
  describe('primitive types', () => {
    it('should clone number', () => {
      expect(deepClone(42)).toBe(42);
    });

    it('should clone string', () => {
      expect(deepClone('hello')).toBe('hello');
    });

    it('should clone boolean', () => {
      expect(deepClone(true)).toBe(true);
      expect(deepClone(false)).toBe(false);
    });

    it('should clone null', () => {
      expect(deepClone(null)).toBe(null);
    });
  });

  describe('arrays', () => {
    it('should clone simple array', () => {
      const arr = [1, 2, 3];
      const cloned = deepClone(arr);
      expect(cloned).toEqual([1, 2, 3]);
      expect(cloned).not.toBe(arr);
    });

    it('should clone nested array', () => {
      const arr = [[1, 2], [3, 4]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual([[1, 2], [3, 4]]);
      expect(cloned).not.toBe(arr);
      expect(cloned[0]).not.toBe(arr[0]);
    });

    it('should clone array with mixed types', () => {
      const arr = [1, 'two', true, null, { a: 1 }];
      const cloned = deepClone(arr);
      expect(cloned).toEqual([1, 'two', true, null, { a: 1 }]);
      expect(cloned[4]).not.toBe(arr[4]);
    });

    it('should handle empty array', () => {
      const cloned = deepClone([]);
      expect(cloned).toEqual([]);
    });
  });

  describe('objects', () => {
    it('should clone simple object', () => {
      const obj = { a: 1, b: 2 };
      const cloned = deepClone(obj);
      expect(cloned).toEqual({ a: 1, b: 2 });
      expect(cloned).not.toBe(obj);
    });

    it('should clone nested object', () => {
      const obj = { a: { b: { c: 1 } } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual({ a: { b: { c: 1 } } });
      expect(cloned).not.toBe(obj);
      expect(cloned.a).not.toBe(obj.a);
      expect(cloned.a.b).not.toBe(obj.a.b);
    });

    it('should clone object with array property', () => {
      const obj = { arr: [1, 2, 3] };
      const cloned = deepClone(obj);
      expect(cloned).toEqual({ arr: [1, 2, 3] });
      expect(cloned.arr).not.toBe(obj.arr);
    });

    it('should handle empty object', () => {
      const cloned = deepClone({});
      expect(cloned).toEqual({});
    });
  });

  describe('deep cloning behavior', () => {
    it('should not affect original when modifying clone', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);
      cloned.a = 100;
      cloned.b.c = 200;
      
      expect(original.a).toBe(1);
      expect(original.b.c).toBe(2);
    });

    it('should handle complex nested structures', () => {
      const obj = {
        name: 'test',
        data: {
          items: [
            { id: 1, values: [1, 2, 3] },
            { id: 2, values: [4, 5, 6] },
          ],
          meta: {
            count: 2,
            active: true,
          },
        },
      };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.data).not.toBe(obj.data);
      expect(cloned.data.items).not.toBe(obj.data.items);
      expect(cloned.data.items[0]).not.toBe(obj.data.items[0]);
    });
  });

  describe('limitations', () => {
    it('should convert undefined to null in arrays', () => {
      const arr = [undefined];
      const cloned = deepClone(arr);
      expect(cloned).toEqual([null]);
    });

    it('should remove undefined properties from objects', () => {
      const obj = { a: 1, b: undefined };
      const cloned = deepClone(obj);
      expect(cloned).toEqual({ a: 1 });
      expect('b' in cloned).toBe(false);
    });

    it('should not clone functions', () => {
      const obj = { a: 1, fn: () => {} };
      const cloned = deepClone(obj);
      expect(cloned).toEqual({ a: 1 });
      expect('fn' in cloned).toBe(false);
    });
  });
});

