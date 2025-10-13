const {
  capitalize,
  randomInt,
  isPalindrome,
  debounce,
  deepClone,
  shuffle,
  randomChoice,
  reverseString,
  charFrequency
} = require('../src/utils');

describe('capitalize', () => {
  test('capitalizes first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  test('handles already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  test('handles empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  test('handles non-string inputs', () => {
    expect(capitalize(null)).toBe(null);
    expect(capitalize(undefined)).toBe(undefined);
  });

  test('handles single character strings', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('randomInt', () => {
  test('generates number within range', () => {
    for (let i = 0; i < 100; i++) {
      const num = randomInt(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
    }
  });

  test('handles same min and max', () => {
    expect(randomInt(5, 5)).toBe(5);
  });

  test('throws error for non-number inputs', () => {
    expect(() => randomInt('1', 10)).toThrow(TypeError);
    expect(() => randomInt(1, '10')).toThrow(TypeError);
  });

  test('throws error when min > max', () => {
    expect(() => randomInt(10, 1)).toThrow(RangeError);
  });
});

describe('isPalindrome', () => {
  test('identifies simple palindromes', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('level')).toBe(true);
    expect(isPalindrome('noon')).toBe(true);
  });

  test('identifies non-palindromes', () => {
    expect(isPalindrome('hello')).toBe(false);
    expect(isPalindrome('world')).toBe(false);
  });

  test('handles case insensitivity', () => {
    expect(isPalindrome('RaceCar')).toBe(true);
    expect(isPalindrome('Level')).toBe(true);
  });

  test('handles palindromes with spaces and punctuation', () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
    expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true);
  });

  test('handles empty strings', () => {
    expect(isPalindrome('')).toBe(true);
  });

  test('handles non-string inputs', () => {
    expect(isPalindrome(123)).toBe(false);
    expect(isPalindrome(null)).toBe(false);
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  test('delays function execution', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('cancels previous calls', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('passes arguments to function', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc('arg1', 'arg2');
    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('deepClone', () => {
  test('clones primitive values', () => {
    expect(deepClone(5)).toBe(5);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
  });

  test('clones simple objects', () => {
    const obj = { a: 1, b: 2 };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  test('clones nested objects', () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
    expect(cloned.b.d).not.toBe(obj.b.d);
  });

  test('clones arrays', () => {
    const arr = [1, 2, 3];
    const cloned = deepClone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  test('clones nested arrays', () => {
    const arr = [1, [2, [3, 4]]];
    const cloned = deepClone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
  });

  test('clones Date objects', () => {
    const date = new Date('2024-01-01');
    const cloned = deepClone(date);
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });

  test('clones mixed structures', () => {
    const obj = {
      num: 42,
      str: 'hello',
      arr: [1, 2, { nested: true }],
      obj: { a: 1, b: [2, 3] },
      date: new Date('2024-01-01')
    };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.arr).not.toBe(obj.arr);
    expect(cloned.obj).not.toBe(obj.obj);
    expect(cloned.date).not.toBe(obj.date);
  });
});

describe('shuffle', () => {
  test('returns an array of the same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled.length).toBe(arr.length);
  });

  test('contains all original elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  test('does not modify original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffle(arr);
    expect(arr).toEqual(original);
  });

  test('throws error for non-array inputs', () => {
    expect(() => shuffle('string')).toThrow(TypeError);
    expect(() => shuffle(123)).toThrow(TypeError);
    expect(() => shuffle(null)).toThrow(TypeError);
  });

  test('handles empty arrays', () => {
    expect(shuffle([])).toEqual([]);
  });

  test('handles single element arrays', () => {
    expect(shuffle([1])).toEqual([1]);
  });
});

describe('randomChoice', () => {
  test('returns an element from the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const choice = randomChoice(arr);
    expect(arr).toContain(choice);
  });

  test('returns undefined for empty arrays', () => {
    expect(randomChoice([])).toBeUndefined();
  });

  test('throws error for non-array inputs', () => {
    expect(() => randomChoice('string')).toThrow(TypeError);
    expect(() => randomChoice(123)).toThrow(TypeError);
    expect(() => randomChoice(null)).toThrow(TypeError);
  });

  test('returns the only element for single element arrays', () => {
    expect(randomChoice([42])).toBe(42);
  });
});

describe('reverseString', () => {
  test('reverses simple strings', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('world')).toBe('dlrow');
  });

  test('handles palindromes', () => {
    expect(reverseString('racecar')).toBe('racecar');
    expect(reverseString('noon')).toBe('noon');
  });

  test('handles empty strings', () => {
    expect(reverseString('')).toBe('');
  });

  test('handles single character strings', () => {
    expect(reverseString('a')).toBe('a');
  });

  test('handles strings with spaces and punctuation', () => {
    expect(reverseString('hello world!')).toBe('!dlrow olleh');
    expect(reverseString('a b c')).toBe('c b a');
  });

  test('throws error for non-string inputs', () => {
    expect(() => reverseString(123)).toThrow(TypeError);
    expect(() => reverseString(null)).toThrow(TypeError);
  });
});

describe('charFrequency', () => {
  test('counts character occurrences', () => {
    expect(charFrequency('hello')).toEqual({
      h: 1,
      e: 1,
      l: 2,
      o: 1
    });
  });

  test('handles repeated characters', () => {
    expect(charFrequency('aaa')).toEqual({ a: 3 });
  });

  test('handles empty strings', () => {
    expect(charFrequency('')).toEqual({});
  });

  test('handles spaces and punctuation', () => {
    const result = charFrequency('a b!');
    expect(result).toEqual({
      a: 1,
      ' ': 1,
      b: 1,
      '!': 1
    });
  });

  test('is case-sensitive', () => {
    const result = charFrequency('AaBb');
    expect(result).toEqual({
      A: 1,
      a: 1,
      B: 1,
      b: 1
    });
  });

  test('throws error for non-string inputs', () => {
    expect(() => charFrequency(123)).toThrow(TypeError);
    expect(() => charFrequency(null)).toThrow(TypeError);
  });
});
