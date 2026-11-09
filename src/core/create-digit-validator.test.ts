import { describe, it, expect } from 'vitest';
import { createDigitValidator } from './create-digit-validator.js';

describe('createDigitValidator', () => {
  it('returns a predicate function (curried)', () => {
    expect(typeof createDigitValidator(10)).toBe('function');
  });

  it('accepts only 0 and 1 for base 2', () => {
    const isDigit = createDigitValidator(2);
    expect(isDigit('0')).toBe(true);
    expect(isDigit('1')).toBe(true);
    expect(isDigit('2')).toBe(false);
  });

  it('accepts only 0-7 for base 8', () => {
    const isDigit = createDigitValidator(8);
    expect(isDigit('7')).toBe(true);
    expect(isDigit('8')).toBe(false);
  });

  it('accepts only 0-9 for base 10 and rejects letters', () => {
    const isDigit = createDigitValidator(10);
    expect(isDigit('9')).toBe(true);
    expect(isDigit('a')).toBe(false);
  });

  it('accepts 0-9 and a-f for base 16', () => {
    const isDigit = createDigitValidator(16);
    expect(isDigit('0')).toBe(true);
    expect(isDigit('f')).toBe(true);
    expect(isDigit('g')).toBe(false);
  });

  it('treats uppercase hex digits like lowercase', () => {
    const isDigit = createDigitValidator(16);
    expect(isDigit('A')).toBe(true);
    expect(isDigit('F')).toBe(true);
    expect(isDigit('G')).toBe(false);
  });

  it('rejects empty and multi-character strings', () => {
    const isDigit = createDigitValidator(16);
    expect(isDigit('')).toBe(false);
    expect(isDigit('ab')).toBe(false);
  });
});
